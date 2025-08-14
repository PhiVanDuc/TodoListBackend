const { v4 } = require("uuid");
const accounts = require("../../db/accounts");
const response = require("../../utils/response");

module.exports = async (req, res) => {
    try {
        const { name, password } = req.body || {};

        if (!name || !password) {
            return response(res, 400, {
                success: false,
                message: "Vui lòng cung cấp đủ dữ liệu!"
            });
        }

        accounts.push({
            id: v4(),
            name,
            password
        });

        return response(res, 200, {
            success: true,
            message: "Thành công đăng ký tài khoản!"
        });
    }
    catch(error) {
        console.log(error);
        
        return response(res, 500, {
            success: false,
            message: "Lỗi server!"
        });
    }
}