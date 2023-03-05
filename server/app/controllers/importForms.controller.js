const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const PhieuNhapService = require("../services/importForms.service");

exports.create = async (req, res, next) => {

    try{
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const document = await phieunhapService.create(req.body);

        return res.send(document.toString());
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
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        documents = await phieunhapService.findAll({});
    } 
    catch (error) {
        return next(new ApiError(500, "An error occured while get products"));
    }
    return res.send(documents);
};

exports.findById = async (req, res, next) => {
    try{
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const document = await phieunhapService.findById(req.params.id);
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
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        const document = await phieunhapService.update(req.params.id, req.body);
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
        const phieunhapService = new PhieuNhapService(MongoDB.client);
        
        const document = await phieunhapService.delete(req.params.id);
       return res.send(true);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
