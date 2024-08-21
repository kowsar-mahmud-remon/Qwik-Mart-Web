"use client";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const authInfo = useSelector((state) => state.auth);
  // const users = authInfo.userData;
  const { Token, user, logoutUser } = UserAuth();
  return (
    <div className="axil-dashboard-overview">
      <div className="welcome-text">
        Hello{" "}
        {user?.displayName ? (
          <>
            {user.displayName}{" "}
            <Link onClick={logoutUser} href="/sign-in">
              Logout
            </Link>
          </>
        ) : (
          <>
            Guest <Link href="/sign-in">Login Now</Link>
          </>
        )}
      </div>

      <p>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </div>
  );
};

export default Dashboard;
