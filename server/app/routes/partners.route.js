const express = require("express");
const partner = require("../controllers/partners.controller");

const router = express.Router();

router.route("/")
    .get(partner.findAll)
    .post(partner.create);

router.route("/:id")
    .get(partner.findById)
    .put(partner.update)
    .delete(partner.delete);

module.exports = router;