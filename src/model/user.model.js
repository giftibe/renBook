import mongoose from 'mongoose'
import { ROLE } from '../config/constant.config.js'
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    avatarURL: {
        type: String,
    },

    imageTag: {
        type: String
    },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10,
        unique: true,
    },

    tel: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        trim: true,
        minlength: 5,
        required: true,
    },

    role: {
        type: String,
        trim: true,
        lowercase: true,
        title: [ROLE.ADMIN, ROLE.USER],
        default: ROLE.USER,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    { immutable: true },
    { timestamps: true }
);

userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const userModel = mongoose.model('user', userSchema)
export default userModel