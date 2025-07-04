import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [subStatus, setSubStatus] = useState("inactive");

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

  const updateSubStatus = async () => {
    try {

      const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const fetchedUser = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setSubStatus(fetchedUser[0].subStatus);
      console.log("Customer ID added to user:", user.uid);
    } catch (error) {
      console.error("Error during new subscription:", error.code, error.message);
      throw new Error(error.message);
    }
  };

  const newSubscribedCustomer = async (customerId) => {
    try {

      const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const fetchedUser = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      await updateDoc(doc(db, "users", fetchedUser[0].id), {
        customerId: customerId,
      });
      console.log("Customer ID added to user:", user.uid);
    } catch (error) {
      console.error("Error during new subscription:", error.code, error.message);
      throw new Error(error.message);
    }
  };

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
      
      const docRef = await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        subdate: Timestamp.now(),
        subday: 0,
        customerId: "",
        subStatus: "inactive",
      });

      console.log("User registered:", userCredential.user.email);
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      throw new Error(error.message);
    }
  };

  async function deleteAccount() {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        console.log("User account deleted successfully!");
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

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
      value={{ user, login, register, logout, authChecked, deleteAccount, newSubscribedCustomer, updateSubStatus, subStatus }}
    >
      {children}
    </userContext.Provider>
  );
};
