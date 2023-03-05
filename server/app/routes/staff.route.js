const express = require("express");
const staffs = require("../controllers/staff.controller");

const router = express.Router();

router.route("/")
    .get(staffs.findAll)
    .post(staffs.create);

router.route("/:id")
    .get(staffs.findById)
    .put(staffs.update)
    .delete(staffs.delete);

module.exports = router;