import React from 'react';
import styles from './contact.module.css'
import Image from 'next/image';
import dynamic from 'next/dynamic';
const HydrationTest = dynamic(()=>import('@/components/hydrationTest'), {ssr:false})


export const metadata = {
  title: " Content Page",
  description: "Contact description",
};

const ContactPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <HydrationTest/>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder='Name and Surname' name="name" id="name" />
          <input type="email" placeholder='Email Address' name="email" id="email" />
          <input type="tel" placeholder='Phone Number (Optional)' name="phone" id="phone" />
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage