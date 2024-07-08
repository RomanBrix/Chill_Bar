const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const DEST = process.env.MULTER_DEST || "./upload/";
const FILE_DEST = process.env.FILE_DEST || "./upload/";
const FILE_SAVE = process.env.FILE_SAVE || "";

const upload = multer({ dest: DEST });

router.put(
    "/",
    verifyTokenAndAuthorization,
    upload.single("file"),
    async (req, res) => {
        const { file } = req;
        if (file) {
            var fileName = moveFile(file);
        }
        console.log(req.file);
        const productData = JSON.parse(req.body.data);
        productData.img = fileName;

        console.log(productData);
        try {
            await Product.findByIdAndUpdate(productData._id, productData);
            res.status(200).json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);
router.delete("/", verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    try {
        if (!id) throw new Error("хахаха я маленький гвинтік");
        await Product.findByIdAndRemove(id);
        res.status(200).json(true);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.post(
    "/",
    verifyTokenAndAuthorization,
    upload.single("file"),
    async (req, res) => {
        const { file } = req;
        const fileName = moveFile(file);
        if (!fileName) return res.status(500).json({ message: "file" });
        // const fileName = "";
        // console.log("req.body");
        const productData = JSON.parse(req.body.data);
        productData.img = fileName;
        // console.log(productData);
        try {
            await Product.create(productData);
            res.status(200).json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        // console.log(fileName);
    }
);
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get("/ss", async (req, res) => {
//     try {
//         const products = await Product.insertMany(tovar);
//         res.status(200).json(products);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

function moveFile(file) {
    //check urls while upload
    // const oldPath = path.join(__dirname, "../" + file.path);
    console.log(__dirname, "../" + file.path);
    const oldPath = path.join(__dirname, "../" + file.path);
    const newPath = path.join(
        __dirname,
        // FILE_DEST + FILE_SAVE, // local
        "/.." + FILE_DEST, // prod
        file.originalname
    );
    console.log("SAVE TO:");
    console.log(__dirname + "/.." + FILE_DEST + file.originalname);
    try {
        fs.renameSync(oldPath, newPath);
        console.log("FILE NAME IN DB:");
        console.log(FILE_SAVE + file.originalname);
        return FILE_SAVE + file.originalname;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = router;

// const tovar = [
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Соковитий лід",
//         img: "/src/products/lushicemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Ананасовий лід",
//         img: "/src/products/pineappleicemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Полуниця Ківі",
//         img: "/src/products/strawberrykiwimiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Крижаний Skittles",
//         img: "/src/products/iceskittlesmiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Персик Манго",
//         img: "/src/products/peachmangomiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Алое Виноград",
//         img: "/src/products/aloegrapemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Апельсиновий лід",
//         img: "/src/products/orangeice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Алое чорна смородина",
//         img: "/src/products/aloeblackberry.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Ягідний мікс",
//         img: "/src/products/mixedberries.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },

//     //MASSSSK
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Ананас лімонад",
//         img: "/src/products/gt/ananasLimonad.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Апельсин",
//         img: "/src/products/gt/apelsin.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Банан",
//         img: "/src/products/gt/banan.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Кава-Табак",
//         img: "/src/products/gt/coffetabak.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Кола - Лід",
//         img: "/src/products/gt/colaIce.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },

//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Диня",
//         img: "/src/products/gt/dunya.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },

//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Енергія",
//         img: "/src/products/gt/energy.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Фруктовий мікс",
//         img: "/src/products/gt/fruits.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Горіх",
//         img: "/src/products/gt/gorih.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Зелене Яблуко",
//         img: "/src/products/gt/greenApple.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Грейфрукт та чай з медом",
//         img: "/src/products/gt/greyChaiMed.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Грейфрукт та полуниця",
//         img: "/src/products/gt/greyPolun.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Гуава та Лід",
//         img: "/src/products/gt/guavavIce.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Кавун",
//         img: "/src/products/gt/yura.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Полуниця",
//         img: "/src/products/gt/klubnika.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Кокос",
//         img: "/src/products/gt/kokos.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Малина та смородина",
//         img: "/src/products/gt/malina.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Манго та Лід",
//         img: "/src/products/gt/mangoIce.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "М`ята",
//         img: "/src/products/gt/myata.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "OMG",
//         img: "/src/products/gt/omg.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Персик",
//         img: "/src/products/gt/persik.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Ром та Лід",
//         img: "/src/products/gt/rom.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Табак",
//         img: "/src/products/gt/tabak.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 500,
//         type: "mask",
//         title: "Maskking gt",
//         price: "230",
//         version: "Ягодний мікс",
//         img: "/src/products/gt/yagodi.png",
//         info: "Розмір 12 * 103 мм. Ємкість акумулятора 350 мАч. Об’єм картриджу 2.0 мл. Кількість затяжок близько 500. Нікотин 5%. Виробник Maskking",
//     },

//     //pro
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "OMG",
//         img: "/src/products/pro/omg.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Ананасовий лімонад",
//         img: "/src/products/pro/ananas.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Вишня",
//         img: "/src/products/pro/cherry.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Кавун з льодом",
//         img: "/src/products/pro/yura.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Солодкий банан",
//         img: "/src/products/pro/banan.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Яблочне шампанське",
//         img: "/src/products/pro/applShamp.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1000,
//         type: "mask",
//         title: "Maskking Pro",
//         price: "275",
//         version: "Ягідний мікс",
//         img: "/src/products/pro/yagodu.png",
//         info: "Розмір 18 * 104 мм. Ємкість акумулятора 550 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1000. Нікотин 5%. Виробник Maskking",
//     },

//     // promax
//     {
//         tyagi: 1500,
//         type: "mask",
//         title: "Maskking Pro Max",
//         price: "350",
//         version: "Виноград",
//         img: "/src/products/promax/grape.png",
//         info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1500,
//         type: "mask",
//         title: "Maskking Pro Max",
//         price: "350",
//         version: "Лимон та Ягоди",
//         img: "/src/products/promax/lemon.png",
//         info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
//     },
//     {
//         tyagi: 1500,
//         type: "mask",
//         title: "Maskking Pro Max",
//         price: "350",
//         version: "Гуава та Малина",
//         img: "/src/products/promax/promax_guava.png",
//         info: "Розмір 21,9 * 103 мм. Ємкість акумулятора 850 мАч. Об’єм картриджу 3.5 мл. Кількість затяжок близько 1500. Нікотин 5%. Виробник Maskking",
//         // SDASDASDASDASDASDASDASDASD
//     },

//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Чорничний Лід",
//         img: "/src/products/blueberryicemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Ягоди та лід",
//         img: "/src/products/bluerazzmiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Подвійне Яблуко",
//         img: "/src/products/doubleapplemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Клейкі Цукерки",
//         img: "/src/products/gummycandymiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Манговий Лід",
//         img: "/src/products/mangoicemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Молочний Банан",
//         img: "/src/products/milkbananamiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "М'ята",
//         img: "/src/products/mintmiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Ягодний мікс",
//         img: "/src/products/mixedberriesmiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Полуничне Морозиво",
//         img: "/src/products/strawberryicecreammiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Тютюн",
//         img: "/src/products/tobaccomiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//     },

//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Пишний Лід",
//         img: "/src/products/lushice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Банановий Лід",
//         img: "/src/products/bananaice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Чорничний Лід",
//         img: "/src/products/blueberryice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Кола-Лід",
//         img: "/src/products/colaice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Цукрова Вата",
//         img: "/src/products/cottoncandy.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Подвійне Яблуко",
//         img: "/src/products/doubleapple.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Енергетик",
//         img: "/src/products/energydrink.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Манговий Лід",
//         img: "/src/products/mangoice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Молочний Банан",
//         img: "/src/products/milkbanana.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "М'ята",
//         img: "/src/products/mint.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Апельсиновий мікс",
//         img: "/src/products/mixedorange.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Персиковий Лід",
//         img: "/src/products/peachice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Персик та Манго",
//         img: "/src/products/peachmango.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Ананасовий Лід",
//         img: "/src/products/ppineappleice.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Полуниця та Ківі",
//         img: "/src/products/strawberrykiwi.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
//     {
//         tyagi: 2500,
//         type: "chill",
//         title: "chillbar 2500",
//         price: "400",
//         version: "Тютюн",
//         img: "/src/products/tobacco.png",
//         info: "Розміри 19.5 x 113 мм. Ємність акумулятора: 1300 мАч; Об`єм картриджу: 6.5 мл. Кількість затяжок близько 2500; Виробник Chillbar. Нікотин 5%",
//     },
// ];
