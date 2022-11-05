const Article = require ('../models/article.model');
const Question = require ('../models/questions.model');
const RequestedArticle = require('../models/requested_article.model');

module.exports.createArticle = async (req, res) => {

  const payload = req.payload;
  if (!payload) {
    res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }
  if(!req.file){
    res.status(400).send({
      success: false,
      message: "Please upload a pdf file"
    })
  }

  const authorID = payload._id;

  if (!authorID) {
    console.log("Author ID not found");
    res.status (403).send ({
      success: false,
      message: 'Invalid User',
    });
  }

  const {title, domain, author_questions, totalPages} = req.body;
  const {path, filename} = req.file;

  const pdfFile = {
    url: path,
    fileName: filename,
  }

  if(!path || !filename){
    res.status(400).send({
      success: false,
      message: "Internal Cloud Error"
    })
  }

  if (!title || !domain || !author_questions) {
    console.log("Title, domain or author questions not found");
    res.status (403).send ({
      success: false,
      message: 'All fields are required',
    });
  }

    //TODO -> Might fail this is just a postman fix
  const author_parsed_questions = JSON.parse(author_questions).author_questions;

  try {
    let quesIdArr = [];

    //TODO:  IMPROVE THE QUESTION ADDING API SO THAT LESS NETWORK CALLS ARE THERE
    author_parsed_questions.map (async (ques) => {
      if (ques.options.length != 4) {
        console.log("Options not found");
        res.status (403).send ({
          success: false,
          message: 'Four options are required',
        });
    }

      const quest = new Question ({
        question: ques.question,
        correct_answer: ques.correct_answer,
        options: ques.options,
      });
      quesIdArr.push (quest._id);
      await quest.save ();
    });

    const article = new Article ({
      title,
      domain,
      author: authorID,
      author_questions: quesIdArr,
      pdfFile,
      total_pages: totalPages,
    });
    
    await article.save ();
    // now here the article has been created we will now send this article as a request to the editor
    const EDITOR_ID = process.env.JOURNAL_EDITOR_ID;

    if(!EDITOR_ID){
      res.status(400).send({
        success: false,
        message: "Internal Server Error"
      })
    }
    if(!article){
      res.status(400).send({
        success: false,
        message: "Internal Server Error"
      })
    }

    const requestedArticle = new RequestedArticle({
      editor: EDITOR_ID,
      article: article._id,
      owner: authorID
    });

    await requestedArticle.save();

    // populate author and author_questions in this article
    const populatedArticle = await Article.findById(article._id).populate('author').populate('author_questions');
    res.status (200).send ({
      success: true,
      message: 'Article created and request sent successfully',
      populatedArticle,
      requestedArticle
    });

  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
      error: err
    });
  }
};
