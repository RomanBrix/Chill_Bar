const { default: axios } = require("axios");
const CityOfNp = require("../models/CityOfNp");
const WarehouseOfNp = require("../models/WarehouseOfNp");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();

const { verifyTokenAndAuthorization } = require("./verifyToken");

router.get("/city", async (req, res) => {
    const { city } = req.query;
    try {
        var regex = new RegExp(city, "i");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ city: "asdasd" });
    }
    try {
        const cities = await CityOfNp.find({ city: { $regex: regex } });
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json({ city: "asdasd" });
        console.log(err);
    }
});
router.get("/price", async (req, res) => {
    const { city, totalSumm } = req.query;
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    const npData = {
        apiKey: novaApi,
        modelName: "InternetDocument",
        calledMethod: "getDocumentPrice",
        methodProperties: {
            CitySender: "e221d642-391c-11dd-90d9-001a92567626", // 4ernovci
            CityRecipient: city,
            Weight: "0.1",
            ServiceType: "WarehouseWarehouse",
            Cost: totalSumm,
            CargoType: "Cargo",
            SeatsAmount: "1",
            RedeliveryCalculate: {
                CargoType: "Money",
                Amount: totalSumm,
            },
            // Amount: "100",
            // CargoDetails: [
            //     {
            //         CargoDescription: "00000000-0000-0000-0000-000000000000",
            //         Amount: "2",
            //     },
            // ],
            // CargoDescription: "00000000-0000-0000-0000-000000000000",
        },
    };
    // console.log(totalSumm);

    try {
        const howMuch = await axios.post(novaUrl, npData);
        const cost = howMuch.data.data[0];
        res.status(200).json(cost.Cost + cost.CostRedelivery);
    } catch (err) {
        res.status(500).json(false);
        console.log(err);
    }
});

router.get("/warhouses", async (req, res) => {
    const { warhouse } = req.query;
    // console.log(warhouse);

    try {
        const warhouses = await WarehouseOfNp.find({
            ref: warhouse,
        }).lean();
        // console.log(warhouses);
        res.status(200).json(warhouses);
    } catch (err) {
        res.status(500).json({ city: "asdasd" });
        console.log(err);
    }
});

router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    // const { warehousesToSave, citiesToSave } = req.body;
    // console.log(warehousesToSave.length, citiesToSave.length);
    // console.log(warehousesToSave)

    await CityOfNp.deleteMany({});
    await WarehouseOfNp.deleteMany({});

    // return res.status(200).json({ warhouses: "asdasd" });
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    const getCities = {
        apiKey: novaApi,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {},
    };
    const getWarehouses = {
        apiKey: novaApi,
        modelName: "Address",
        calledMethod: "getWarehouses",
    };

    try {
        const [citiesData, warehousesData] = await Promise.allSettled([
            axios.post(novaUrl, getCities),
            axios.post(novaUrl, getWarehouses),
        ]);
        const cities = citiesData.value.data.data;
        const warehouses = warehousesData.value.data.data;
        // console.log(warehouses);

        const citiesToSave = cities.map((city) => ({
            area: city.AreaDescription,
            // area_ru: city.AreaDescriptionRu,
            city: city.Description,
            // city_ru: city.DescriptionRu,
            settlementType: city.SettlementTypeDescription,
            // settlementType_ru: city.SettlementTypeDescriptionRu,
            ref: city.Ref,
        }));
        const warehousesToSave = warehouses.map((warehouse) => ({
            city: warehouse.CityDescription,
            // city_ru: warehouse.CityDescriptionRu,

            warehouse: warehouse.Description,
            warehouseRef: warehouse.Ref,
            // warehouse_ru: warehouse.DescriptionRu,

            ref: warehouse.CityRef,
        }));
        // console.log(warehousesToSave);
        console.log("City length: " + citiesToSave.length);
        console.log("WarehousesToSave length: " + warehousesToSave.length);

        await CityOfNp.insertMany(citiesToSave);
        await WarehouseOfNp.insertMany(warehousesToSave);

        res.status(200).json(true);
        // protectedRequest.post("/np/", { citiesToSave, warehousesToSave });
    } catch (err) {
        // toast.error("Ошибка. Обратитесь к прогеру");
        res.status(500).json(err);
    }
});

router.get("/agent", async (req, res) => {
    // console.log();
    const order = {
        user: {
            name: "Роман",
            lastName: "Тестович",
            phone: "380631075675",
        },
        Cost: "250",
        CityRecipient: "db5c88d0-391c-11dd-90d9-001a92567626", // одеса
        RecipientAddress: "511fcff6-e1c2-11e3-8c4a-0050568002cf", //Відділення №15: Тираспольське шосе, 2
    };
    const [Recipient, ContactRecipient] = await getRefOfRecipient(order.user);
    // const dataOfReciptioent = await getRefOfRecipient(order.user);
    // console.log(dataOfReciptioent);
    // const [Recipient, ContactRecipient] = dataOfReciptioent;
    const nakladna = await doNakladna({
        Recipient,
        ContactRecipient,
        RecipientsPhone: order.user.phone,
        Cost: order.Cost,
        CityRecipient: order.CityRecipient,
        RecipientAddress: order.RecipientAddress,
        type: "BackwardDeliveryData",
    });
    res.json(nakladna);
});

async function createTTN(order) {
    // console.log(order);

    const [Recipient, ContactRecipient] = await getRefOfRecipient({
        name: order.np.name,
        lastName: order.np.lastName,
        phone: order.user.phone,
    });

    const nakladna = await doNakladna({
        Recipient,
        ContactRecipient,
        RecipientsPhone: order.user.phone,
        Cost: order.summ,
        CityRecipient: order.np.cityRef,
        RecipientAddress: order.np.warehouseRef,
        type: order.pay === "np" ? "BackwardDeliveryData" : null,
    });
    // console.log(nakladna);
    const ttn = nakladna.data[0]?.IntDocNumber || null;
    const ttnRef = nakladna.data[0]?.Ref || null;
    return [ttn, ttnRef];
}

async function removeTtn(ttnRef) {
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    const bdata = {
        apiKey: novaApi,
        modelName: "InternetDocument",
        calledMethod: "delete",
        methodProperties: {
            DocumentRefs: ttnRef,
        },
    };
    const { data } = await axios.post(novaUrl, bdata);
    // console.log(data);
    return data;
}
//go CREATE

async function getRefOfRecipient({
    name,
    midName = "",
    lastName,
    phone,
    mail = "sss@sss.ss",
}) {
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    const bdata = {
        apiKey: novaApi,
        modelName: "Counterparty",
        calledMethod: "save",
        methodProperties: {
            FirstName: name,
            MiddleName: midName,
            LastName: lastName,
            Phone: phone,
            Email: mail,
            CounterpartyType: "PrivatePerson",
            CounterpartyProperty: "Recipient",
        },
    };

    const addresRecipt = {
        apiKey: novaApi,
        modelName: "ContactPerson",
        calledMethod: "save",
        methodProperties: {
            CounterpartyRef: "00000000-0000-0000-0000-000000000000",
            FirstName: name,
            LastName: lastName,
            MiddleName: midName,
            Phone: phone,
        },
    };
    try {
        const { data } = await axios.post(novaUrl, bdata);

        const contrAggRef = data.data[0].Ref;
        // console.log("contrAggRef: ");
        // console.log(contrAggRef);
        addresRecipt.methodProperties.CounterpartyRef = contrAggRef;
        const addresReciptAdd = await axios.post(novaUrl, addresRecipt);
        const contactRef = addresReciptAdd.data.data[0].Ref;
        // console.log(addresReciptAdd.data.data);
        return [contrAggRef, contactRef];
    } catch (err) {
        // console.log(err);
        return false;
        // res.send("ok");
    }
}

async function doNakladna({
    Recipient,
    ContactRecipient,
    RecipientsPhone,
    Cost,
    CityRecipient,
    RecipientAddress,
    type = null,
}) {
    const novaApi = process.env.NOVA_API;
    const novaUrl = process.env.NOVA_API_URL;
    console.log("CHECK DATA FOR TTN");
    // console.log(Recipient);
    // console.log(ContactRecipient);
    // console.log(RecipientsPhone);
    // console.log(Cost);
    // console.log(CityRecipient);
    // console.log(RecipientAddress);
    const bddata = {
        apiKey: novaApi,
        modelName: "InternetDocument",
        calledMethod: "save",
        methodProperties: {
            PayerType: "Recipient", // ok
            PaymentMethod: "Cash", // ok
            DateTime: getTomorrowDate(), // ok
            CargoType: "Parcel", //ok
            Weight: "0.5", //ok

            ServiceType: "WarehouseWarehouse", //ok
            SeatsAmount: "1", // ok
            Description: "Одноразова pod система",
            Cost: Cost,
            CitySender: "e221d642-391c-11dd-90d9-001a92567626", //const city (чернівці)
            // CitySender: "db5c88da-391c-11dd-90d9-001a92567626", //const city (vasilkov)
            Sender: "4038781a-9358-11ee-a60f-48df37b921db", //const ref prod
            // Sender: "b2776149-8e22-11e9-9937-005056881c6b", //const ref dev
            SenderAddress: "47402ec4-e1c2-11e3-8c4a-0050568002cf", //const werhause (1 чернівці)
            // SenderAddress: "336de196-e1c2-11e3-8c4a-0050568002cf", //const werhause (chehova 3a) //
            // ContactSender: "b27dc7a1-8e22-11e9-9937-005056881c6b", // const mb dev
            ContactSender: "2db948e7-93f4-11ee-a60f-48df37b921db", // const mb prod
            SendersPhone: "380501540613", // const
            CityRecipient: CityRecipient, // city
            Recipient: Recipient, // getRefOfRecipient[0]
            RecipientAddress: RecipientAddress, // werhause
            ContactRecipient: ContactRecipient, // getRefOfRecipient[1]
            RecipientsPhone: RecipientsPhone, // ok
        },
    };
    // console.log(type);
    if (type === "BackwardDeliveryData") {
        bddata.methodProperties.BackwardDeliveryData = [
            {
                PayerType: "Recipient",

                CargoType: "Money",

                RedeliveryString: Cost,
            },
        ];
    }
    const { data } = await axios.post(novaUrl, bddata);
    // console.log(data);
    return data;
}

function getTomorrowDate() {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dd = tomorrow.getDate().toString().padStart(2, "0");
    let mm = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    let yyyy = tomorrow.getFullYear();

    console.log(`${dd}.${mm}.${yyyy}`);
    return `${dd}.${mm}.${yyyy}`;
}
// module.exports = router;
exports.NpRoute = router;
exports.createTTN = createTTN;
exports.removeTtn = removeTtn;
