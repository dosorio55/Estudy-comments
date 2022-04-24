import express from "express";

import { Video } from "../models/Video.js";

const videoRoutes = express.Router();

videoRoutes.get('/', async(req, res) => {
   let videos = await Video.find()
/*     const { type } = req.query;

    let videos = [];

    if (type) {
    } else {
        
    } */
    res.send(videos)
});

export { videoRoutes}


