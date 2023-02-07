const mongoose=require('mongoose')
// const Schema = mongoose.Schema
const {Schema} = mongoose

const ticketSchema = new Schema({
    title : {type : String}, //was title, required : true}
    image : {type : String,  required : true},
    date : {type : Date, default : Date.now()},
    amount : {type : Number, default :'0'},
    category : {type : String, default :'undefined'},
    ticketHolder : {type :  mongoose.Schema.Types.ObjectID, ref : 'user', required: true} ,
    // link with user
})

module.exports = mongoose.model("ticket", ticketSchema)
//demander yacine si majuscule est obligatoire