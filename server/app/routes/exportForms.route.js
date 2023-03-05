const express = require("express");
const phieuxuats = require("../controllers/exportForms.controller");

const router = express.Router();

router.route("/all/:name")
    .get(phieuxuats.findExport)
router.route("/allcn/:name")
    .get(phieuxuats.findExportCN)
router.route("/")
    .get(phieuxuats.findAll)
    .post(phieuxuats.create);

router.route("/:id")
    .get(phieuxuats.findById)
    .put(phieuxuats.update)
    .delete(phieuxuats.delete);

module.exports = router;