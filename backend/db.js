const mongoose = require("mongoose")
const {mongoid} = require("./config")
mongoose.connect(mongoid)

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('user', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: User
    },
    balance:
    {
        type: Number,
        required: true
    }
})


const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
};