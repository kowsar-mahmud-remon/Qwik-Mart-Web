import Link from "next/link";

const LangDropdown = () => {
    return ( 
        <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          En
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" href="#">
              English
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Arabic
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Spanish
            </Link>
          </li>
        </ul>
      </div>
     );
}
 
export default LangDropdown;