import React, { Suspense } from "react";
import styles from "./signlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";

// export const generateMetadata = async ({params})=>{
//   const {slug} = params;

//   const post = await getPost(slug);

//   return{
//     title:post.title,
//     description:post.desc,
//   }
// }

const getData = async (slug) => {
  const res = await fetch(`https://nextjs-blog-web-app-eight.vercel.app/api/blog/${slug}`)

  if(!res.ok){
    throw new Error("Something went wrong")
  }

  return res.json()
}

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);
  const date = new Date(post.createdAt);
    
  // Format the date into a user-friendly format
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-IN', options);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {post.img && <Image
          src={post.img}
          fill
          alt={post.slug}
          className={styles.img}
        />}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (<Suspense fallback={<div>Loading...</div>}><PostUser userId={post.userId} /></Suspense>)}

          {/* <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Terry Jefferson</span>
          </div> */}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{formattedDate}</span>
          </div>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.desc }} />
      </div>
    </div>
  );
};

export default SinglePostPage;
