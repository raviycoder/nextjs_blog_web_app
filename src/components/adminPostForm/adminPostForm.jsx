"use client"

import { addPost } from '@/lib/action';
import styles from './adminPostForm.module.css'
import { useFormState } from "react-dom";

const AdminPostForm = ({userId}) => {
    const [state, formAction] = useFormState(addPost, undefined)
    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New Post</h1>
            <input type="hidden" name='userId' value={userId} />
            <input type="text" name='title' placeholder='Title' />
            <input type="text" name='img' id='img' placeholder='Image' />
            <input type="text" name='slug' id='slug' placeholder='Slug' />
            <textarea name="desc" id="desc" cols={30} rows={10} placeholder='Description' ></textarea>
            <button type='submit'>Add</button>
            {state?.error && <p>{state.error.message}</p>}
        </form>
    );
}

export default AdminPostForm;