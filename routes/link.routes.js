import express from "express";
import fs from "fs"
import { upload, uploadToCloudinary } from "../middlewares/file.middleware.js";

import { Link } from "../models/Link.js";

const linkRoutes = express.Router();

linkRoutes.get('/', async (req, res, next) => {

    const categoryReq = req.query.linkCategory
    try {
        if (categoryReq) {

            const links = await Link.find({ category: categoryReq }).populate('comments');
            return res.status(200).json(links)
        } else {

            const links = await Link.find().populate('comments');
            return res.status(200).json(links)
        }

    } catch (error) {
        next(error);
    }
});

linkRoutes.post('/', [upload.single('picture'), uploadToCloudinary], async (req, res, next) => {
    try {

        const characterPicture = req.file_url || null;
        const newLink = new Link({

            name: req.body.name,
            link_url: req.body.link_url,
            puntuation: req.body.puntuation,
            category: req.body.category,
            star: req.body.star,
            linked_email: req.user.email,
            picture: characterPicture,
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

linkRoutes.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteLink = await Link.findByIdAndDelete(id);
        return res.status(200).json(deleteLink)

    } catch (error) {
        return next(error)
    }
});

export { linkRoutes }


//55:40