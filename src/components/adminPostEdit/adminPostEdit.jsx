"use client"
import { editPost } from "@/lib/action";
import { useRouter } from 'next/navigation';
import styles from "./adminPostEdit.module.css";
import { useFormState } from "react-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

const AdminPostEdit = (post) => {
    const editorRef = useRef(null);
    const router = useRouter();
    console.log(post);
    const [content, setContent] = useState(post.post.desc);
    const [formData, setFormData] = useState({
      title:post.post.title, 
      img:post.post.img, 
      slug:post.post.slug
    })
    const [state, formAction] = useFormState(editPost, undefined);
    useEffect(() => {
      if (editorRef.current) {
        setContent(editorRef.current.getContent());
      }
    }, []);
  
    const handleChange = () => {
      setContent(editorRef.current.getContent());
    };

    const handleChangeInput = (e) => {
      const {name, value} = e.target;
       setFormData({
        ...formData,
        [name]:value
       })
    }

    if (state?.success) {
      router.push('/admin');
    }
  
    return (
      <form action={formAction} className={styles.container}>
        <h1 id="add_new_post">Edit &quot; {post.post.title} &quot; Post</h1>
        <input type="hidden" name="userId" value={post.post.userId}/>
        <input type="hidden" name="id" value={post.post.id}/>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChangeInput} />
        <input type="text" name="img" id="img" placeholder="Image" value={formData.img} onChange={handleChangeInput} />
        <input type="text" name="slug" id="slug" placeholder="Slug" value={formData.slug} onChange={handleChangeInput} />
  
        <Editor
          apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={content}
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              skin: "oxide-dark",
              content_css: "dark"
          }}
          onChange={handleChange}
        />
        <input type="hidden" name="desc" id="desc" value={content} />
        <button type="submit">Update</button>
        {state?.error && <p>{state.error.message}</p>}
      </form>
    );
}

export default AdminPostEdit;