const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
