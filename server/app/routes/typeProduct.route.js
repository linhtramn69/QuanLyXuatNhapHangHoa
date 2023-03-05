const express = require("express");
const typeproducts = require("../controllers/typeProduct.controller");

const router = express.Router();

router.route("/")
    .get(typeproducts.findAll)
    .post(typeproducts.create);

router.route("/:id")
    .get(typeproducts.findById)
    .put(typeproducts.update)
    .delete(typeproducts.delete);

module.exports = router;