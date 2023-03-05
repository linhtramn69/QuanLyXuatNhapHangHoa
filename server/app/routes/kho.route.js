const express = require("express");
const khos = require("../controllers/kho.controller");

const router = express.Router();

router.route("/")
    .get(khos.findAll)
    .post(khos.create);
router.route("/:id")
    .get(khos.findById)
    .put(khos.update)
    .delete(khos.delete);

module.exports = router;