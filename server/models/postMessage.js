import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [String],
    default: [],
  },
  messages: {
    type: [Object],
    default: [],
  },
  chatUsers: {
    type: [String],
    default: [],
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;