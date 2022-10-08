const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageReviewSchema = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
    },
    comments: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('PageReview', pageReviewSchema);