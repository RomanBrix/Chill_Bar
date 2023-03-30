const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BotUsersSchema = new Schema(
    {
        username: { type: String },
        id: { type: String, unique: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BotUsers", BotUsersSchema);
