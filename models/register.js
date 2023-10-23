const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerSchema = new Schema({
    name:String,
    email:String,
    mobile:Number,
    password:String
},{versionKey:false});
module.exports = mongoose.model('register',registerSchema);
