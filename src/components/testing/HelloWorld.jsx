import Link from "next/link"

export const HelloWorld = () => {
    return(
        <>
              <Link href="#add_new_post">
                <button type="button" onClick={()=>console.log("hello wolrd")}>Edit</button>
              </Link>
        </>
    )
}