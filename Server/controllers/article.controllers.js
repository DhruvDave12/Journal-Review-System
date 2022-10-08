const Article = require ('../models/article.model');
const Question = require ('../models/questions.model');


module.exports.createArticle = async (req, res) => {

  console.log("REQ.FILE: ", req.file);

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
    res.status (403).send ({
      success: false,
      message: 'Invalid User',
    });
  }

  const {title, domain, author_questions, time_alloted, time_unit} = req.body;
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

  if (!title || !domain || !author_questions || !time_alloted || !time_unit) {
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
      time_alloted: time_alloted,
      time_alloted_unit: time_unit,
      author_questions: quesIdArr,
      pdfFile
    });

    await article.save ();
    res.status (200).send ({
      success: true,
      message: 'Article created successfully',
      article,
    });
  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
