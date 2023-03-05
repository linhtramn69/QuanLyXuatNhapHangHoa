const { ObjectId } = require("mongodb");

class BrandService {
    constructor(client) {
        this.Brand = client.db().collection("brands");
        this.Kho = client.db().collection("khos");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const brand = {
            _id: payload.sdt,
            ten_cn: payload.ten_cn,
            diachi: payload.diachi,
            kho: payload.kho,
            sdt: payload.sdt
        };

        // remove undefined fields
        Object.keys(brand).forEach(
            (key) => brand[key] === undefined && delete brand[key]
        );
        return brand;
    }

    async create (payload){
        const brand = this.extractConactData(payload);
        const result = await this.Brand.insertOne(brand);
        return result.value;
    }

    async findAll(){
        const result = await this.Brand.find();
        return await result.toArray();
    }

    async findById(id){
        const result = await this.Brand.findOne({
            _id: id
        });
        return result;
    }
    async findByName(name){
        const result = await this.Brand.findOne({
            kho: name
        });
        return result;
    }
    async getByKho(id){
        const result = await this.Brand.aggregate([
            {
                $lookup: {
                  from: "khos",
                  let: { kho: "$kho._id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ["$_id", "$$kho"] },
                            { $eq: ["$$kho", id] },
                          ],
                        },
                      },
                    },
                  ],
                  as: "chinhanh_kho",
                },
              },
              { $unwind: "$chinhanh_kho" },
        ])
        return await result.toArray();
    }
    async update (id, payload){
        const update = this.extractConactData(payload);
        const result = await this.Brand.findOneAndUpdate(
            {_id: id},
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete (id){
        const result = await this.Brand.findOneAndDelete({_id:id});
        return result.value;
    }
}

module.exports = BrandService;