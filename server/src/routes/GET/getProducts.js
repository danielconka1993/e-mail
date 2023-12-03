const getProdutcs = require("express").Router();
const modelProducts = require("../../models/product_Data");

getProdutcs.get("/get-products",(req,res) => {
    modelProducts.find({})
    .then((docs) => {
        return res.json({
            msg:`Produkty načteny Getem`,
            products:docs
        });
    })
    .catch((err) => {
        return res.json({
            msg: "Error " + err,
            documents:[]
        })
    }) 
})

module.exports = getProdutcs;