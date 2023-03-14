const User = require("../models/user.model");
const Article = require("../models/article.model");
const Review = require("../models/review.model");
const PageReview = require("../models/page_review.model");
const PageComment = require("../models/page_comment.model");
const { sendMail } = require("../config/send_grid");

module.exports.getRequests = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID).populate("article_reviews");
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }
    const requests = user.article_reviews.filter(
      (review) =>
        review.author.toString() !== userID && !review.reviews.includes(userID)
    );
    res.status(200).send({
      success: true,
      message: "Successfully, fetched all requests",
      requests,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.acceptArticle = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    const { articleID } = req.params;

    const article = await Article.findById(articleID).populate(
      "author_questions associate_editor"
    );

    if (!article) {
      return res.status(403).send({
        success: false,
        message: "Article not found",
      });
    }

    user.article_reviews = user.article_reviews.filter(
      (review) => review.toString() !== articleID
    );
    await user.save();
    const review = new Review({
      reviewer: userID,
      article: articleID,
    });

    await review.save();

    article.reviews.push(review._id);
    // ON EACH REVIEW WE WILL UPDATE THE CURRENT PROGRESS TO +10
    // TODO -> check if we are comfortable with current progress as enum string of stages.
    // article.current_progress += 10;

    const associateEditorOfArticle = article.associate_editor;
    sendMail({
      to: associateEditorOfArticle.email,
      subject: "Article Accepted",
      html: `<strong>Article ${article.title} has been accepted by the author ${user.username} and is under review. You can review the progress on your homepage.</strong>`,
    });
    await article.save();

    res.status(200).send({
      success: true,
      message: "Successfully, accepted article",
      article,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.rejectArticle = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    const { articleID } = req.params;
    const article = await Article.findById(articleID);
    article.rejected_reviewers.push(userID);
    await article.save();

    res.status(200).send({
      success: true,
      message: "Successfully, rejected article",
      article,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getCurrentlyReviewing = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    // find all articles where author is not the current user
    const articles = await Article.find({ author: { $ne: userID } }).populate(
      "reviews"
    );
    const currentlyReviewing = articles.filter((article) => {
      const review = article.reviews.find(
        (review) => review.reviewer.toString() === userID
      );
      return review;
    });

    res.status(200).send({
      success: true,
      message: "Successfully, fetched all currently reviewing articles",
      currently_reviewing: currentlyReviewing,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.postPageWiseReview = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    const { articleID } = req.params;
    const { pageNumber, review } = req.body;

    const article = await Article.findById(articleID).populate("reviews");
    const reviewObj = article.reviews.find(
      (review) => review.reviewer.toString() === userID
    );
    const review_object = await Review.findById(reviewObj._id).populate(
      "page_reviews"
    );
    if (!review_object) {
      return res.status(403).send({
        success: false,
        message: "You are not reviewing this article yet",
      });
    }
    console.log("REVIEW OBJ: ", review_object);
    const pageReview = await PageReview.findOne({
      article: articleID,
    }).populate("comments");

    if (!pageReview) {
      const pageComment = new PageComment({
        comment: review,
        page_number: pageNumber,
      });
      await pageComment.save();
      const comments = [pageComment._id];
      const newPageReview = new PageReview({
        article: articleID,
        comments,
      });

      await newPageReview.save();
      return res.status(200).send({
        success: true,
        message: "Successfully, posted page review",
        page_review: newPageReview,
      });
    } else {
      const pageReviewIndex = pageReview.comments.findIndex(
        (comment) => comment.page_number === pageNumber
      );
      if (pageReviewIndex != -1) {
        pageReview.comments[pageReviewIndex].comment = review;
      } else {
        const pageComment = new PageComment({
          comment: review,
          page_number: pageNumber,
        });
        await pageComment.save();
        // check if pageComment._id already exists in pageReview.comments
        if (
          pageReview.comments.findIndex(
            (comment) => comment._id.toString() === pageComment._id.toString()
          ) === -1
        ) {
          pageReview.comments.push(pageComment._id);
        }
      }
      pageReview.reviewer = userID;
      await pageReview.save();

      const totalPages = article.total_pages;
      const totalComments = pageReview.comments.length;
      review_object.progress = (totalComments / totalPages) * 60;
      review_object.page_reviews.push(pageReview._id);
      await review_object.save();

      return res.status(200).send({
        success: true,
        message: "Successfully, posted page review",
        page_review: pageReview,
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.postAuthorQuestionAnswers = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    const { articleID } = req.params;
    const { answers } = req.body;
    console.log("ANSWERS: ", answers);
    if (!answers) {
      return res.status(403).send({
        success: false,
        message: "Answers are required",
      });
    }
    const article = await Article.findById(articleID).populate(
      "reviews author_questions"
    );
    // console.log("ARTICLE: ", article.reviews);
    const acceptedScore = article.accepted_score;
    // console.log("USER ID: ", userID);
    const review = article.reviews.find(
      (review) => review.reviewer.toString() === userID
    );
    // console.log("REVIEW: ", review);
    if (!review) {
      return res.status(403).send({
        success: false,
        message: "You are not reviewing this article yet",
      });
    }
    // console.log("AUTHOR QUESTIONS: ", article.author_questions);
    const review_obj = await Review.findById(review._id).populate(
      "page_reviews"
    );

    const userPageReview = review_obj.page_reviews.find(
      (page_review) => page_review.reviewer.toString() === userID
    );

    if (!userPageReview) {
      return res.status(403).send({
        success: false,
        message: "You are not reviewing this article yet",
      });
    }

    if (userPageReview.comments.length != article.total_pages) {
      return res.status(403).send({
        success: false,
        message: "You have not reviewed all the pages",
      });
    }

    let score = 0;
    [...answers].forEach((answer) => {
      const question = article.author_questions.find(
        (question) => question._id == answer.questionID
      );
      if (!question) {
        return res.status(403).send({
          success: false,
          message: "Question not found",
        });
      }
      const correctAnswer = question.correct_answer;
      if (answer.answer === correctAnswer) {
        score++;
      }
    });

    review_obj.author_question_score = score;
    review_obj.author_question_answers = answers;

    if (score < acceptedScore) {
      // TODO -> what to do when the user fails the test for the first time.
      return res.status(200).send({
        success: true,
        message: "You have failed the author question test",
        score,
      });
    }
    review_obj.author_test_passed = true;
    review_obj.progress += 20;
    await review_obj.save();

    res.status(200).send({
      success: true,
      message: "Successfully, posted author question answers",
      review_obj,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      err,
    });
  }
};

module.exports.handleFinalSubmission = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status(403).send({
      success: false,
      message: "Invalid access token",
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role != "user") {
      return res.status(403).send({
        success: false,
        message: "You are not permitted to access this route",
      });
    }

    const { articleID } = req.params;
    const article = await Article.findById(articleID).populate(
      "reviews author_questions"
    );

    // find the review of current reviewer
    const review = article.reviews.find(
      (review) => review.reviewer.toString() === userID
    );

    if (!review) {
      return res.status(403).send({
        success: false,
        message: "You are not reviewing this article yet",
      });
    }
    const review_obj = await Review.findById(review._id).populate(
      "page_reviews"
    );
    if (review_obj.author_test_passed === false) {
      return res.status(403).send({
        success: false,
        message: "You have not passed the author question test",
      });
    }

    // if it comes here it means that the user has passed the author question test
    const { critical_analysis, should_be_published } = req.body;
    if (!critical_analysis) {
      return res.status(403).send({
        success: false,
        message: "Critical analysis is required",
      });
    }

    review_obj.critical_analysis = critical_analysis;
    review_obj.progress += 20;
    review_obj.isCompleted = true;
    review_obj.should_be_published = should_be_published;
    await review_obj.save();

    res.status(200).send({
      success: true,
      message: "Successfully, submitted the review",
      review_obj,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      err,
    });
  }
};
