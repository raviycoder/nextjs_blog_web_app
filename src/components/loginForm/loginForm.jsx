"use client"

import { login } from "@/lib/action";
import styles from './loginForm.module.css'
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {

    const [state, formAction]  = useFormState(login, undefined)

    return (
        <form className={styles.form} action={formAction}>
            <input type="email" name="email" id="email" placeholder='email' />
            <input type="password" name="password" id="password" placeholder='password' />
            <button type='submit'>Login</button>
            {state?.error && <p>{state?.error}</p>}
            <Link href="/register">
               {" Don't have an account? "}<b>Register</b>
            </Link>
          </form>
      )
}

export default LoginForm;