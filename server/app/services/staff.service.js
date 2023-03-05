const { json } = require("express");
const { ObjectId, Timestamp } = require("mongodb");
const nodeMailer = require('nodemailer');
class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("staffs");
    }

    // dinh nghia csdl
    extractConactData(payload) {
        const staff = {
            _id: payload.account.email,
            ten_nhanvien: payload.ten_nhanvien,
            noi_lam_viec: payload.noi_lam_viec,
            ngaysinh: payload.ngaysinh,
            sdt: payload.sdt,
            diachi: payload.diachi,
            chuc_vu: payload.chuc_vu,
            account: {
                email: payload.account.email,
                password: payload.account.password,
                role: payload.account.role
            }
        };

        // remove undefined fields
        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }
    async sendMail(to, subject, htmlContent){
        const adminEmail = 'coopmart.service69@gmail.com';
        const adminPassword = 'zkxomevbzvqlmkdy';
        const mailHost = 'smtp.gmail.com';
        const mailPort = 587;
        
        const transporter = nodeMailer.createTransport({
          host: mailHost,
          port: mailPort,
          secure: false, 
          auth: {
            user: adminEmail,
            pass: adminPassword
          }
        })
        const options = {
          from: adminEmail,
          to: to,
          subject: subject,
          html: htmlContent
        }
        return transporter.sendMail(options);
        
    }
    async create(payload) {
        const mess = "Email is exists";
        const staff = this.extractConactData(payload);
        const isExist = await this.Staff.findOne({ _id: staff._id });
        if (!isExist) {
            const result = await this.Staff.insertOne(staff);
            const name = staff.ten_nhanvien;
            const email = staff.account.email;
            const pass = staff.account.password;
            const subject = 'Thông tin đăng nhập';
            const html = `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" id="m_-7420206429851077222background-table"
            style="border-collapse:collapse;padding:0;margin:0 auto;background-color:#ebebeb;font-size:12px">
             <tbody >
                <tr>
                    <td valign="top" align="center"
                            style="font-family:Verdana,Arial;font-weight:normal;border-collapse:collapse;vertical-align:top;padding:0;margin:0;width:100%">
                            
                            <table  cellpadding="0" cellspacing="0" border="0" align="center"
                                style="border-collapse:collapse;padding:0;margin:0 auto;width:600px">
                                <tbody>
                                    <tr>
                                        <td valign="top"
                                            style="font-family:Verdana,Arial;font-weight:normal;border-collapse:collapse;vertical-align:top;padding:5px;margin:0;border:1px solid #ebebeb;background:#fff">
                                            <table cellpadding="0" cellspacing="0" border="0"
                                                style="border-collapse:collapse;padding:0;margin:0;width:100%">
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            style="font-family:Verdana,Arial;font-weight:normal;border-collapse:collapse;vertical-align:top;padding:10px 20px 15px;margin:0;line-height:18px">
                                                            <h1
                                                                style="font-family:Verdana,Arial;font-weight:bold;font-size:25px;margin-bottom:25px;margin-top:5px;line-height:28px">
                                                                Chào bạn ${name},</h1>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">Để truy cập vào hệ thống quản lý của Coopmart, bạn cần có một tài khoản với thông tin như sau:.</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">Email: ${email}</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">Password: ${pass}</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">Mọi thắc mắc và
                                                                góp ý vui lòng liên hệ với bộ phận nhân sự</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">- Hotline: 1900
                                                                6017</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">- Giờ làm việc:
                                                                8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)</p>
                                                            <p style="font-family:Verdana,Arial;font-weight:normal">- Email hỗ trợ:
                                                                <a href="mailto:hoidap@.vn" style="color:#3696c2"
                                                                    target="_blank">nhansu@coopmart.vn</a></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        `;
            
            await this.sendMail(email, subject, html)
            return result;
        }
    }

    async findAll() {
        const result = await this.Staff.find();
        return await result.toArray();
    }

    async findById(id) {
        const result = await this.Staff.findOne({ _id: id });
        return result;
    }

    async update(id, payload) {
        const update = this.extractConactData(payload);
        const result = await this.Staff.findOneAndUpdate(
            { _id: id },
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Staff.findOneAndDelete({ _id: id });
        return result.value;
    }
}

module.exports = StaffService;