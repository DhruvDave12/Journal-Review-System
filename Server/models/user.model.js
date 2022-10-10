const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['associate-editor', 'editor', 'user'],
    },
    article_reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Article'
    },
    article_author: {
        type: [Schema.Types.ObjectId],
        ref: 'Article'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);