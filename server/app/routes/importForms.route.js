const express = require("express");
const phieunhaps = require("../controllers/importForms.controller");

const router = express.Router();

router.route("/")
    .get(phieunhaps.findAll)
    .post(phieunhaps.create);

router.route("/:id")
    .get(phieunhaps.findById)
    .put(phieunhaps.update)
    .delete(phieunhaps.delete);

module.exports = router;