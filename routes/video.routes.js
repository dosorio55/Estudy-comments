import express from "express";
import res from "express/lib/response";

import { Video } from "../models/Video.js";

const videoRoutes = express.Router();

videoRoutes.get('/', async(req, res) => {
    videos = await Video.find()
/*     const { type } = req.query;

    let videos = [];

    if (type) {
    } else {
        
    } */
});

export { videoRoutes}


