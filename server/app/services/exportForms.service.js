const { ObjectId } = require("mongodb");

class ExportFormsService {
    constructor(client) {
        this.PhieuXuat = client.db().collection("exportforms");
    }

    // dinh nghia csdl
    extractConactData(payload) {
        const phieuxuat = {
            thoigian: payload.thoigian,
            nhanvien: payload.nhanvien,
            noi_xuat_hang: payload.noi_xuat_hang,
            noi_nhan_hang: payload.noi_nhan_hang,
            status: payload.status,
            products: payload.products,
            total: payload.total
        };

        // remove undefined fields
        Object.keys(phieuxuat).forEach(
            (key) => phieuxuat[key] === undefined && delete phieuxuat[key]
        );
        return phieuxuat;
    }

    async create(payload) {
        const phieuxuat = this.extractConactData(payload);
        const result = await this.PhieuXuat.insertOne(phieuxuat);
        return result.insertedId;
    }

    async findAll() {
        const result = await this.PhieuXuat.find();
        return await result.toArray();
    }
    async findExport(name) {
        try {
            const result = await this.PhieuXuat.aggregate([
                {
                    $match: {

                        "noi_nhan_hang.ten_kho": name,
                        "status": 2

                    }
                },
                { $unwind: "$products" },
                {
                    $group: {
                        _id: "$products._id",
                        export: { $mergeObjects: "$$ROOT.products" },
                        total: { $sum: "$products.sl" }
                    }
                }
            ]).toArray();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }
    async findExportCN(name) {
        try {
            const result = await this.PhieuXuat.aggregate([
                {
                    $match: {

                        "noi_nhan_hang.ten_cn": name,
                        "status": 2

                    }
                },
                { $unwind: "$products" },
                {
                    $group: {
                        _id: "$products._id",
                        export: { $mergeObjects: "$$ROOT.products" },
                        total: { $sum: "$products.sl" }
                    }
                }
            ]).toArray();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async findById(id) {
        id =
        {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const result = await this.PhieuXuat.findOne(id);
        return result;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const update = this.extractConactData(payload);
        const result = await this.PhieuXuat.findOneAndUpdate(
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
        const result = await this.PhieuXuat.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = ExportFormsService;