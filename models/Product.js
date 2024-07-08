const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        tyagi: { type: Number, default: 1800 },
        type: { type: String, default: "chill" }, //mask
        title: { type: String, default: "" },
        price: { type: Number, default: 0 },
        version: { type: String, default: "Соковитий лід" },
        img: { type: String, default: "/src/products/lushicemiddle.png" },
        info: { type: String, default: "" }, //"Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
        availability: { type: Boolean, default: true },
        // id: "0",
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

// tyagi: 1800,
//         type: "chill",
//         title: "chillbar 1800",
//         price: "345",
//         version: "Соковитий лід",
//         img: "/src/products/lushicemiddle.png",
//         info: "Розміри 22.4мм*13.4мм*116.8мм Ємність акумулятора: 900 мАч; Об`єм картриджу: 5.0 мл Кількість затяжок близько 1800; Виробник Chillbar. Нікотин 5%",
//         id: "0",
