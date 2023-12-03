const saveRegistration = require("express").Router();
const modelUser = require("../../models/user");

saveRegistration.post("/save-registration",(req,res) => {
    console.log(req.body);
    const {name,email,password,phone,rank,date} = req.body;

    const registration = new modelUser({
        name,
        email,
        password,
        phone,
        rank,
        date
    });

    registration.save()
    .then((document) => {
        res.json({
            msg:`Registration complete ${JSON.stringify(document)}`,
            success:true, // pri uspechu
        })
    })
    .catch((err) => {
        // console.error("Registration failed" + err);
        if (err.code === 11000) { // MongoDB duplicate key error
            res.status(400).json({
                msg: "Email je již registrovaný",
                success:false, // při neuspechu
            });
        } else {
            res.status(500).json({
                msg: "Registration failed",
                success:false, // při neuspechu
            });
        }
    });
});

module.exports = saveRegistration;