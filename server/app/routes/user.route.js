const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/login")
    .post(user.login);


module.exports = router;