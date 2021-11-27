import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API = axios.create({
  baseURL: process.env.SERVER_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const signIn = (formData) => {
  return API.post("/users/signin", formData);
};

export const signUp = (formData) => {
  return API.post("/users/signup", formData);
};

export const fetchPostsBySearch = (searchQuery) => {
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
};

export const fetchPost = (id) => {
  return API.get(`/posts/${id}`);
};

export const comment = (value, id) => {
  return API.post(`/posts/${id}/commentPost`, { value });
};
