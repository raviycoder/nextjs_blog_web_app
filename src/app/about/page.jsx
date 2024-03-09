import Image from "next/image"
import styles from './about.module.css'

export const metadata = {
    title: " About page",
    description: "About Description",
  };


const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.subtitle}>About Agency</h2>
                <h1 className={styles.title}>We create digital ideas that are bigger, bolder, braver and better.</h1>
                <p className={styles.desc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda eos veritatis nesciunt rem neque facilis quaerat repellendus, nihil veniam minima ducimus, ipsa commodi quisquam eum doloremque sint sit id temporibus?</p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>10 K+</h1>
                        <p>Year of expeerience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10 K+</h1>
                        <p>Year of expeerience</p>
                    </div>
                    <div className={styles.box}>
                        <h1>10 K+</h1>
                        <p>Year of expeerience</p>
                    </div>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image src='/about.png' alt="About Image" fill />
            </div>
        </div>
    )
}

export default AboutPage