import React from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

export const metadata = {
  title: " blog page",
  description: "Blog Page",
};

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}})
   
  if(!res.ok){
    throw new Error("Something went wrong")
  }

  return res.json()
}

const BlogPage = async () => {
  const posts = await getData()
  return (
    <div className={styles.container}>
      {posts.map(post=>(<div key={post.slug} className={styles.post}>
        <PostCard post={post} />
      </div>))}
    </div>
  );
};

export default BlogPage;
