import Link from "next/link";

const CuurencyDropdown = () => {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        USD
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" href="#">
            USD
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            AUD
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            EUR
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CuurencyDropdown;
