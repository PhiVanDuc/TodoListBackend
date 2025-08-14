const todos = require("../../db/todos");

const { v4 } = require("uuid");
const response = require("../../utils/response");

module.exports = async (req, res) => {
    try {
        const { accountId, content, priority } = req.body || {};
        if (!accountId || !content || !content?.trim() || !priority) {
            return response(res, 400, {
                success: false,
                message: "Vui lòng cung cấp đủ dữ liệu!"
            });
        }

        const accountTodos = todos.find(obj => obj.account_id === accountId);

        const todo = {
            id: v4(),
            content: content.trim(),
            priority,
            completed: false
        }

        if (!accountTodos) {
            todos.push({
                account_id: accountId,
                todos: [todo]
            });
        }
        else accountTodos.todos.push(todo);

        return response(res, 200, {
            success: true,
            message: "Thêm công việc thành công!"
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