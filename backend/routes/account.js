
const express = require("express");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();


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

    session.startSession();
    const { amount, to } = req.body;
    console.log(amount, to);

    const account = await Account.findOne({ userId: req.userId });


    if (account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            "message": "Insufficient Balance"
        })
    }
    const toUser = await User.findOne({
        userName: to
    });

    if (!toUser) {
        await session.abortTransaction();
        return res.status(400).json({
            "message": "Invalid account"
        })
    }

    const toAccount = await Account.findOne({ userId: toUser._id });
    if (!toAccount) {
        res.status(411).json({
            "Msg": "Invalid Account"
        })
    }
    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }

    )
    await Account.updateOne(
        { userId: toUser._id },
        { $inc: { balance: amount } }

    )
    await session.commitTransaction();


    res.json({
        message: "Transfer successful"
    })
});





//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Transfer successful"
//     })
// });




module.exports = router;

//kirat
// backend/routes/account.js
// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account } = require('../db');
// const { default: mongoose } = require('mongoose');

// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// });

// async function transfer(req) {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         console.log("Insufficient balance")
//         return;
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         console.log("Invalid account")
//         return;
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     console.log("done")
// }

// transfer({
//     userId: "666d8dd3b70ee5c210c66894",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

// transfer({
//     userId: "666d8dd3b70ee5c210c66894",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })
// module.exports = router;