import { createContext, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { db } from "../lib/firebase";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [histories, setHistories] = useState([]);
  const { user } = useUser();

  async function fetchHistories() {
    try {
      const q = query(collection(db, "histories"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      const fetchedHistories = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setHistories(fetchedHistories);
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  }

  async function fetchHistoryById(id) {
    try {
    } catch (error) {
      console.error("Error fetching history by ID:", error);
    }
  }

  async function createHistory(category, tone, content, title) {
    try {
      const docRef = await addDoc(collection(db, "histories"), {
        uid: user.uid,
        category,
        tone,
        content,
        title,
        suggestions: [],
        lastmodified: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating history:", error);
    }
  }

  async function updateHistory(id, historyData) {
    try {
    } catch (error) {
      console.error("Error updating history:", error);
    }
  }
  async function deleteHistory(id) {
    try {
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  }

  return (
    <HistoryContext.Provider
      value={{
        histories,
        setHistories,
        fetchHistories,
        fetchHistoryById,
        createHistory,
        updateHistory,
        deleteHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
