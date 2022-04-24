import mongoose from "mongoose";

const Schema = mongoose.Schema;

const videoSchema = new Schema (
    {
        title: {type: String, required: true},
        link: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const Video = mongoose.model('Video', videoSchema)

export { Video }