import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";

const HeaderQuickLink = () => {
  const { user } = UserAuth();
  return (
    <div className="header-top-link">
      <ul className="quick-link">
        {user?.userEmail || user?.email ? (
          <li>
            <p>Welcome {user.displayName}</p>
          </li>
        ) : (
          <>
            <li>
              <Link href="/sign-up">Join Us</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default HeaderQuickLink;
