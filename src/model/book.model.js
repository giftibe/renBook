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

    quantity: {
        type: Number,
        required: true,
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

const book_Model = mongoose.model('Book', bookSchema)
export default book_Model