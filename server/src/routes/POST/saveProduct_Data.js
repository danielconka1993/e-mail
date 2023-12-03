const saveProduct_Data = require("express").Router();
const modelProduct = require("../../models/product_Data");

saveProduct_Data.post("/save-product",(req,res) => {
    const {name, description, prices, category_main, category_second, attributes,  quantities, availability, manufactures, imgs_number, date } = req.body;

    const product = new modelProduct({
        name,
        description,
        manufactures,
        category_main,
        category_second,
        attributes,
        quantities,
        prices,
        availability,
        imgs_number,
        date
    })

    product.save()
    .then((document) => {
        res.json({
            msg: `Product Add ${JSON.stringify(document)}`,
            success:true
        })
    })
    .catch((err) => {
        console.error("Products nepřidán + err");
    })
})

module.exports = saveProduct_Data; // Remove the extra bracket and export the router