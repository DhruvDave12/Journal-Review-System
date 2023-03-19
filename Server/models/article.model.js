const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    associate_editor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
    author_questions: {
      type: [Schema.Types.ObjectId],
      ref: "Question",
    },
    current_progress: {
      type: Number,
      default: 0,
    },
    time_alloted: {
      type: Number,
    },
    time_alloted_unit: {
      type: String,
      enum: ["days", "weeks", "months", "year"],
    },
    is_assigned: {
      type: Boolean,
      default: false,
    },
    pdfFile: {
      type: pdfSchema,
      required: true,
    },
    rejected_reviewers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    total_pages: {
      type: Number,
      required: true,
    },
    accepted_score: {
      type: Number,
      default: 0,
    },
    associate_decision: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
