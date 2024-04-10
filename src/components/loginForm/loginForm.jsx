"use client"

import { login } from "@/lib/action";
import styles from './loginForm.module.css'
import { useFormState } from "react-dom";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password:''
    })
    const handleData = () => {
        const data = {
            email:"kkkkkrrr@nimadir.com",
            password:"3Vp@cWWGvQmV7p"
        }
        setData(data)
    }
    const [state, formAction]  = useFormState(login, undefined)

    return (
        <form className={styles.form} action={formAction}>
            <input type="email" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} name="email" id="email" placeholder='email' />
            <input type="password" name="password" value={data.password} onChange={(e)=>setData({...data, password:e.target.value})} id="password" placeholder='password' />
            <button type='button' onClick={handleData}>Add data</button>
            <button type='submit'>Login</button>
            {state?.error && <p>{state?.error}</p>}
            <Link href="/register">
               {" Don't have an account? "}<b>Register</b>
            </Link>
          </form>
      )
}

export default LoginForm;