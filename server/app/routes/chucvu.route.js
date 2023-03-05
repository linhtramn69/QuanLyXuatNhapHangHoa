const express = require("express");
const chucvu = require("../controllers/chucvu.controller");

const router = express.Router();

router.route("/")
    .get(chucvu.findAll);


module.exports = router;