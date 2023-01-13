const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin-eric:321820508@cluster0.3tand.mongodb.net/stocksDB");

app.use("/", require("./Routes/userRoutes"));

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})
