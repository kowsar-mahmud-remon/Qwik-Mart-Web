"use client";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ShippingAddress = () => {
  const { user, Token } = UserAuth();
  //   console.log(user.displayName);
  //   console.log(user.email);
  //   const userName = user.displayName;

  const [userData, setUserData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [Token, user.displayName]);

  console.log(userData);

  // Find the user object with the matching email
  const currentUser = userData.find((item) => item.useremail === user.email);
  console.log(currentUser);
  const specificUserId = currentUser?.id;
  console.log(specificUserId);

  const userShippingInfoHandler = async (data) => {
    try {
      // Update the user's shipping address
      const updatedUserData = {
        ...userData,
        useraddress: {
          ...userData.useraddress,
          shipping: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address1,
          },
        },
      };

      const response = await fetch(
        `https://qwikmart.pythonanywhere.com/user/${specificUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${Token}`,
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      reset();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // You need to implement a function to get the current user data from your backend
  //   const getCurrentUserData = async () => {
  //     const userName = user.displayName; // Replace with the actual username
  //     const response = await fetch(
  //       `https://qwikmart.pythonanywhere.com/user/${userName}`
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const userData = await response.json();
  //     return userData;
  //   };

  // You need to implement a function to update the user data in your backend
  //   const updateUserInBackend = async (updatedUserData) => {
  //     const userName = user.displayName;
  //     const response = await fetch(
  //       `https://qwikmart.pythonanywhere.com/user/${userName}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedUserData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     console.log(responseData);
  //   };

  //   const userShippingInfoHandler = (data) => {
  //     setUserShippingInfo(data);
  //   };

  return (
    <>
      <h4 className="title">Address</h4>
      <form
        className="account-details-form"
        onSubmit={handleSubmit(userShippingInfoHandler)}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                {...register("firstName", { required: true })}
                defaultValue="Annie"
              />
              {errors.firstName && (
                <p className="error">First Name is required.</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                {...register("lastName", { required: true })}
                defaultValue="Mario"
              />
              {errors.lastName && (
                <p className="error">Last Name is required.</p>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email", { required: true })}
                defaultValue="abc@email.com"
              />
              {errors.email && <p className="error">Email Name is required.</p>}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                className="form-control"
                {...register("phone", { required: true })}
                defaultValue="58585858"
              />
              {errors.phone && (
                <p className="error">Phone Number is required.</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                {...register("address1", { required: true })}
                defaultValue="Address Line 1"
              />
              {errors.address1 && (
                <p className="error">Last Name is required.</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group mb--0">
              <input
                type="submit"
                className="axil-btn"
                defaultValue="Save Changes"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShippingAddress;
