const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const pageCommentSchema = new Schema (
  {
    page_number: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model ('PageComment', pageCommentSchema);
