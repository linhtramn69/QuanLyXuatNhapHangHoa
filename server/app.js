const express = require("express");
const cors = require("cors");

//Route
const productRouter = require("./app/routes/product.route");
const typeProductRouter = require("./app/routes/typeProduct.route");
const nhaCungCapRouter = require("./app/routes/suppliers.route");
const partnerRouter = require("./app/routes/partners.route");
const staffRouter = require("./app/routes/staff.route");
const brandRouter = require("./app/routes/brand.route");
const khoRouter = require("./app/routes/kho.route");
const phieuNhapRouter = require("./app/routes/importForms.route");
const phieuXuatRouter = require("./app/routes/exportForms.route");
const userRouter = require("./app/routes/user.route");
const chucvuRouter = require("./app/routes/chucvu.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

//use Route
app.use("/api/products", productRouter);
app.use("/api/type-products", typeProductRouter);
app.use("/api/suppliers", nhaCungCapRouter);
app.use("/api/partners", partnerRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/brands", brandRouter);
app.use("/api/khos", khoRouter );
app.use("/api/import-forms", phieuNhapRouter);
app.use("/api/export-forms", phieuXuatRouter);
app.use("/api/user", userRouter);
app.use("/api/chucvu", chucvuRouter);

app.get("/", (req, res) => {
    res.json({mess: "Welcome"});
});

// 404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        mess: err.message || "Internal Server Error",
    });
});

module.exports = app;