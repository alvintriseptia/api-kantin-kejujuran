const express = require("express");
const productRouter = require("./productRoutes.js");
const boxRouter = require("./boxRoutes.js");
const userRouter = require("./userRoutes.js");

const router = express.Router();

router.use("/products", productRouter);
router.use("/box", boxRouter);
router.use("/", userRouter);

module.exports = router;
