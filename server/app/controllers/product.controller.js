const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ProductService = require("../services/product.service");

exports.create = async (req, res, next) => {
    
    if(!req.body?.ten_hh){
        return next(new ApiError(400, "Tên hàng hoá không được để trống"));
    }

    try{
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        console.log("find name",name);
        if (name) {
            documents = await productService.findAllByTypeProduct(name);
        } 
        else {
            documents = await productService.findAll({});
        }
    } 
    catch (error) {
        return next(new ApiError(500, "An error occured while get products"));
    }
    return res.send(documents);
};

exports.findById = async (req, res, next) => {
    try{
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

exports.update = async (req, res, next) => {
    try{
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
       
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
exports.delete = async (req, res, next) => {
    try{
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};