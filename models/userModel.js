const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Please enter your username" ]
    },
    email: {
        type: String,
        required: [ true, "Please email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [ true, "Please enter password"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
