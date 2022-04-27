import express from "express";

import { Comment } from "../models/Comment.js";
import { Link } from "../models/Link.js";

const commentRoutes = express.Router();

commentRoutes.get('/', async (req, res) => {

    const { linkId } = req.params
    const userEmail = req.user.email;

    try {
        if (linkId) {
            const comment = await Comment.find({ linkId: linkId, linked_email: userEmail });
            return res.status(200).json(comment);
        } else {
            const comment = await Comment.find({ linked_email: userEmail });
            return res.status(200).json(comment);
        }
    } catch (error) {
        next(error)
    }
});

commentRoutes.post('/', async (req, res, next) => {

    const userEmail = req.user.email;

    try {
        const newComment = new Comment({
            title: req.body.title,
            linked_email: userEmail,
            comment: req.body.comment,
            timeStamp: req.body.timeStamp,
            star: req.body.star,
            linkId: req.body.linkId
        })
        const linkId = req.body.linkId
        const findLink = await Link.findById(linkId)
        if (findLink) {

            const createdComment = await newComment.save();

            const commentId = createdComment._id

            const updatedLink = await Link.findByIdAndUpdate(
                linkId,
                { $push: { comments: commentId } },
                { new: true }
            );
            return res.status(200).json(updatedLink);
        } else {
            res.send("You are trying to add a comment on a link that doesn't exist ");

        }

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
