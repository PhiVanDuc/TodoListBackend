const todos = require("../../db/todos");

const response = require("../../utils/response");
const numeralsValidate = require("../../utils/numerals-validate");

module.exports = async (req, res) => {
    try {
        const { accountId, page, limit } = req.query || {};

        if (!accountId || !numeralsValidate(page) || !numeralsValidate(limit)) {
            return response(res, 400, {
                success: false,
                message: "Vui lòng cung cấp đủ dữ liệu!"
            });
        }

        const accountTodos = todos.find(obj => obj.account_id === accountId);
        return response(res, 200, {
            success: true,
            message: "Thành công lấy ra danh sách công việc!",
            data: accountTodos ? accountTodos.todos : []
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