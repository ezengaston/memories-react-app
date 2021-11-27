import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

export default function Posts({ setCurrentId, page }) {
  const { posts, isLoading } = useSelector((state) => {
    return state.posts;
  });
  const classes = useStyles();

  if (!posts.length && !isLoading) {
    return (
      <Typography align="center" variant="h1" color="primary">
        No posts found!
      </Typography>
    );
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} page={page}></Post>
        </Grid>
      ))}
    </Grid>
  );
}
