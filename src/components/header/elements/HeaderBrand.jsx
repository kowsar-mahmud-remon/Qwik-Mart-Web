import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/data/Common";
const HeaderBrand = (props) => {
    return ( 
        <div className="header-brand">
            <Link href="/" className="logo">
            <img
            className="p-2"
                src={props.light ? Logo.light : Logo.dark}
                alt="Site Logo"
                height={10}
                width={60}
            />
            </Link>
        </div>
     );
}
 
export default HeaderBrand;