"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { UserAuth } from "@/context/AuthContext";
import "@/styles/auth/signup.css";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const { user, createUser, loginWithGoogle, authError, emailExists } =
    UserAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //? Fetch user data from backend
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const requestOptions = {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: `Token ${Token}`,
  //         },
  //       };

  //       const url = "https://qwikmart.pythonanywhere.com/user/";
  //       const response = await fetch(url, requestOptions);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setUserData(data);
  //       // console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [Token]);

  //? Handle form submission
  const onSubmit = async (data) => {
    try {
      await createUser(data.userName, data.email, data.password);

      // Reset the form to clear input fields
      reset();

      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="axil-signin-form">
      <h3 className="title">I&apos;m New Here</h3>
      <div className="d-flex flex-column">
        <div>
          <p>or</p>
        </div>
      </div>
      <p className="b2 mb--55">Enter your detail below</p>
      <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            {...register("userName", { required: true })}
            placeholder="anything fancy"
          />
          {errors.userName && <p className="error">User Name is required.</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="abc@example.com"
          />
          {errors.email && <p className="error">Email is required.</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true, minLength: 4 })}
            placeholder={"****"}
          />
          {errors.password && <p className="error">Password is required.</p>}
        </div>
        <div className="form-group">
          <button type="submit" className="axil-btn btn-bg-primary submit-btn">
            Create Account
          </button>
          {user?.userEmail && (
            <p className="success">Account Created successfully</p>
          )}
          {authError && <p className="error">Given user email already exist</p>}
        </div>
      </form>
      <div className="line-container">
        <div className="line"></div>
        <div className="or-text">OR</div>
        <div className="line"></div>
      </div>
      <div className="d-flex flex-row justify-content-center gap-3 align-items-center">
        <FcGoogle className="icon-size" onClick={loginWithGoogle} />
        {/* <div className="icon-gap" /> */}
        {/* <FaFacebook className="icon-size" /> */}
      </div>
    </div>
  );
};

export default SignUp;
