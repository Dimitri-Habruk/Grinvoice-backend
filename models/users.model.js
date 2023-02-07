const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    isAdmin : {type: Boolean, default : false},
    name : {type : String, required : true},
    surname : {type : String, required : true},
    email : {type : String, unique : true },
    password : {type : String, required : true},
    dateProfileCreated :{type : Date, default : Date.now()},
})

module.exports = mongoose.model('user', userSchema)