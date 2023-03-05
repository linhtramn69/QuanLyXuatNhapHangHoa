const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const PhieuXuatService = require("../services/exportForms.service");

exports.create = async (req, res, next) => {

    try{
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        const document = await phieuxuatService.create(req.body);

        return res.send(document.toString());
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};

exports.findExport = async (req, res, next) => {
    let documents = [];
    try {
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        documents = await phieuxuatService.findExport(req.params.name);
    } 
    catch (error) {
        return next(new ApiError(500, "An error occured while get products"));
    }
    return res.send(documents);
};
exports.findExportCN = async (req, res, next) => {
    let documents = [];
    try {
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        documents = await phieuxuatService.findExportCN(req.params.name);
    } 
    catch (error) {
        return next(new ApiError(500, "An error occured while get products"));
    }
    return res.send(documents);
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        documents = await phieuxuatService.findAll({});
    } 
    catch (error) {
        return next(new ApiError(500, "An error occured while get products"));
    }
    return res.send(documents);
};

exports.findById = async (req, res, next) => {
    try{
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        const document = await phieuxuatService.findById(req.params.id);
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
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        const document = await phieuxuatService.update(req.params.id, req.body);
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
        const phieuxuatService = new PhieuXuatService(MongoDB.client);
        
        const document = await phieuxuatService.delete(req.params.id);
       return res.send(true);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
