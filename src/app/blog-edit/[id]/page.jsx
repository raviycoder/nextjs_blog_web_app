import AdminPostEdit from "@/components/adminPostEdit/adminPostEdit";
import { getPostData } from "@/lib/data";

 export async function getData (context) {
    const { params } = context;
    const { myParam } = params;

    return {
      props: {
        post: myParam,
      }
    }
  }

const Editor = async (props) => {
    const post = await getPostData(props.params.id)
    console.log("dfdf",props);
    const { title, img, slug, desc, userId } = post; // Destructure only necessary data

    console.log("dfdf", props);
    return (
        <>
        <AdminPostEdit post={{ title, img, slug, desc, userId, id:props.params.id }} />
        </>
    );
}



export default Editor;