const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestedArticle = new Schema({
    editor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isFulfilled: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RequestedArticle', requestedArticle);