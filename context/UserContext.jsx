import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (username, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error during login:", error.code, error.message);
      throw new Error(error.message);
    }
  };

  const register = async (username, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      setUser(userCredential.user);
      console.log("User registered:", userCredential.user.email);
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      throw new Error(error.message);
    }
  };

  async function logout() {
    try {
      // Sign out from Firebase auth
      await signOut(auth);
      
      // Add logic to sign out from Google if necessary
      if (auth.currentUser && auth.currentUser.providerData.some(provider => provider.providerId === 'google.com')) {
        // Assuming you have a function to handle Google sign out
        await googleSignOut();
      }

      setUser(null);
      console.log("User logged out from all services");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <userContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </userContext.Provider>
  );
};
