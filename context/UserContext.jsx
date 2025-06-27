import {
  GoogleOneTapSignIn
} from '@react-native-google-signin/google-signin';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../lib/firebase";

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
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  async function loginWithGoogle() {
    try {
      GoogleOneTapSignIn.configure(); // move this to after your app starts
      await GoogleOneTapSignIn.checkPlayServices();
      const signInResponse = await GoogleOneTapSignIn.signIn();
      if (signInResponse.type === "success") {
        // use signInResponse.data
      } else if (signInResponse.type === "noSavedCredentialFound") {
        // the user wasn't previously signed into this app
        const createResponse = await GoogleOneTapSignIn.createAccount();
        if (createResponse.type === "success") {
          // use createResponse.data
        } else if (createResponse.type === "noSavedCredentialFound") {
          // no Google user account was present on the device yet (unlikely but possible)
          const explicitResponse =
            await GoogleOneTapSignIn.presentExplicitSignIn();

          if (explicitResponse.type === "success") {
            // use explicitResponse.data
          }
        }
      }
      // the else branches correspond to the user canceling the sign in
    } catch (error) {
      // handle error
    }
  }

  return (
    <userContext.Provider
      value={{ user, login, register, logout, authChecked, loginWithGoogle }}
    >
      {children}
    </userContext.Provider>
  );
};
