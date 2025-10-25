import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password Registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Login
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update Profile
  const updateUser = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData)
      .then(() => {
        const updatedUser = {
          ...auth.currentUser,
          displayName: updatedData.displayName || auth.currentUser.displayName,
          photoURL: updatedData.photoURL || auth.currentUser.photoURL,
        };
        setUser(updatedUser);
        setLoading(false);
        return true;
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating profile:", error);
        throw error;
      });
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        return result.user;
      })
      .catch((error) => {
        setLoading(false);
        console.error("Google Sign-In Error:", error);
        throw error;
      });
  };

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    loading,
    setLoading,
    updateUser,
    signInWithGoogle, // added Google auth
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
