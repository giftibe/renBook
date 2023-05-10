import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    pages: {
        type: Number,
        required: true,
        trim: true,
    },

    picture: {
        type: String,
        // required: true,
        trim: true,
    },

    author: {
        type: String,
        required: true,
        trim: true,
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

module.exports = mongoose.model('Book', bookSchema)