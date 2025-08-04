module.exports = {
    notFoundHandler: (req, res, next) => {
        res.status(404).json({
            success: false,
            message: "Không tìm thấy URL!"
        })
    },
    generalErrorHandler: (err, req, res, next) => {
        console.error(err.stack);

        res.status(err.status || 500).json({
            success: false,
            message: err.message || "Lỗi máy chủ nội bộ!"
        })
    }
}