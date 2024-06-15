const express = require("express")
const mainRouter = express.Router();
const userRouter = require("./user")
const accountRouter = require("./account")


mainRouter.get("/",(req,res)=>{
    res.json({
        "wad": "er"
    })
})

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);
module.exports = mainRouter;