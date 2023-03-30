const router = require("express").Router();
const Order = require("../models/Order");
const { notifyAllWithBot } = require("./bot");
const { verifyTokenAndAuthorization } = require("./verifyToken");

router.post("/new", async (req, res) => {
    // console.log(req.body);
    const order = { ...req.body, id: generateOrderId() };
    const needNotify = req.body?.pay !== "process";
    try {
        const { id } = await Order.create(order);
        if (needNotify) {
            // send bot notify

            const productText = order.products
                .map((product, index) => {
                    return `${index + 1}. ${
                        product.title + " " + product.version
                    } (${product.price} uah/шт) - ${product.count} шт.`;
                })
                .join("\n");
            const { name, phone, city, wearhouse } = order.user;
            const text = `🤑 Замовлення!\n${productText}\n\n💸Загальна сума: ${order.summ} uah\n\n🤴 ${name}\n📱 ${phone}\n\n🚚 Доставка:\n🌃 ${city}\n🏠 ${wearhouse}`;
            notifyAllWithBot(text);
        }
        // console.log(id);
        res.status(200).json({ status: "new", id });
    } catch (err) {
        console.log(err);
    }

    // pay: { type: String, default: "np" }, // np- na pochte, success - ok, error - ne ok, process - in progress
    // status: { type: String, default: "new" },
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
module.exports = router;
