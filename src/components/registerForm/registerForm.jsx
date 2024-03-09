"use client"

import { register } from '@/lib/action';
import {useFormState} from 'react-dom'
import styles from './registerForm.module.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const RegisterForm = () => {
    const [state, formAction] = useFormState(register, undefined)

    const router = useRouter();

    useEffect(()=>{
        state?.success && router.push('/login')
    }, [state?.success, router])
    return (
        <form action={formAction} className={styles.form}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          id="username"
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          id="email"
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input
          required
          type="password"
          name="passwordConfirm"
          placeholder="Confirm you password"
          id="passwordConfirm"
        />
        <button>Register</button>
        {state?.error && <p>{state.error}</p>}
        <Link href="/login" >Have an account? <b>Login</b></Link>
      </form>
    )
}

export default RegisterForm;