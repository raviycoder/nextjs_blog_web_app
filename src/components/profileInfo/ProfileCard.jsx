import Image from "next/image";
import styles from "./profile.module.css";
import GitUserProfileCard from "./gitUserProfileCard";
import { auth } from "@/lib/auth";

const ProfileCard = async ({ user }) => {
  const session = await auth();
  if (user) {
    const passSecret = "*".repeat(user?.password?.length);
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
              <td className={styles.username}>{user?.username}</td>
            </tr>
            <tr>
              <td className={styles.emailLabel}>Email:</td>
              <td className={styles.email}>{user?.email}</td>
            </tr>
            {user.password ? (
              <tr>
                <td className={styles.passwordLabel}>Password:</td>
                <td className={styles.password}>{passSecret.slice(0, 10)}</td>
              </tr>
            ) : null}
            {user.isAdmin ? (
              <tr>
                <td>Role:</td>
                <td>Admin</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <><GitUserProfileCard session={session} /></>;
  }
};

export default ProfileCard;
