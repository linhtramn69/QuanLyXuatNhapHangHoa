const { ObjectId } = require("mongodb");

class SuppliersService {
    constructor(client) {
        this.NhaCungCap = client.db().collection("suppliers");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const ncc = {
            ten_ncc: payload.ten_ncc,
            diachi: payload.diachi,
            sdt: payload.sdt
        };

        // remove undefined fields
        Object.keys(ncc).forEach(
            (key) => ncc[key] === undefined && delete ncc[key]
        );
        return ncc;
    }

    async create (payload){
        const ncc = this.extractConactData(payload);
        const result = await this.NhaCungCap.insertOne(ncc);
        return result.value;
    }

    async findAll(){
        const result = await this.NhaCungCap.find();
        return await result.toArray();
    }

    async findById(id){
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.NhaCungCap.findOne(id);
        return result;
    }

    async update (id, payload){
        id={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.NhaCungCap.findOneAndUpdate(
            id,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete (id){
        id={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.NhaCungCap.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = SuppliersService;