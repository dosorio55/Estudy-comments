import express from "express";

import { Comment } from "../models/Comment.js";

const commentRoutes = express.Router();

commentRoutes.get('/', async (req, res) => {

    console.log(req.user._id)

    const comment = await Comment.find();

    res.send(comment);

});

commentRoutes.post('/', async (req, res, next) =>{
    try {
        const newComment = new Comment ({
            title: req.body.title,
            comment: req.body.comment,
            timeStamp: req.body.timeStamp,
            star: req.body.star
        })

        const createdComment = await newComment.save();
        return res.status(201).json(createdComment)
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
