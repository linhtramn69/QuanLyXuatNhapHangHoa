const { ObjectId } = require("mongodb");

class ChucVuService 
{
    constructor(client) {
        this.ChucVu = client.db().collection("ChucVus");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const chucvu = {
            _id: payload.ma_cv,
            chuc_vu: payload.chuc_vu
        };

        // remove undefined fields
        Object.keys(chucvu).forEach(
            (key) => chucvu[key] === undefined && delete chucvu[key]
        );
        return chucvu;
    }

    async create (payload){
        const chucvu = this.extractConactData(payload);
        const result = await this.ChucVu.insertOne(chucvu);
        return result.value;
    }

    async findAll(){
        const result = await this.ChucVu.find();
        return await result.toArray();
    }

    async findById(id){
        const result = await this.ChucVu.findOne({_id: id});
        return result;
    }

    async update (id, payload){
        const update = this.extractConactData(payload);
        const result = await this.ChucVu.findOneAndUpdate(
            { _id: id },
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete (id){
        const result = await this.ChucVu.findOneAndDelete({_id:id});
        return result.value;
    }
}

module.exports = ChucVuService;
