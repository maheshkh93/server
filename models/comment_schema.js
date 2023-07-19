import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    ref: "User",
    required: true,
  },
  postId: {
    type: ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentSchema);

export default Comment;
