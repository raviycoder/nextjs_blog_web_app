import ProfileCard from "@/components/profileInfo/ProfileCard";
import { getUser } from "@/lib/data";

const Profile = async (props) => {
    const user = await getUser(props.params.id)
    console.log("ye user", props)
    return (
        <div>
            <ProfileCard user={user} />
        </div>
    );
}
export default Profile;