const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TypeProductService = require("../services/typeProduct.service");

exports.create = async (req, res, next) => {
    
    // if(!req.body?.id_loaihh){
    //     return next(new ApiError(400, "Id loại hàng hoá không được để trống"));
    // }
    // if(!req.body?.ten_loaihh){
    //     return next(new ApiError(400, "Tên loại hàng hoá không được để trống"));
    // }

    try{
        const typeproductService = new TypeProductService(MongoDB.client);
        const document = await typeproductService.create(req.body);
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

    try{
        const typeproductService = new TypeProductService(MongoDB.client);
        documents = await typeproductService.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

exports.findById = async (req, res, next) => {
    try{
        const typeproductService = new TypeProductService(MongoDB.client);
        const document = await typeproductService.findById(req.params.id);
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
        const typeproductService = new TypeProductService(MongoDB.client);
        const document = await typeproductService.update(req.params.id, req.body);
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
        const typeproductService = new TypeProductService(MongoDB.client);
        const document = await typeproductService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
