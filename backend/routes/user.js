const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../middleware');
const bcrypt = require('bcryptjs');

const userSchema = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});
const signInSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
});
router.post("/signup", async (req, res) => {
    const { userName, password, firstName, lastName } = req.body;
    try {
        const { success } = userSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Incorrect inputs"
            });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        const newUser = new User({
            userName,
            firstName,
            lastName,
            password
        });
        await newUser.save();

        const userId = newUser._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            userId,
            token
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signInSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }

    try {
        const { userName, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(401).json({
                message: "User doesn't exists"
            });
        }
        const userId = user._id;
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }

        // If user exists, generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h'
        });
        console.log(userId + " Logged in");

        // Send the token in the response
        res.json({
            userId,
            token: token
        });

    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    console.log(req.body, {
        _id: req.userId
    });


    await User.updateOne({
        _id: req.userId
    }, req.body)


    res.json({
        message: "Updated Successfully"
    })
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const authenticatedUserId = req.userId;
    const user = await User.find({
        _id: { $ne: authenticatedUserId },
        $or: [{
            firstName: {
                "$regex": filter,
                $options: 'i'
            }
        }, {
            lastName: {
                "$regex": filter,
                $options: 'i'
            }
        }]
    })

    res.json({
        user: user.map(user => ({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    })

})


router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        "auth": "verified"
    })
})
module.exports = router;