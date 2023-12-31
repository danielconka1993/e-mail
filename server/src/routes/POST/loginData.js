const express = require("express");
const loginData = express.Router();
const UserModel = require("../../models/user");
const { setSession } = require("../../helpers/session");

loginData.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hledání uživatele v databázi podle e-mailu a hesla
    const user = await UserModel.findOne({ email, password });

    if (user) {
      // Uložení informací o uživateli do session
      setSession(req, {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        rank: user.rank,
        shoppingBasket: user.shoppingBasket,
        purchasesCompleted: user.purchasesCompleted,
        date: user.date
      });

      // Vrátíme úspěšnou odpověď
      res
        .status(200)
        .json({ msg: "Přihlášení úspěšné", user: [user], success: true });
    } else {
      // Pokud uživatel neexistuje, vrátíme chybovou odpověď
      res.status(401).json({ msg: "Přihlašovací údaje zadány špatně" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Chyba serveru" });
  }
});

module.exports = loginData;
