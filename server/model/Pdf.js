const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pdfSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    updatedItems:{
        type:Array,
        default:[]
    }
})


const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = { Pdf }