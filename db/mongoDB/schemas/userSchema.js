const mongoose = require('mongoose');
const strings = require('../../../config/strings.config')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, strings.ID_REQUIRED],
        unique: [true, strings.ID_EXISTS]
    },
    username: {
        type: String,
        required: [true, strings.USERNAME_REQUIRED],
        unique: [true, strings.USERNAME_EXISTS],
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
        },
    },
    password: {
        type: String,
        required: [true, strings.PASSWORD_REQUIRED],
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    salary: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false,
    },
    inHold: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true, versionKey: false });

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        let message
        switch (field) {
            case 'id': message = strings.ID_EXISTS; break;
            case 'username': message = strings.USERNAME_EXISTS; break;
            case 'email': message = strings.EMAIL_EXISTS; break;
            default: message = `${field} already exists.`; break;
        }
        next(new Error(message));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);