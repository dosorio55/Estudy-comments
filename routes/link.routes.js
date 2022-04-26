import express from "express";

import { Link } from "../models/Link.js";

const linkRoutes = express.Router();

linkRoutes.get('/', async (req, res) => {

    console.log(req.user)
    const links = await Link.find().populate('comments');

    return res.status(200).json(links)

});


linkRoutes.post('/', async (req, res, next) =>{
    try {
        const newLink = new Link ({

            name: req.body.name,
            puntuation: req.body.puntuation,
            category: req.body.category,
            star: req.body.star,
            comments: []
        }
        );
        const createdLink = await newLink.save();
        return res.status(201).json(createdLink);
    } catch (error) {
        next(error);
    }
});

linkRoutes.put('/add-comment', async (req, res, next) => {
    try {
        const { linkId } = req.body;
        const { commentId } = req.body;
        const updatedLink = await Link.findByIdAndUpdate(
            linkId,
            { $push: { comments: commentId } },
            { new: true }
        );
        return res.status(200).json(updatedLink);
    } catch (error) {
        return next(error);
    }
});

export { linkRoutes }
