import ProfileCard from "@/components/profileInfo/ProfileCard";
import { getUser } from "@/lib/data";

const Profile = async () => {
    const user = await getUser('65e9d0994eaedbf9207d20a1')
    console.log(user)
    return (
        <div>
            <ProfileCard user={user}/>
        </div>
    );
}

export default Profile;