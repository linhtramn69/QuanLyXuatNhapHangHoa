const { ObjectId } = require("mongodb");

class KhoService {
    constructor(client) {
        this.kho = client.db().collection("khos");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const kho = {
            ten_kho: payload.ten_kho,
            diachi: payload.diachi,
            sdt: payload.sdt
        };
        // remove undefined fields
        Object.keys(kho).forEach(
            (key) => kho[key] === undefined && delete kho[key]
        );
        return kho;
    }

    async create (payload){
        const kho = this.extractConactData(payload);
        const result = await this.kho.insertOne(kho);
        return result.value;
    }

    async findAll(){
        const result = await this.kho.find();
        return await result.toArray();
    }
    async findById(id){
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.kho.findOne(id);
        return result;
    }
    async update (id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.kho.findOneAndUpdate(
            id,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete (id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.kho.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = KhoService;