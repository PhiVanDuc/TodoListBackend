const accounts = require("../../db/accounts");

const response = require("../../utils/response");
const { generateToken, verifyToken } = require("../../utils/jwt-token");

module.exports = async (req, res) => {
    try {
        const { refreshToken: refreshTokenReq } = req.body || {};
        
        if (!refreshTokenReq) {
            return response(res, 401, {
                success: false,
                message: "Chưa xác thực!"
            });
        }

        const verify = verifyToken(refreshTokenReq);
        if (!verify.valid) {
            return response(res, 401, {
                success: false,
                message: "Chưa xác thực!"
            });
        }

        const account = accounts.find(acc => acc.id === verify.data.id);
        if (!account) {
            return response(res, 401, {
                success: false,
                message: "Chưa xác thực!"
            });
        }

        const accessToken = generateToken(account, "1h");
        const refreshToken = generateToken({ id: account.id }, "7d");

        return response(res, 200, {
            success: true,
            message: "Làm mới phiên đăng nhập thành công!",
            data: {
                accessToken,
                refreshToken
            }
        })
    }
    catch(error) {
        console.log(error);

        return response(res, 500, {
            success: false,
            message: "Lỗi server!"
        });
    }
}