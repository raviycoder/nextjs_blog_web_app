"use client"

import React from 'react'
import styles from './profile.module.css'
import Image from 'next/image';

export default function GitUserProfileCard({session}) {
    const user = session?.user;
    console.log("jdsfsdf",session);
    return (
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <Image
              alt="profile"
              className={styles.image}
              src={user?.image ? user.image : "/noavatar.png"}
              height={160}
              width={160}
            />
          </div>
          <table className={styles.infoContainer}>
            <tbody>
              <tr>
                <th></th>
                <th></th>
              </tr>
              <tr>
                {" "}
                <td className={styles.usernameLabel}>Name:</td>
                <td className={styles.username}>{user?.name}</td>
              </tr>
              <tr>
                <td className={styles.emailLabel}>Email:</td>
                <td className={styles.email}>{user?.email}</td>
              </tr>
              {user?.isAdmin ? (
                <tr>
                  <td>Role:</td>
                  <td>Admin</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      );
}