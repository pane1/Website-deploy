const mongoose = require("mongoose");

const userSchema = {
    FirstName: String,
    LastName: String,
    Username: String,
    Email: String,
    Password: String
}

const User = mongoose.model("users", userSchema);

module.exports = User;