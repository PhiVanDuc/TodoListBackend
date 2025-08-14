const cors = require("cors");

const configCors = cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 200
});

module.exports = configCors;