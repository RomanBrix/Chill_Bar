const { default: axios } = require("axios");
// const CityOfNp = require("../models/CityOfNp");
const Payment = require("../models/Payment");
// const dotenv = require("dotenv");
const {
    createNewOrder,
    changeOrderStatus,
    getOrder,
    deleteTtnFromOrder,
} = require("./orders");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

const MERCH_LINK = process.env.MERCH_LINK;
const MERCH_LOGIN = process.env.MERCH_LOGIN;
const MERCH_PASS = process.env.MERCH_PASS;
const MERCH_ID = process.env.MERCH_ID;
const MERCH_CONFIG = process.env.MERCH_CONFIG;

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json(payments);
});

router.post("/new", async (req, res) => {
    const order = { ...req.body, id: generateOrderId() };
    // console.log(order);
    try {
        const id = await createNewOrder(order);
        // const id = order.id;
        // console.log(id);

        const token = await getToken();
        if (!token) throw new Error("token pay link");
        // return res.status(200).json(token);
        const payLink = await goGetLink(token, id, order.summ * 100);

        await Payment.create({
            id,
            summ: order.summ,
            phone: order.user.phone,
        });
        res.status(200).json({ status: true, payLink });
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

async function goGetLink(token, uiid, amount) {
    console.log("link");
    console.log("MERCH_ID: " + MERCH_ID);
    // console.log(uiid);
    // console.log(token);
    const orderData = {
        external_id: uiid,
        amount: amount,
        title: `Оплата замовлення №${uiid}`,
        lang: "UK",
        description: "Оплата замовлення",
        short_description: `${uiid}`,
        merchant_config_id: MERCH_ID,
        config_id: MERCH_CONFIG,
        options: {
            backurl: {
                // success: `http://localhost:3000/thank/${uiid}`,
                // error: `http://localhost:3000/thank/${uiid}`,
                // cancel: `http://localhost:3000/thank/${uiid}`,
                success: `https://chillbar.com.ua/thank/${uiid}`,
                error: `https://chillbar.com.ua/thank/${uiid}`,
                cancel: `https://chillbar.com.ua/thank/${uiid}`,
            },
        },
    };
    ///
    try {
        const { data } = await axios.post(
            MERCH_LINK + "/frames/links/pga",
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(data);
        return data.url;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

async function changePayStatus(answer, io = false) {
    console.log(answer.status.toLowerCase());
    let newStatus = answer.status.toLowerCase() !== "failed";
    console.log(newStatus);
    // if()
    try {
        await Payment.findOneAndUpdate(
            { id: answer.external_id },
            { status: answer.status.toLowerCase() }
        );
        await changeOrderStatus(answer.external_id, newStatus);
        if (!newStatus) {
            await deleteTtnFromOrder(answer.external_id);
        }

        if (io) {
            const order = await getOrder(answer.external_id);
            io.to(answer.external_id).emit("order", order);
        }
        return true;
    } catch (err) {
        console.log(err);
    }
}
async function getToken() {
    try {
        const { data } = await axios.post(MERCH_LINK + "/auth/token", {
            login: MERCH_LOGIN,
            password: MERCH_PASS,
            client: "transacter",
        });
        // console.log(data);
        return data.data.access_token;
    } catch (err) {
        console.log(err.response.data);
        return err;
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
exports.PayRoute = router;
exports.changePayStatus = changePayStatus;
// module.exports = router;
