const mongoose=require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    image : {type : String,  required : true},
    title : {type : String, required : true},

    // categoryHolder : {type :  mongoose.Schema.Types.ObjectID, ref : 'user'} ,

})

module.exports = mongoose.model("category", categorySchema)