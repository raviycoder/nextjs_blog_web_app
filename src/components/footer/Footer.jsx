import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Ravi</div>
      <div className={styles.text}>
        Ravi creative thoughts agency © All rights reserved
      </div>
    </div>
  )
}

export default Footer