const User = require('../models/user.model');
const RequestedArticle = require('../models/requested_article.model');
const Article = require('../models/article.model');

const { sendMail } = require('../config/send_grid');

module.exports.getAllRequestsAssociate = async (req,res) => {
    const payload = req.payload;
    if(!payload){
        res.status(403).send({
            success: false,
            message: 'Invalid access token'
        });
    }

    const associateID = payload._id;
    if(!associateID){
        res.status(403).send({
            success: false,
            message: 'Something went wrong'
        });
    }

    const user = await User.findById(associateID);
    if(!user){
        res.status(403).send({
            success: false,
            message: 'User not found'
        });
    }
    
    if(user.role != 'associate-editor'){
        res.status(403).send({
            success: false,
            message: 'You are not permitted to access this route'
        });
    }

    try{
        const associateRequests = await user.populate('associate_requests.article');
        
        // const data = await RequestedArticle.populate(requests, {path: 'article.author_questions article.author'});
        res.status(200).send({
            success: true,
            message: 'Successfully, fetched all requests',
            requests: associateRequests.associate_requests
        })

    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports.acceptOrRejectArticle = async (req,res) => {
    const payload = req.payload;
    if(!payload){
        res.status(403).send({
            success: false,
            message: 'Invalid access token'
        });
    }

    const associateID = payload._id;
    if(!associateID){
        res.status(403).send({
            success: false,
            message: 'Something went wrong'
        });
    }

    const user = await User.findById(associateID);
    if(!user){
        res.status(403).send({
            success: false,
            message: 'User not found'
        });
    }

    if(user.role != 'associate-editor'){
        res.status(403).send({
            success: false,
            message: 'You are not permitted to access this route'
        });
    }

    // acceptance_choice must be either ACCEPT or REJECT
    const {requestID, acceptance_choice, time_alloted, time_unit} = req.body;
    if(!requestID){
        res.status(403).send({
            success: false,
            message: 'Invalid request'
        });
    }

    try {
        const request = await RequestedArticle.findById(requestID).populate('article');
        if(!request){
            res.status(403).send({
                success: false,
                message: 'Request not found'
            });
        }

        if(acceptance_choice === "REJECT"){
            request.rejected_associate_editor.push(associateID);
            request.isRequested = false;
            // remove the request from the associate editor's requests
            // TODO -> NOT WORKING CHECK IT OUT....
            user.associate_requests = user.associate_requests.filter(request => request.requestID != requestID);

            await user.save();
            await request.save();

            res.status(200).send({
                success: true,
                message: 'Successfully, rejected the request'
            });    
        } else if(acceptance_choice === "ACCEPT") {
            if(!time_alloted || !time_unit){
                res.status(403).send({
                    success: false,
                    message: 'Please provide the time alloted'
                });
            }

            request.isFulfilled = true;
            request.isRequested = false;

            const articleID = request.article._id;
            const article = await Article.findById(articleID);
            article.associate_editor = associateID;
            article.time_alloted = time_alloted;
            article.time_alloted_unit = time_unit;
            article.is_assigned = true;
            user.is_associate_working = true;

            // remove the request from the associate editor's requests
            user.associate_requests = user.associate_requests.filter(request => request.requestID != requestID);
            await article.save();
            await request.save();
            await user.save();

            const optionForAssociateEditor = {
                to: user.email,
                subject: 'Confirmation for your current request',
                html: '<strong>This mail is to confirm you that you have been registered for the article shown below.</strong>',
                res: res,
              };
            sendMail(optionForAssociateEditor);

            // Send mail to the author of the article
            const author = await User.findById(article.author);
            const optionForAuthor = {
                to: author.email,
                subject: 'Congratulations, your article has been assigned an associate editor',
                html: '<strong>This mail is to confirm you that your article has been assigned to an associate editor🎉. Check your dashboard for the progress</strong>',
                res: res,
            };
            sendMail(optionForAuthor);

            res.status(200).send({
                success: true,
                message: 'Successfully, accepted the request',
                article,
                request
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'Invalid choice, should be either ACCEPT or REJECT'
            });
        }
        
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}