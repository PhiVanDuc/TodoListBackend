const todos = require("../../db/todos");
const response = require("../../utils/response");

module.exports = async (req, res) => {
    try {
        const { accountId, todoId } = req.query || {};

        if (!accountId || !todoId) {
            return response(res, 400, {
                success: false,
                message: "Vui lòng cung cấp đủ dữ liệu!"
            });
        }

        const accountTodos = todos.find(obj => obj.account_id === accountId);
        if (!accountTodos) {
            return response(res, 404, {
                success: false,
                message: "Danh sách công việc trống!",
            });
        }

        const indexTodo = accountTodos.todos.findIndex(obj => obj.id === todoId);
        if (indexTodo === -1) {
            return response(res, 404, {
                success: false,
                message: "Không tìm thấy công việc!",
            });
        }

        accountTodos.todos.splice(indexTodo, 1);
        return response(res, 200, {
            success: true,
            message: "Xóa công việc thành công!"
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