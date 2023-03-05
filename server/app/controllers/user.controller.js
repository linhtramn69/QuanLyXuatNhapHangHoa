const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");

exports.login = async (req, res, next) => {

    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.login(req.body);
        console.log(document);
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
        const userService = new UserService(MongoDB.client);
        documents = await userService.findAll({});
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
