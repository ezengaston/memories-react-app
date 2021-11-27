import { React, useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

export default function CommentSections({ post }) {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComment("");
    setComments(newComment);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, index) => {
            const commentAuthor = comment.split(": ")[0];
            const commentText = comment
              .split(":")
              .filter((a) => a !== commentAuthor)
              .join(": ");
            return (
              <Typography key={index} gutterBottom variant="subtitle1">
                <strong>{`${commentAuthor}:`}</strong>
                {commentText}
              </Typography>
            );
          })}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
