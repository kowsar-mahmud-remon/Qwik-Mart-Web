"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/app/(auth)/firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const Token = "2765a05e87f2b4b07976cf55ce27073e29b9dd54";

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  //? Initialize Google provider
  const googleProvider = new GoogleAuthProvider();

  //? state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   *
   * @param {username} userName
   * @param {useremail} userEmail
   * @param {password} userPassword
   * signup, login, logout with user email password
   */

  //? Function to create a new user in Firebase and send data to the backend
  const createUser = async (userName, userEmail, userPassword) => {
    setIsLoading(true);
    setAuthError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      if (userCredential.user) {
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: userName,
        });

        const newUser = { userEmail, displayName: userName };
        setUser(newUser);
        // console.log(newUser);

        //! Check if the user is signing up with an email that already exists
        const emailExists = checkIfEmailExists(userEmail);

        sendUserToBackend(userName, userEmail, userPassword);

        if (emailExists) {
          return;
        }
        // Send user data to the backend API
        router.push("/sign-in");
      } else {
        console.error("User not found in userCredential");
      }
    } catch (error) {
      setAuthError(error.message);
      console.error("Error creating user:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //? Function for user login with email password
  const loginUser = async (userEmail, userPassword) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      if (userCredential.user) {
        const user = userCredential.user;
        const loggedInUser = {
          userEmail: user.email,
          displayName: user.displayName,
        };
        setUser(loggedInUser);
        // console.log(loggedInUser);
        return { success: true };
      } else {
        console.error("User not found in userCredential");
      }
    } catch (error) {
      console.error("Error logging in user:", error.message);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //? Function to log out the current user
  const logoutUser = async () => {
    setIsLoading(true);

    try {
      await signOut(auth);
      setUser({});
    } catch (error) {
      console.error("Error logging out user:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //? Function to save user data to the backend
  const sendUserToBackend = (userName, userEmail, userPassword) => {
    const user = {
      useremail: userEmail,
      username: userName,
      password: userPassword,
    };
    // console.log(user);

    const url = "https://qwikmart.pythonanywhere.com/user/new";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${Token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  };

  //? Function to check if an email already exists in the backend
  const checkIfEmailExists = async (userEmail) => {
    const url = `https://qwikmart.pythonanywhere.com/user/?useremail=${userEmail}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${Token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  };

  /**
   * @param {userData} userData from google
   * signup and logout with google account
   */

  //? Function to save Google user data to the backend
  const sendUserToBackendGoogle = async (user) => {
    setIsLoading(true);

    try {
      const userEmail = user.email;

      const userExists = await checkIfEmailExists(userEmail);
      if (!userExists) {
        const userData = {
          useremail: user.email,
          username: user.displayName || "",
          userimagetext: user.photoURL || "",
        };
        const url = "https://qwikmart.pythonanywhere.com/user/new";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${Token}`,
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        // console.log(responseData);
      } else {
        // console.log("User already exists in the backend.");
      }
    } catch (error) {
      console.error("Error saving Google user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //? Function to log in with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUser(user);

      // console.log("Google login successful!");
      // console.log("User data:", user);
      // Send user data to the backend url
      sendUserToBackendGoogle(user);
      router.push("/shop");
      // console.log(user);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      setAuthError(error.message);
    }
  };

  //? Function to log out with Google
  const logoutWithGoogle = async () => {
    try {
      await signOut(auth);
      setUser({});
      // console.log("Logged out with Google");
    } catch (error) {
      console.error("Error logging out with Google:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        Token,
        createUser,
        sendUserToBackend,
        loginUser,
        logoutUser,
        authError,
        loginWithGoogle,
        logoutWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
