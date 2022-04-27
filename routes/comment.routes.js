import express from "express";

import { Comment } from "../models/Comment.js";
import { Link } from "../models/Link.js";

const commentRoutes = express.Router();

commentRoutes.get('/', async (req, res) => {


    const comment = await Comment.find();

    res.send(comment);

});

commentRoutes.post('/', async (req, res, next) =>{
   
    try {
        const newComment = new Comment ({
            title: req.body.title,
            comment: req.body.comment,
            timeStamp: req.body.timeStamp,
            star: req.body.star,
            linkId: req.body.linkId
        })

        const createdComment = await newComment.save();

        const commentId = createdComment._id
        const linkId = createdComment.linkId
        const updatedLink = await Link.findByIdAndUpdate(
            linkId,
            { $push: { comments: commentId } },
            { new: true }
        );
        return res.status(200).json(updatedLink);

    } catch (error) {
        next(error)
    }
});


commentRoutes.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;  
        const commentPut = new Comment(req.body);
        commentPut._id = id;
        await Comment.findByIdAndUpdate(id, commentPut);
        return res.status(200).json(commentPut);
    } catch (error) {
        return next(error)
    }
});


commentRoutes.delete('/:id', async (req, res, next) => {
try {
    const { id } = req.params;
    
    const deleteComment = await Comment.findByIdAndDelete(id);
    return res.status(200).json(deleteComment)
    
} catch (error) {
    return next(error)
}
});

export { commentRoutes }
