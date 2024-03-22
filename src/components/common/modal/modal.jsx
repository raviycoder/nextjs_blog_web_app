"use client";
import styles from "./modal.module.css";

const Modal = ({
  isVisible,
  heading,
  info,
  cancelOption,
  dangerOption,
  cancelInfo,
  dangerInfo,
  postId,
}) => {
  if (!isVisible) return null;
  return (
    <>
      {/* <div className={styles.toggleButton}>
        <button onClick={cancelOption}>open modal</button>
      </div> */}
      <div className={styles.overlay}>
        {" "}
        <div className={styles.container2}>
          <div className={styles.content}>
            <h2>{heading}</h2>
            <p>{info}</p>
          </div>
          <div className={styles.buttons}>
            {" "}
            <form action={dangerOption}>
              <input type="hidden" name="id" value={postId} />
              <button className={styles.ok} onClick={()=>window.location.href = '/admin'} >
                {dangerInfo}
              </button>
            </form>
            <button onClick={cancelOption} className={styles.cancel}>
              {cancelInfo}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
