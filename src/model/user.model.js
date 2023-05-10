import mongoose from 'mongoose'
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

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10,
        unique: true,
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

module.exports = mongoose.model('user', userSchema)