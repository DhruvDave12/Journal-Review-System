const RequestedArticle = require ('../models/requested_article.model');
const Article = require ('../models/article.model');
const User = require ('../models/user.model');
const {sendMail} = require ('../config/send_grid.js');

module.exports.getAllPopulatedRequests = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const editorID = payload._id;
  if (!editorID) {
    res.status (403).send ({
      success: false,
      message: 'Something went wrong',
    });
  }

  if (editorID != process.env.JOURNAL_EDITOR_ID) {
    res.status (403).send ({
      success: false,
      message: 'You are not permitted to access this route',
    });
  }

  try {
    const requests = await RequestedArticle.find ({
      editor: editorID,
      isFulfilled: false,
      isRequested: false,
    })
      .populate ('article')
      .populate ('owner');
    res.status (200).send ({
      success: true,
      message: 'Successfully, fetched all requests',
      requests: requests,
    });
  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.associateArticle = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const editorID = payload._id;
  if (!editorID) {
    res.status (403).send ({
      success: false,
      message: 'Something went wrong',
    });
  }
  if (editorID != process.env.JOURNAL_EDITOR_ID) {
    res.status (403).send ({
      success: false,
      message: 'You are not permitted to access this route',
    });
  }
  const {requestID, associateEditorID} = req.body;
  if (!requestID || !associateEditorID) {
    res.status (403).send ({
      success: false,
      message: 'Invalid request',
    });
  }

  try {
    // we will check if the provided associate editor id is valid or not
    const associateEditor = await User.findById (associateEditorID);
    const request = await RequestedArticle.findById (requestID).populate (
      'owner'
    );

    if (!request) {
      res.status (403).send ({
        success: false,
        message: 'Request not found',
      });
    }

    const rejectedAssociateEditorsList = request.rejected_associate_editor;

    if (associateEditor.role != 'associate-editor') {
      res.status (403).send ({
        success: false,
        message: 'Invalid associate editor id',
      });
    }

    // check if the current editor has already rejected the request or not
    if (rejectedAssociateEditorsList.includes (associateEditorID)) {
      res.status (403).send ({
        success: false,
        message: 'This associate editor has already rejected the request. Please try another',
      });
    }

    if (request.isFulfilled) {
      res.status (403).send ({
        success: false,
        message: 'This request has already been fulfilled',
      });
    }

    // const articleID = request.article;
    // if(!articleID){
    //     res.status(403).send({
    //         success: false,
    //         message: 'Invalid request',
    //     });
    // }

    // const article = await Article.findById(articleID);

    // if(!article){
    //     res.status(403).send({
    //         success: false,
    //         message: 'Invalid request',
    //     });
    // }

    // article.is_assigned = true;
    request.isRequested = true;
    const val = {
      associate_editor: associateEditorID,
      article: request.article,
      requestID: requestID,
    };
    associateEditor.associate_requests.push (val);

    await associateEditor.save ();
    await request.save ();

    // const options = {
    //     to: request.owner.email,
    //     subject: 'Article Assigned',
    //     html: '<strong>Your article has been assigned to an associate editor. You will be notified once the article is published. 🎉</strong>',
    //     res: res
    // }

    const optionForAssociateEditor = {
      to: associateEditor.email,
      subject: 'Request for being an associate editor for a article',
      html: '<strong>Please check your portal for new a new article request</strong>',
      res: res,
    };

    // sendMail(options);
    sendMail (optionForAssociateEditor);

    res.status (200).send ({
      success: true,
      message: 'Request sent to the associate editor successfully',
    });
  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.getAllAssociateEditors = async (req, res) => {
  const payload = req.payload;
  if (!payload) {
    res.status (403).send ({
      success: false,
      message: 'Invalid access token',
    });
  }

  const {requestID} = req.body;
  if (!requestID) {
    res.status (403).send ({
      success: false,
      message: 'Invalid request',
    });
  }

  const editorID = payload._id;
  if (!editorID) {
    res.status (403).send ({
      success: false,
      message: 'Something went wrong',
    });
  }
  if (editorID != process.env.JOURNAL_EDITOR_ID) {
    res.status (403).send ({
      success: false,
      message: 'You are not permitted to access this route',
    });
  }

  try {

    const request = await RequestedArticle.findById (requestID);
    const rejectedAssociateEditorsList = request.rejected_associate_editor;
    const associate_editors = await User.find ({
      role: 'associate-editor',
      is_associate_working: false,
    });

    const associateEditors = associate_editors.filter (associateEditor => {
      return !rejectedAssociateEditorsList.includes (associateEditor._id);
    });

    res.status (200).send ({
      success: true,
      message: 'Successfully, fetched all associate editors',
      associateEditors,
    });
  } catch (err) {
    res.status (500).send ({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
