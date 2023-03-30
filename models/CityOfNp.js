const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CityOfNpSchema = new Schema(
    {
        area: { type: String },
        // area_ru: { type: String },
        city: { type: String },
        // city_ru: { type: String },
        settlementType: { type: String },
        // settlementType_ru: { type: String },
        ref: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CityOfNp", CityOfNpSchema);
