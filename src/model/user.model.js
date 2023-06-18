import mongoose from 'mongoose'
import { ROLE } from '../config/constant.config.js'
import bcrypt from 'bcrypt'
const rounds = +process.env.rounds

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

    // imageTag: {
    //     type: String
    // },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew('password')) {
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(rounds);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});

userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const userModel = mongoose.model('user', userSchema)
export default userModel