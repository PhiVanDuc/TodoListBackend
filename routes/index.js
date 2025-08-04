const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        title: "Express Base",
        desc: "Chào mừng đến với express base"
    })
});

module.exports = router;