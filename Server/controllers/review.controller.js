const User = require ('../models/user.model');
const Article = require ('../models/article.model');
const Review = require ('../models/review.model');
const PageReview = require ('../models/page_review.model');
const PageComment = require('../models/page_comment.model');

module.exports.getRequests = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById (userID).populate ('article_reviews');
    if (!user) {
      return res.status (403).send ({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role != 'user') {
      return res.status (403).send ({
        success: false,
        message: 'You are not permitted to access this route',
      });
    }
    const requests = user.article_reviews.filter (
      review =>
        review.author.toString () !== userID &&
        !review.reviews.includes (userID)
    );
    res.status (200).send ({
      success: true,
      message: 'Successfully, fetched all requests',
      requests,
    });
  } catch (err) {
    return res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.acceptArticle = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById (userID);
    if (!user) {
      return res.status (403).send ({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role != 'user') {
      return res.status (403).send ({
        success: false,
        message: 'You are not permitted to access this route',
      });
    }

    const {articleID} = req.params;

    const article = await Article.findById (articleID).populate (
      'author_questions'
    );

    if (!article) {
      return res.status (403).send ({
        success: false,
        message: 'Article not found',
      });
    }

    // let score = 0;
    // [...authorAnswers].forEach(answer => {
    //     const question = article.author_questions.find(question => question._id == answer.questionID);
    //     if(!question){
    //         return res.status(403).send({
    //             success: false,
    //             message: 'Question not found'
    //         });
    //     }
    //     const correctAnswer = question.correct_answer;
    //     if(answer.answer === correctAnswer){
    //         score ++;
    //     }
    // });
    user.article_reviews = user.article_reviews.filter (
      review => review.toString () !== articleID
    );
    await user.save ();
    const review = new Review ({
      reviewer: userID,
      article: articleID,
    });

    await review.save ();

    article.reviews.push (review._id);
    // ON EACH REVIEW WE WILL UPDATE THE CURRENT PROGRESS TO +10
    // TODO -> check if we are comfortable with current progress as enum string of stages.
    // article.current_progress += 10;
    await article.save ();

    res.status (200).send ({
      success: true,
      message: 'Successfully, accepted article',
      article,
    });
  } catch (err) {
    return res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.rejectArticle = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById (userID);
    if (!user) {
      return res.status (403).send ({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role != 'user') {
      return res.status (403).send ({
        success: false,
        message: 'You are not permitted to access this route',
      });
    }

    const {articleID} = req.params;
    const article = await Article.findById (articleID);
    article.rejected_reviewers.push (userID);
    await article.save ();

    res.status (200).send ({
      success: true,
      message: 'Successfully, rejected article',
      article,
    });
  } catch (err) {
    return res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.getCurrentlyReviewing = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById (userID);
    if (!user) {
      return res.status (403).send ({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role != 'user') {
      return res.status (403).send ({
        success: false,
        message: 'You are not permitted to access this route',
      });
    }

    // find all articles where author is not the current user
    const articles = await Article.find ({author: {$ne: userID}}).populate (
      'reviews'
    );
    const currentlyReviewing = articles.filter (article => {
      const review = article.reviews.find (
        review => review.reviewer.toString () === userID
      );
      return review;
    });

    res.status (200).send ({
      success: true,
      message: 'Successfully, fetched all currently reviewing articles',
      currently_reviewing: currentlyReviewing,
    });
  } catch (err) {
    return res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.postPageWiseReview = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    return res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const userID = payload._id;
  try {
    const user = await User.findById (userID);
    if (!user) {
      return res.status (403).send ({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role != 'user') {
      return res.status (403).send ({
        success: false,
        message: 'You are not permitted to access this route',
      });
    }

    const {articleID} = req.params;
    const {pageNumber, review} = req.body;

    const article = await Article.findById (articleID).populate ('reviews');
    const reviewObj = article.reviews.find (
      review => review.reviewer.toString () === userID
    );
    if (!reviewObj) {
      return res.status (403).send ({
        success: false,
        message: 'You are not reviewing this article yet',
      });
    }

    const pageReview = await PageReview.findOne ({
      article: articleID,
    }).populate ('comments');

    if (!pageReview) {

      const pageComment = new PageComment({
        comment: review,
        page_number: pageNumber,
      })
      await pageComment.save();
      const comments = [pageComment._id];
      const newPageReview = new PageReview ({
        article: articleID,
        comments,
      });

      await newPageReview.save ();
      return res.status (200).send ({
        success: true,
        message: 'Successfully, posted page review',
        page_review: newPageReview,
      });
    } else {
      const pageReviewIndex = pageReview.comments.findIndex (
        comment => comment.page_number === pageNumber
      );
      if (pageReviewIndex != -1) {
        pageReview.comments[pageReviewIndex].comment = review;
      } else {
        const pageComment = new PageComment({
            comment: review,
            page_number: pageNumber,
        })
        await pageComment.save();
        pageReview.comments.push (pageComment._id);
      }
      await pageReview.save ();

      // after doing this we have to increase the progress of the article
      const totalPages = article.total_pages;
      const totalComments = pageReview.comments.length;
      console.log("TotalComments", totalComments);
      // convert below to allow floating point numbers also
      const progress = (totalComments / totalPages) * 60;
      console.log("Progress", progress);
      article.current_progress = progress;
      await article.save ();
      
      return res.status (200).send ({
        success: true,
        message: 'Successfully, posted page review',
        page_review: pageReview,
      });
    }
  } catch (err) {
    return res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
