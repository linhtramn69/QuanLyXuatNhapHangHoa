const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const StaffService = require("../services/staff.service");

exports.create = async (req, res, next) => {

    try{
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        if(document){
            return res.send(document);
        }
        else return res.send({mess: "Email is exists"});
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
        const staffService = new StaffService(MongoDB.client);
        documents = await staffService.findAll({});
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
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
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
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.update(req.params.id, req.body);
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
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
