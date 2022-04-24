import express from "express";

import { Comment } from "../models/Comment.js";

const commentRoutes = express.Router();

commentRoutes.get('/', async (req, res) => {

    const comment = await Comment.find();

    res.send(comment);

/*     const { minDate, maxDate } = req.query;
    const dateFilters = {
        ...(minDate && {$gt: minDate}),
        ...(maxDate && {$lt: maxDate})
    }

    try {
        const filters = Object.keys(dateFilters).length > 0 ? { creationDate: dateFilters} : undefined;
        const videos = await Video.find(filters)
    } catch (error) {
        return res.status(500).json(error)
    } */
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
