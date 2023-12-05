const express = require("express"); // 1 server 
const session = require("express-session"); // 10 session
const app = express(); // 1 server 
const PORT = process.env.PORT || 5000; // 1 server 

const db = require("./connectDB"); // 2 connectDB

const saveRegistration = require("./routes/POST/saveRegistration"); // 3 POST registration
const getRegistration = require("./routes/GET/getRegistration"); // 4 GET registration 
const loginData = require("./routes/POST/loginData") // 6 Login POST
const productSave = require("./routes/POST/saveProduct_Data") // 8 Product POST
const productsGet = require("./routes/GET/getProducts") // 9 Products Get
const getSessionDataRoute = require("./routes/GET/getSessionData"); // 10.1 - Session Get

const cors = require("cors"); // 5 front-end


// 10 session - Přidání express-session
app.use(
    session({
      secret: "tajnyKlic",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Trvání cookie v milisekundách (1 den)
      },
    })
  );


app.get("/",(req,res) => { // 1 server 
    res.send("Hlavni stranka");
});
app.listen(PORT, (err) => { // 1 server 
    console.log(`Server běží na portu ${PORT}!`);
});

// ----------------------

db.connect(); // 2 connectDB

app.use(express.json({extended:false})); // 2,5 Midleware for Routes

app.use("/",cors()); // 5 Front-end (musí být před Routes)

app.use("/", saveRegistration); // 3 POST registration
app.use("/", getRegistration); // 4 GET registration
app.use("/", loginData) // 6 POST Login
app.use("/", productSave) // 8 POST Product
app.use("/", productsGet) // 9 Products Get
app.use("/", getSessionDataRoute); // 10.1 Session Get
