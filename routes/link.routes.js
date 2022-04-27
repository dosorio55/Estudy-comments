import express from "express";
import fs, { link } from "fs"
import { upload, uploadToCloudinary } from "../middlewares/file.middleware.js";

import { Link } from "../models/Link.js";
import { Comment } from "../models/Comment.js";

const linkRoutes = express.Router();

linkRoutes.get('/', async (req, res, next) => {

    const categoryReq = req.query.linkCategory
    const userEmail = req.user.email;

    try {
        if (categoryReq) {

            const links = await Link.find({ linked_email: userEmail, category: categoryReq }).populate('comments');
            return res.status(200).json(links)
        } else {

            const links = await Link.find({linked_email: userEmail}).populate('comments');
            return res.status(200).json(links)
        }

    } catch (error) {
        next(error);
    }
});

linkRoutes.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;  
        const linkPut = new Link(req.body);
        linkPut._id = id;
        await Link.findByIdAndUpdate(id, linkPut);
        return res.status(200).json(linkPut);
    } catch (error) {
        return next(error)
    }
});

linkRoutes.post('/', [upload.single('picture'), uploadToCloudinary], async (req, res, next) => {
    try {

        const characterPicture = req.file_url || null;
        const userEmail = req.user.email;

        const newLink = new Link({

            name: req.body.name,
            userLink: userEmail,
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

linkRoutes.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const linkFound = await Link.findById(id);
        const { comments } = linkFound;

      comments.map(async (commentId) =>{
            await Comment.findByIdAndDelete(commentId);
        });
        
        // return res.status(200).json(comments[0])
        
        const deleteLink = await Link.findByIdAndDelete(id);
        return res.status(200).json(deleteLink)

    } catch (error) {
        return next(error)
    }
});


export { linkRoutes }


//55:40