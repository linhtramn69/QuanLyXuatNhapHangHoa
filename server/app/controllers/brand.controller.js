const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const BrandService = require("../services/brand.service");

exports.create = async (req, res, next) => {

    try{
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.create(req.body);
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
        const brandService = new BrandService(MongoDB.client);
        documents = await brandService.findAll({});
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
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
exports.findByName = async (req, res, next) => {
    try{
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.findByName(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
exports.findByKho = async (req, res, next) => {
    let documents = []
    try {
      const brandService = new BrandService(MongoDB.client);
      const document = await brandService.getByKho(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(500, `Error retrieving contact with bs`)
      );
    }
  };
exports.update = async (req, res, next) => {
    try{
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.update(req.params.id, req.body);
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
        const brandService = new BrandService(MongoDB.client);
        const document = await brandService.delete(req.params.id);
        return res.send("Xoá thành công");
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the product")
        );
    }
};
