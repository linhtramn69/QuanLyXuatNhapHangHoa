const express = require("express");
const brands = require("../controllers/brand.controller");

const router = express.Router();

router.route("/")
    .get(brands.findAll)
    .post(brands.create);

router.route("/:id")
    .get(brands.findById)
    .put(brands.update)
    .delete(brands.delete);

router.route("/getchinhanh/:id")
    .get(brands.findByKho)
router.route("/:name")
    .get(brands.findByName)

module.exports = router;