const express = require("express");
const router = express.Router();
const { getSessionData } = require("../../helpers/session"); // bere pouze getSessionDAta

router.get("/getSessionData", (req, res) => {
  try {
    console.log("Trying to get session data...");
    const sessionData = getSessionData(req);

    if (sessionData) {
      console.log("Session data found:", sessionData);
      res.status(200).json(sessionData);
    } else {
      console.log("Session data not found");
      res.status(404).json({ msg: "Data not found in session" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;