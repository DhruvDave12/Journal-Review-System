const RequestedArticle = require('../models/requested_article.model');
const Article = require('../models/article.model');
const User = require('../models/user.model');

module.exports.getAllPopulatedRequests = async (req,res) => {
    const payload = req.payload;
    if(!payload){
        res.status(403).send({
            success: false,
            message: 'Invalid access token',
        });
    }
    
    const editorID = payload._id;
    if(!editorID){
        res.status(403).send({
            success: false,
            message: 'Something went wrong',
        });
    }
    
    if(editorID != process.env.JOURNAL_EDITOR_ID){
        res.status(403).send({
            success: false,
            message: 'You are not permitted to access this route',
        });
    }
    

    try{
        const requests = await RequestedArticle.find({editor: editorID, isFulfilled: false}).populate('article').populate('owner');
        res.status(200).send({
            success: true,
            message: 'Successfully, fetched all requests',
            requests: requests
        })
    }catch(err){
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

module.exports.associateArticle = async (req,res) => {
    const payload = req.payload;
    if(!payload){
        res.status(403).send({
            success: false,
            message: 'Invalid access token',
        });
    }

    const editorID = payload._id;
    if(!editorID){
        res.status(403).send({
            success: false,
            message: 'Something went wrong',
        });
    }
    if(editorID != process.env.JOURNAL_EDITOR_ID){
        res.status(403).send({
            success: false,
            message: 'You are not permitted to access this route',
        });
    }
    const {requestID, associateEditorID} = req.body;
    if(!requestID || !associateEditorID){
        res.status(403).send({
            success: false,
            message: 'Invalid request',
        });
    }
    
    try{

        // we will check if the provided associate editor id is valid or not
        const associateEditor = await User.findById(associateEditorID);
        
        if(associateEditor.role != 'associate-editor'){
            res.status(403).send({
                success: false,
                message: 'Invalid associate editor id',
            });
        }

        const request = await RequestedArticle.findById(requestID);

        if(!request){
            res.status(403).send({
                success: false,
                message: 'Invalid request',
            });
        }

        if(request.isFulfilled){
            res.status(403).send({
                success: false,
                message: 'This request has already been fulfilled',
            });
        }
        
        const articleID = request.article;
        if(!articleID){
            res.status(403).send({
                success: false,
                message: 'Invalid request',
            });
        }

        const article = await Article.findById(articleID);
        
        if(!article){
            res.status(403).send({
                success: false,
                message: 'Invalid request',
            });
        }

        article.is_assigned = true;
        article.associate_editor = associateEditorID;
        request.isFulfilled = true;

        await article.save();
        await request.save();
        
        // TODO -> send a mail to author that he has been assigned an associate editor and we are waiting for review now


        res.status(200).send({
            success: true,
            message: 'Successfully, associated article with associate editor',
            article,
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

module.exports.getAllAssociateEditors = async (req,res) => {
    const payload = req.payload;
    if(!payload){
        res.status(403).send({
            success: false,
            message: 'Invalid access token',
        });
    }

    const editorID = payload._id;
    if(!editorID){
        res.status(403).send({
            success: false,
            message: 'Something went wrong',
        });
    }
    if(editorID != process.env.JOURNAL_EDITOR_ID){
        res.status(403).send({
            success: false,
            message: 'You are not permitted to access this route',
        });
    }

    try {
        const associate_editors = await User.find({role: 'associate-editor'});

        // TODO -> Send mail to the associate editor regarding that they have been assigned a new article.
        res.status(200).send({
            success: true,
            message: 'Successfully, fetched all associate editors',
            associate_editors,
        })

    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        })
    }
}