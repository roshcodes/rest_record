const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    address:String,
    mobile:Number,
    services:String,
},{versionKey:false});
module.exports = mongoose.model('record', userSchema);