const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    user: String,
    pass: String,
});

module.exports = model("userData",userSchema);