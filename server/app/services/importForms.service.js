const { ObjectId } = require("mongodb");

class ImportFormsService {
    constructor(client) {
        this.PhieuNhap = client.db().collection("importforms");
    }

    // dinh nghia csdl
    extractConactData(payload) {
        const phieunhap = {
            thoigian: payload.thoigian,
            nhanvien: payload.nhanvien,
            noi_nhap_hang: payload.noi_nhap_hang,
            noi_nhan_hang: payload.noi_nhan_hang,
            status: payload.status,
            products: payload.products,
            total: payload.total
        };

        // remove undefined fields
        Object.keys(phieunhap).forEach(
            (key) => phieunhap[key] === undefined && delete phieunhap[key]
        );
        return phieunhap;
    }

    async create(payload) {
        const phieunhap = this.extractConactData(payload);
        const result = await this.PhieuNhap.insertOne(phieunhap);
        return result.insertedId;
    }

    async findAll() {
        const result = await this.PhieuNhap.find();
        return await result.toArray();
    }

    async findById(id) {
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.PhieuNhap.findOne(id);
        return result;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.PhieuNhap.findOneAndUpdate(
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
        const result = await this.PhieuNhap.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = ImportFormsService;