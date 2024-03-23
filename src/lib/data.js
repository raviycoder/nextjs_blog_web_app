import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import { getProviders } from "next-auth/react"
// const users = [
//     {id:1, name:'John'},
//     {id:2, name:'Jane'}
// ]

// const posts = [
//     {id:1, title: 'Post 1', body: '......', userId:1},
//     {id:2, title: 'Post 2', body: '......', userId:2},
//     {id:3, title: 'Post 3', body: '......', userId:3},
//     {id:4, title: 'Post 4', body: '......', userId:4}
// ]

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch posts!", error);
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug: slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};
export const getPostData = async (id) => {
  try {
    connectToDb();
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

export const getUser = async (id) => {


  noStore();
  try {
    if(id.length >= 21){
    connectToDb();
    const user = await User.findById(id);
    console.log("he hello");
      return user;
    }else{
      return null
    }
  } catch (error) {
    throw new Error("Failed to fetch user!");
  }
};
export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Failed to fetch user!");
  }
};
