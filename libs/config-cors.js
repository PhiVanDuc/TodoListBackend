const cors = require("cors");

const configCors = cors({
    origin: ["http://localhost:5173", "https://todo-list-tanstack-query.vercel.app"],
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 200
});

module.exports = configCors;