import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema (
    {
        title: {type: String, required: true},
        comment: {type: String, required: true},
        timeStamp: {type: String, required: true},
        star: Boolean
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comments', commentSchema)

export { Comment }