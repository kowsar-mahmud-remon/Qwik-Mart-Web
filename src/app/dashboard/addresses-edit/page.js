"use client";
import Link from "next/link";
import { UserLists } from "@/data/Users";
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

const UserAddress = () => {
  const { user, Token } = UserAuth();

  const [userData, setUserData] = useState([]);
  const [specificUserData, setSpecificUserData] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${Token}`,
          },
        };

        const url = `https://qwikmart.pythonanywhere.com/user/`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [Token]);

  // console.log(userData);

  // Find the user object with the matching email
  const currentUser = userData.find((item) => item.useremail === user.email);
  // console.log(currentUser);
  const specificUserId = currentUser?.id;
  // console.log(specificUserId);

  // Fetch specific user data using the specific user ID
  useEffect(() => {
    const fetchSpecificUserData = async () => {
      if (specificUserId) {
        try {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${Token}`,
            },
          };

          const specificUserUrl = `https://qwikmart.pythonanywhere.com/user/${specificUserId}`;
          const response = await fetch(specificUserUrl, requestOptions);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const specificUserData = await response.json();
          setSpecificUserData(specificUserData);
          // console.log(specificUserData);
        } catch (error) {
          console.error("Error fetching specific user data:", error);
        }
      }
    };

    fetchSpecificUserData();
  }, [Token, specificUserId]);

  const userEmail = specificUserData?.useraddress?.shipping?.email;
  const userPhone = specificUserData?.useraddress?.shipping?.phone;
  const userAddress = specificUserData?.useraddress?.shipping?.address;
  const firstName = specificUserData?.useraddress?.shipping?.firstName;
  const lastName = specificUserData?.useraddress?.shipping?.lastName;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;
  console.log(userEmail, userPhone, userAddress, firstName, lastName, fullName);

  return (
    <div className="axil-dashboard-address">
      <p className="notice-text">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row row--30">
        <div className="col-lg-6">
          <div className="address-info mb--40">
            <div className="addrss-header d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Address</h4>
              <Link
                href="/dashboard/addresses-edit/shipping"
                className="address-edit"
              >
                <i className="far fa-edit" />
              </Link>
            </div>
            <ul className="address-details">
              <li>Name: {fullName}</li>
              <li>Email: {userEmail}</li>
              <li>Phone: {userPhone}</li>
              <li className="mt--30">{userAddress}</li>
            </ul>
          </div>
        </div>
        {/* <div className="col-lg-6">
          <div className="address-info">
            <div className="addrss-header d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Billing Address</h4>
              <Link
                href="/dashboard/addresses-edit/billing"
                className="address-edit"
              >
                <i className="far fa-edit" />
              </Link>
            </div>
            <ul className="address-details">
              <li>Name: {userAddress.billingAddress.name}</li>
              <li>Email: {userAddress.billingAddress.email}</li>
              <li>Phone: {userAddress.billingAddress.phone}</li>
              <li className="mt--30">
                {userAddress.billingAddress.street} <br />{" "}
                {`${userAddress.billingAddress.state}, ${userAddress.billingAddress.city} ${userAddress.billingAddress.postCode}`}
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserAddress;
