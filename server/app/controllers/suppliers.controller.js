const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const SuppliersService = require("../services/suppliers.service");

exports.create = async (req, res, next) => {
    try{
        const nccService = new SuppliersService(MongoDB.client);
        const document = await nccService.create(req.body);
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
        const nccService = new SuppliersService(MongoDB.client);
        documents = await nccService.findAll({});
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
        const nccService = new SuppliersService(MongoDB.client);
        const document = await nccService.findById(req.params.id);
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
        const nccService = new SuppliersService(MongoDB.client);
        const document = await nccService.update(req.params.id, req.body);
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
        const nccService = new SuppliersService(MongoDB.client);
        const document = await nccService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
