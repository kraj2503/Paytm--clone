
const express = require("express");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const mongoose = require("mongoose")


router.get('/balance', authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    });
    console.log(account)
    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    console.log(amount, to);

    const account = await Account.findOne({ userId: req.userId }).session(session);


    if (!account || account.balance < amount) {
        console.log("less money")
        await session.abortTransaction();
        return res.status(400).json({
            "message": "Insufficient Balance"
        })
    }
    const toUser = await Account.findOne({
        userId: to
    }).session(session);

    if (!toUser) {
        await session.abortTransaction();
        console.log("message Invalid account")
        return res.status(400).json({
            "message": "Invalid account"
        })
    }

    
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }

    ).session(session)
    await Account.updateOne(
        { userId: to},
        { $inc: { balance: amount } }

    ).session(session)
    await session.commitTransaction();
    console.log("Transfer successful");


    res.json({
        message: "Transfer successful"
    })
});

module.exports = router;