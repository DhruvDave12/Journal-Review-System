const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    page_reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'PageReview',
    },
    author_question_answers: {
        type: [{
            question: {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            },
            answer: {
                type: String,
            },
        }],
    },
    critical_analysis: {
        type: String,
    },
    author_question_score: {
        type: Number,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    progress: {
        type: Number,
        default: 0,
    },
    author_test_passed: {
        type: Boolean,
        default: false,
    },
    should_be_published: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);