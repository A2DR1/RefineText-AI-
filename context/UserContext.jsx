import { createContext } from "react";
import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setAuthChecked(true);
  });

    const login = async (username, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error during login:", error.code, error.message);
      throw new Error(error.message);
    }
  };

    const register = async (username, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      setUser(userCredential.user);
      console.log("User registered:", userCredential.user.email);
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      throw new Error(error.message);
    }
  };

  async function logout() {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  return (
    <userContext.Provider value={{ user, login, register, logout, authChecked }}>
      {children}
    </userContext.Provider>
  );
};
