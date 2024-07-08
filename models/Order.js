const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        user: {
            name: { type: String, default: "Покупатель" },
            phone: { type: String },
            city: { type: String },
            wearhouse: { type: String },
        },
        summ: { type: Number, default: 0 },
        pay: { type: String, default: "np" }, // np- na pochte, success - ok, error - ne ok
        products: { type: mongoose.Schema.Types.Mixed },
        id: { type: String, unique: true },
        status: { type: String, default: "new" }, // error, deleted, onDelivery, complete, [payed ? ]
        ttn: { type: String, default: null },
        ttnRef: { type: String, default: null },
        np: {
            lastName: { type: String, default: null },
            name: { type: String, default: null },
            cityRef: { type: String, default: null },
            warehouseRef: { type: String, default: null },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
