const { ObjectId } = require("mongodb");

class PartnersService {
    constructor(client) {
        this.DoiTac = client.db().collection("partners");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const doitac = {
            ten_doitac: payload.ten_doitac,
            diachi: payload.diachi,
            sdt: payload.sdt
        };

        // remove undefined fields
        Object.keys(doitac).forEach(
            (key) => doitac[key] === undefined && delete doitac[key]
        );
        return doitac;
    }

    async create (payload){
        const doitac = this.extractConactData(payload);
        const result = await this.DoiTac.insertOne(doitac);
        return result.value;
    }

    async findAll(){
        const result = await this.DoiTac.find();
        return await result.toArray();
    }

    async findById(id){
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.DoiTac.findOne(id);
        return result;
    }

    async update (id, payload){
        id={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.DoiTac.findOneAndUpdate(
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
        const result = await this.DoiTac.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = PartnersService;