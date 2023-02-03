const mongoose=require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    name : {type : String, required : true}, //was title
    image : {type : String,  required : true},
    date : {type : Date, default : Date.now()},
    // amount : {type : Number, required : true},
    // ticketHolder : {type :  mongoose.Schema.Types.ObjectID, ref : 'user'} ,

})

module.exports = mongoose.model("ticket", ticketSchema)