const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageReviewSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'PageComment',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('PageReview', pageReviewSchema);
