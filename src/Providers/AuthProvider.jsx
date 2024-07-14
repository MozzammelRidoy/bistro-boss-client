import { createContext, useEffect, useState } from "react";
import auth from "./../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  //create user new account or register
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // user login or sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //user logout or signout
  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // user profile updat
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //goolge login
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // user observassion
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   console.log("user observing", currentUser);
      const userInfo = { email: currentUser?.email };
      if (currentUser) {
        //get token and store
        axiosPublic.post("/jwt", userInfo).then((res) => {
          //   console.log(res.data.token);
          const token = res.data.token;
          if (res.data.token) {
            localStorage.setItem("access-token", token);
          }
          setLoading(false)
        });
      } else {
        // remove token
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createNewUser,
    userLogout,
    signInUser,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
