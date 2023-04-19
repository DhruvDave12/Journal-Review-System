const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestedArticle = new Schema(
  {
    editor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // IT SHOWS IF THE ARTICLE IS SEND TO THE DOMAINS
    isFulfilled: {
      type: Boolean,
      default: false,
    },
    // IT SHOWS IF THE REQUEST HAS BEEN SEND TO THE USER
    isRequested: {
      type: Boolean,
      default: false,
    },
    // IT SHOWS IF THE REQUEST HAS BEEN COMPLETED OR NOT
    isCompleted: {
      type: Boolean,
      default: false,
    },
    rejected_associate_editor: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RequestedArticle", requestedArticle);
