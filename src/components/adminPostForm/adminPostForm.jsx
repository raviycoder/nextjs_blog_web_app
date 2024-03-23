"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

const AdminPostForm = ({ userId }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("Write Something...");
  const [state, formAction] = useFormState(addPost, undefined);
  useEffect(() => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  }, []);

  const handleChange = () => {
    setContent(editorRef.current.getContent());
  };

  return (
    <form action={formAction} className={styles.container}>
      <h1 id="add_new_post">Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="img" id="img" placeholder="Image" />
      <input type="text" name="slug" id="slug" placeholder="Slug" />

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
      <button type="submit" onClick={()=>window.location.reload()}>Add</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default AdminPostForm;
