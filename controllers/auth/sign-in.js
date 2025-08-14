const { v4 } = require("uuid");

const accounts = require("../../db/accounts");
const response = require("../../utils/response");
const { generateToken } = require("../../utils/jwt-token");

module.exports = async (req, res) => {
    try {
        const { name, password } = req.body || {};

        if (!name || !password) {
            return response(res, 401, {
                success: false,
                message: "Sai tên tài khoản hoặc mật khẩu!"
            });
        }

        const foundAcc = accounts.find(acc => acc.name === name && acc.password === password);
        if (!foundAcc) {
            return response(res, 401, {
                success: false,
                message: "Sai tên tài khoản hoặc mật khẩu!"
            });
        }

        const accessToken = generateToken(foundAcc, "1h");
        const refreshToken = generateToken({ id: foundAcc.id }, "7d");

        return response(res, 200, {
            success: true,
            message: "Đăng nhập thành công!",
            data: { accessToken, refreshToken }
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