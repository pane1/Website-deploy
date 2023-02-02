const mongoose = require("mongoose");

const userSchema = {
    Uid: String,
    Stocks: [Object]
}

const User = mongoose.model("users", userSchema);

module.exports = User;