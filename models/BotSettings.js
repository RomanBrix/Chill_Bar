const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BotSettingsSchema = new Schema(
    {
        token: { type: String },
        id: { type: Number, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BotSettings", BotSettingsSchema);
