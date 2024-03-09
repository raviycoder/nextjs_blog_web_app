"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavigationTestPage = () => {
    const router = useRouter();
    const pathName = usePathname()
    const handleClick = () => {
        console.log("clicked navigation")
        router.push("/")
    }
    return (
        <div>
            <Link href="/" prefetch={false} >Click here</Link>
            <button onClick={handleClick}>Write and Redirect</button>
        </div>
    );
}

export default NavigationTestPage;