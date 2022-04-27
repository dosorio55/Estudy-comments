import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema (
    {
        title: {type: String, required: true},
        comment: {type: String, required: true},
        timeStamp: {type: String, required: true},
        star: Boolean,
        linked_email: String,
        linkId: {type: String, required:true}

    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema)

export { Comment }