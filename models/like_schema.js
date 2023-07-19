import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const likeSchema = new Schema({
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

const Like = model("Like", likeSchema);

export default Like;
