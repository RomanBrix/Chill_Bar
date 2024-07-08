const router = require("express").Router();
const Order = require("../models/Order");
const { notifyAllWithBot } = require("./bot");
const { createTTN, removeTtn } = require("./np");
const { verifyTokenAndAuthorization } = require("./verifyToken");

router.post("/new", async (req, res) => {
    // console.log(req.body);
    const order = { ...req.body, id: generateOrderId() };
    // console.log(order);
    const needNotify = req.body?.pay !== "proccess";
    try {
        const id = await createNewOrder(order);
        console.log("id: ", id);
        // console.log(id);

        if (!id) throw new Error("id");
        // if (needNotify && id) {
        //     // send bot notify

        //     const productText = order.products
        //         .map((product, index) => {
        //             return `${index + 1}. ${
        //                 product.title + " " + product.version
        //             } (${product.price} uah/шт) - ${product.count} шт.`;
        //         })
        //         .join("\n");
        //     const { name, phone, city, wearhouse } = order.user;
        //     const text = `🤑 Замовлення ID:${id}!\n${productText}\n\n💸Загальна сума: ${order.summ} uah\n\n🤴 ${name}\n📱 ${phone}\n\n🚚 Доставка:\n🌃 ${city}\n🏠 ${wearhouse}`;
        //     notifyAllWithBot(text);
        // }
        // console.log(id);
        res.status(200).json({ status: "new", id });
    } catch (err) {
        console.log(err);
        res.status(500).json(false);
    }

    // pay: { type: String, default: "np" }, // np- na pochte, success - ok, error - ne ok, process - in progress
    // status: { type: String, default: "new" },
});
router.put("/status", verifyTokenAndAuthorization, async (req, res) => {
    const { status, id } = req.body;
    console.log(req.body);
    const change = await changeOrderStatus(id, status);

    res.status(change ? 200 : 500).json(change);
});
router.get("/list", verifyTokenAndAuthorization, async (req, res) => {
    // console.log("ok");

    try {
        const orderList = await Order.find({}).sort({ createdAt: -1 }).lean();
        res.status(200).json(orderList);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("no id");
        const order = await Order.findById(id).lean();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

async function createNewOrder(order) {
    console.log(order);
    try {
        let [ttn, ttnRef] = [null, null];
        if (order.np.name !== null) {
            [ttn, ttnRef] = await createTTN(order);
        }
        console.log("ttn: ", ttn);
        console.log("ttnRef: ", ttn);
        const { id } = await Order.create({ ...order, ttn, ttnRef });
        // const { id } = await Order.create({ ...order });
        return id;
    } catch (err) {
        console.log("ERROR WHILE CREATE NEW ORDER");
        console.log(err);
        return false;
    }
}

async function getOrder(id) {
    try {
        const order = await Order.findOne({ id });
        return order;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function deleteTtnFromOrder(id) {
    try {
        const order = await Order.findOne({ id: id }, "ttnRef ttn");
        console.log(order);
        const ttnRemove = await removeTtn(order.ttnRef);
        if (ttnRemove) {
            order.ttnRef = null;
            order.ttn = null;
            await order.save();
        }
        return true;
        // console.log()
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function changeOrderStatus(id, status) {
    try {
        if (typeof status === "boolean") {
            await Order.findOneAndUpdate(
                { id: id },
                {
                    status: status ? "new" : "error",
                    pay: status ? "success" : "error",
                }
            );
        } else {
            // console.log(status);
            await Order.findByIdAndUpdate(id, { status });
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
function generateOrderId(n = 5) {
    let result = "";
    //abcdefghijklmnopqrstuvwxyz
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < n; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

exports.getOrder = getOrder;
exports.ordersRoute = router;
exports.createNewOrder = createNewOrder;
exports.changeOrderStatus = changeOrderStatus;
exports.deleteTtnFromOrder = deleteTtnFromOrder;
// module.exports = router;
