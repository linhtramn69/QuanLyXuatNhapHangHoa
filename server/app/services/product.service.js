const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    // dinh nghia csdl
    extractConactData(payload) {
        const product = {
            ten_hh: payload.ten_hh,
            dvt: payload.dvt,
            dongia: payload.dongia,
            slt: payload.slt,
            hsd: payload.hsd,
            ghichu: payload.ghichu,
            ten_loaihh: payload.ten_loaihh,
            nsx: payload.nsx,
            hsd: payload.hsd,
            phieu_nhap:{
                id_phieu_nhap: payload.phieu_nhap.id_phieu_nhap,
                thoi_gian_nhap: payload.phieu_nhap.thoi_gian_nhap,
                ten_ncc: payload.phieu_nhap.ten_ncc,
                ten_kho: payload.phieu_nhap.ten_kho
            },
            phieu_xuat: payload.phieu_xuat
        };

        // remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractConactData(payload);
        const result = await this.Product.insertOne(
            product
        );
        return result.value;
    }

    async findAll() {
        const result = await this.Product.find();
        return await result.toArray();
    }

    async findById(id) {
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.Product.findOne(id);
        return result;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.Product.findOneAndUpdate(
            id,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.Product.findOneAndDelete(id);
        return result.value;
    }

    // async find(filter){
    //     const cursor = await this.Product.find(filter);
    //     return await cursor.toArray();
    //   }

    async findAllByTypeProduct(name) {
        return await this.find({
            ten_loaihh : name
          });
    }
}

module.exports = ProductService;