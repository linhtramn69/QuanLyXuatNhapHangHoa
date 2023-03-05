const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ChucVuService = require("../services/chucvu.service");

exports.create = async (req, res, next) => {

    try{
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.create(req.body);
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
        const chucvuService = new ChucVuService(MongoDB.client);
        documents = await chucvuService.findAll({});
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
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
