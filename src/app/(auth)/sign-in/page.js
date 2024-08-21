"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AuthLayout from "../layout";
import { logIn } from "@/store/slices/authSlice";
import { UserAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "@/styles/auth/signup.css";

const SignIn = () => {
  const { loginUser, authError, user, loginWithGoogle } = UserAuth();

  const router = useRouter();
  

  // const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const loginResult = await loginUser(data.email, data.password);

      if (loginResult.success) {
        router.push("/shop");
        // console.log("Login successful!");
      } else {
        // setLoginError(true);
        console.error("Login failed:", loginResult.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // setLoginError(true);
    }
  };

  return (
    <AuthLayout bgImage="bg_image--9">
      <div className="axil-signin-form">
        <h3 className="title">Sign in to Qwik Mart.</h3>
        <p className="b2 mb--55">Enter your detail below</p>
        <form className="singin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: true })}
              placeholder="abc@email.com"
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
          <div className="form-group d-flex align-items-center justify-content-between">
            <button
              type="submit"
              className="axil-btn btn-bg-primary submit-btn"
            >
              Sign In
            </button>
            <Link href="/forgot-password" className="forgot-btn">
              Forget password?
            </Link>
          </div>
          {/* {!authError && user?.userEmail ? (
            <p className="success"> Login Successful </p>
          ) : (
            <p className="error">User and Password doesn&apos;t match</p>
          )} */}
          {authError && (
            <p className="error">User and Password doesn&apos;t match</p>
          )}
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
    </AuthLayout>
  );
};

export default SignIn;
