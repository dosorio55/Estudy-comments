import express from "express";

import { Video } from "../models/Video.js";

const videoRoutes = express.Router();

videoRoutes.get('/', async (req, res) => {

    const videos = await Video.find();

    res.send(videos);

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

videoRoutes.post('/', async (req, res, next) =>{
    try {
        const newVideo = new Video ({
            title: req.body.title,
            link: req.body.link
        })

        const createdVideo = await newVideo.save();
        return res.status(201).json(createdVideo)
    } catch (error) {
        next(error)
    }
});

videoRoutes.delete('/:id', async (req, res, next) => {
try {
    const { id } = req.params;
    
    const deleteVideo = await Video.findByIdAndDelete(id);
    return res.status(200).json(deleteVideo)
    
} catch (error) {
    return next(error)
}


})


export { videoRoutes }
