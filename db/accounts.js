const { v4 } = require("uuid");

const accounts = [
    {
        id: v4(),
        name: "pvd",
        password: "123"
    }
];

module.exports = accounts;