const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("staffs");
    }

    // dinh nghia csdl
    // extractConactData(payload) {
    //     const typeproduct = {
    //         _id: payload._id,
    //         ten_loaihh: payload.ten_loaihh
    //     };

    //     // remove undefined fields
    //     Object.keys(typeproduct).forEach(
    //         (key) => typeproduct[key] === undefined && delete typeproduct[key]
    //     );
    //     return typeproduct;
    // }

    async login(payload) {
        const result = await this.User.findOne({
            "account.email": payload.email,
            "account.password": payload.password
        });
        return result;
    }

    async findById(id) {
        const result = await this.User.findOne({ _id: id });
        return result;
    }


}

module.exports = UserService;
