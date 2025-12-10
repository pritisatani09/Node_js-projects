const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobileno: {
        type: String
    },
    role: {
        type: String,
        enum: ['Admin', 'User']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);