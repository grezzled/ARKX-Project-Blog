const mongoose = require('mongoose');
const strings = require('../../../config/strings.config')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, strings.USERNAME_REQUIRED],
        unique: [true, strings.USERNAME_EXISTS]
    },
    email: {
        type: String,
        required: [true, strings.EMAIL_REQUIRED],
        unique: [true, strings.EMAIL_EXISTS],
        validate: {
            validator: function (value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: strings.INVALID_EMAIL_FORMAT
        }
    },
    password: {
        type: String,
        required: [true, strings.PASSWORD_REQUIRED],
    },
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const message = `${field} already exists.`;
        next(new Error(message));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);