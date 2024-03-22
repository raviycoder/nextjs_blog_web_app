import Image from 'next/image';
import styles from './postCard.module.css'
import Link from 'next/link';
import parse from 'html-react-parser';
const PostCard = ({post}) => {
    const date = new Date(post.createdAt);
    
    // Format the date into a user-friendly format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-IN', options);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" fill className={styles.img}/>
                    {/* <Image src="https://images.unsplash.com/photo-1626594995085-36b551227b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwdmVydGljYWx8ZW58MHx8MHx8fDA%3D" alt="" fill className={styles.img}/> */}
                </div>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.desc}><div>{parse(post.desc).slice(0,5)}</div>...</div>
                
                <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
            </div>
        </div>
    );
}

export default PostCard;