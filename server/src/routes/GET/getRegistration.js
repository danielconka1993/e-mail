const getRegistration = require("express").Router();
const modelUser = require("../../models/user");

getRegistration.get("/get-registration",(req,res) => {
    modelUser.find({})
    .then((docs) => {
        return res.json({
            msg:`Uživatelé načteni Getem`,
            users:docs
        });
    })
    .catch((err) => {
        return res.json({
            msg: "Error " + err,
            documents:[]
        })
    }) 
})

module.exports = getRegistration;