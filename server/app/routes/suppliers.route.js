const express = require("express");
const nccs = require("../controllers/suppliers.controller");

const router = express.Router();

router.route("/")
    .get(nccs.findAll)
    .post(nccs.create);

router.route("/:id")
    .get(nccs.findById)
    .put(nccs.update)
    .delete(nccs.delete);

module.exports = router;