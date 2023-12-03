const mongoose = require("mongoose");

const product_dataModel = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        unique: true
    },
    description:{
        type: String,
        require:true,
    },
    manufacturer:{
        type: String,
        require:true,
    },
    category_main:{
        type: String,
        require: true
    },
    category_second:{
        type: String,
        require: true
    },
    attributes:{
        type: [String],
        require:true,
    },
    quantities:{
        type:[String],
        require:true
    },
    prices: {
        type:[String],
        require: true,
    },
    availability:{ 
        type: [String],
        require:true,
    },
    imgs_number: {
        type: String,
        require:true,
    },
    date:{
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("products",product_dataModel);