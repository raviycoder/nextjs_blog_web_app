"use client"

import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/action";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../common/modal/modal";

const AdminPosts = () => {

  const [posts, setPosts] = useState(null);
  const [isVisble, setIsVisble] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}});
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setPosts(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const deletePostWithId = async (id)=>{
  //   "use server"
  //   return deletePost.bind(null, id)
  // }
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          {/* <form action={deletePostWithId}> */}
            <div className={styles.edit}>
              <Link href={`/blog-edit/${post._id}`}>
                <button type="button">Edit</button>
              </Link>
              <button type="button" onClick={()=>setIsVisble(true)}>Delete</button>
              <Modal isVisible={isVisble} heading={`Delete -${post.title}- post`} info={"Are you sure to delete this post"} cancelOption={()=>setIsVisble(false)} dangerOption={deletePost} cancelInfo={"Cancel"} dangerInfo={"Delete"} postId={post._id} />
            </div>
        </div>
      ))}
    </div>
  );
};



export default AdminPosts;
