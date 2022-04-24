import express from "express";

import { Link } from "../models/Link.js";

const linkRoutes = express.Router();

linkRoutes.get('/', async (req, res) => {

    const link = await Link.find();

    res.send(link);


});


linkRoutes.post('/', async (req, res, next) =>{
    try {
        const newLink = new Link ({

            name: req.body.name,
            puntuation: req.body.puntuation,
            category: req.body.category,
            star: req.body.star,
        });
        const createdLink = await newLink.save();
        return res.status(201).json(createdLink);
    } catch (error) {
        next(error);
    }
})



export { linkRoutes }
