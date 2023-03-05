const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const KhoService = require("../services/kho.service");
exports.create = async (req, res, next) => {
    try{
        const khoService = new KhoService(MongoDB.client);
        const document = await khoService.create(req.body);
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
        const khoService = new KhoService(MongoDB.client);
        documents = await khoService.findAll({});
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
        const khoService = new KhoService(MongoDB.client);
        const document = await khoService.findById(req.params.id);
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
        const khoService = new KhoService(MongoDB.client);
        const document = await khoService.update(req.params.id, req.body);
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
        const khoService = new KhoService(MongoDB.client);
        const document = await khoService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

