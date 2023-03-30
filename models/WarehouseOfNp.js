const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarehouseOfNpSchema = new Schema(
    {
        city: { type: String },
        // city_ru: { type: String },

        warehouse: { type: String },
        // warehouse_ru: { type: String },
        ref: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("WarehouseOfNp", WarehouseOfNpSchema);

// Model.createCollection().then((docs) => {});
