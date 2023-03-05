const { ObjectId } = require("mongodb");

class TypeProductService 
{
    constructor(client) {
        this.TypeProduct = client.db().collection("typeproducts");
    }

    // dinh nghia csdl
    extractConactData (payload) {
        const typeproduct = {
            _id: payload.ma_loai,
            ma_loai: payload.ma_loai,
            ten_loaihh: payload.ten_loaihh
        };

        // remove undefined fields
        Object.keys(typeproduct).forEach(
            (key) => typeproduct[key] === undefined && delete typeproduct[key]
        );
        return typeproduct;
    }

    async create (payload){
        const typeproduct = this.extractConactData(payload);
        const result = await this.TypeProduct.insertOne(typeproduct);
        return result.value;
    }

    async findAll(){
        const result = await this.TypeProduct.find();
        return await result.toArray();
    }

    async findById(id){
        const result = await this.TypeProduct.findOne({_id: id});
        return result;
    }

    async update (id, payload){
        const update = this.extractConactData(payload);
        const result = await this.TypeProduct.findOneAndUpdate(
            { _id: id },
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete (id){
        const result = await this.TypeProduct.findOneAndDelete({_id:id});
        return result.value;
    }
}

module.exports = TypeProductService;
