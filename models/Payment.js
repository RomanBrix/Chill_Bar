const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        id: { type: String, unique: true },
        summ: { type: Number, default: 0 },
        phone: { type: String },
        status: { type: String, default: "proccess" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
