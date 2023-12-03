const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    rank:{
        type:String,
        require:true,
    },
    date:{
        type: String,
        require:true,
    }
});

module.exports = mongoose.model("users",userModel); // users jmeno kolekce v MongoDB