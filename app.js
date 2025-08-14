require("dotenv").config();

// Import thư viện
const fs = require("fs");
const http = require("http");
const https = require("https");
const logger = require('morgan');
const express = require("express");
const cookieParser = require("cookie-parser");
const configCors = require("./libs/config-cors");

// Import router
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

// Import các middleware xử lý lỗi
const {
    notFoundHandler,
    generalErrorHandler
} = require("./libs/error-handlers");

// Tạo app
const app = express();

// Sử dụng các middleware cơ bản
app.use(configCors);
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Sử dụng các router
app.use("/", indexRouter);
app.use("/api", apiRouter);

// Sử dụng các middleware xử lý lỗi
app.use(notFoundHandler);
app.use(generalErrorHandler);

// Tạo server và lắng nghe port
// const server = http.createServer(app);

// server.listen(process.env.PORT || 3001, () => {
//     console.log(`Server đang chạy trên cổng ${process.env.PORT || 3001}`);
// });

// Sử dụng mrcert để dùng giao thức https (nếu cần)
https.createServer(
    {
        key: fs.readFileSync("dev.com+1-key.pem"),
        cert: fs.readFileSync("dev.com+1.pem")
    },
    app
)
.listen(process.env.PORT || 3001, () => {
    console.log(`Server đang chạy trên cổng ${process.env.PORT || 3001}`);
})