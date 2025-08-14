const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authRouter = require("./auth");
const tokenRouter = require("./token");
const todosRouter = require("./todos");

// Public
router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use("/todos", authMiddleware, todosRouter);

module.exports = router;