const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const PartnersService = require("../services/partner.service");

exports.create = async (req, res, next) => {
    try{
        const partners = new PartnersService(MongoDB.client);
        const document = await partners.create(req.body);
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
        const partners = new PartnersService(MongoDB.client);
        documents = await partners.findAll({});
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
        const partners = new PartnersService(MongoDB.client);
        const document = await partners.findById(req.params.id);
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
        const partners = new PartnersService(MongoDB.client);
        const document = await partners.update(req.params.id, req.body);
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
        const partners = new PartnersService(MongoDB.client);
        const document = await partners.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
