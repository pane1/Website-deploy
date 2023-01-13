const mongoose = require("mongoose");

const userSchema = {
    Uid: String,
    Symbol: [String]
}

const User = mongoose.model("users", userSchema);

module.exports = User;