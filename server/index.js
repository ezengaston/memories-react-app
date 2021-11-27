import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import PostMessage from "./models/postMessage.js";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

const PORT = process.env.PORT || 1234;

io.on("connection", (socket) => {
  socket.on("join", async ({ name, id, room }) => {
    const postToUpdate = await PostMessage.findById(room);
    if (postToUpdate?.chatUsers?.find((item) => item === id)) {
      socket.join(room);
      io.to(room).emit("messages", { receivedMessages: postToUpdate.messages });
      return postToUpdate;
    }
    postToUpdate.chatUsers = [...postToUpdate.chatUsers, id];
    const updatedPost = await PostMessage.findByIdAndUpdate(
      room,
      postToUpdate,
      {
        new: true,
      }
    );
    socket.join(room);
    io.to(room).emit("messages", { receivedMessages: updatedPost.messages });
    return updatedPost;
  });
  socket.on("sendMessage", async ({ message, name, id, room }, callback) => {
    const postToUpdate = await PostMessage.findById(room);
    postToUpdate.messages = [...postToUpdate.messages, { name, id, message }];

    const updatedPost = await PostMessage.findByIdAndUpdate(
      room,
      postToUpdate,
      {
        new: true,
      }
    );
    callback();
    io.to(room).emit("messages", { receivedMessages: updatedPost.messages });
  });
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`)
    );
  })
  .catch((e) => {
    console.log(e.message);
  });
