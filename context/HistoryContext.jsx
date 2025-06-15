import { createContext, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { db } from "../lib/firebase";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [histories, setHistories] = useState([]);
  const [history, setHistory] = useState(null);
  const { user } = useUser();

  // Fetch histories for the current user when the component mounts
  async function fetchHistories() {
    try {
      const q = query(
        collection(db, "histories"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const fetchedHistories = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setHistories(fetchedHistories);
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  }

  // Fetch a specific history by ID
  async function fetchHistoryById(id) {
    try {
      const docRef = doc(db, "histories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHistory({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No history found with the given ID.");
      }
    } catch (error) {
      console.error("Error fetching history by ID:", error);
    }
  }

  // Create a new history document
  async function createHistory(
    category,
    tone,
    content,
    title,
    suggestions = []
  ) {
    try {
      const docRef = await addDoc(collection(db, "histories"), {
        uid: user.uid,
        category,
        tone,
        content,
        title,
        suggestions,
        lastmodified: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating history:", error);
    }
  }

  // not tested yet, could be wrong
  async function updateHistory(id, historyData) {
    try {
      await updateDoc(doc(db, "histories", id), {
        content: historyData.content,
        suggestions: historyData.suggestions,
        lastmodified: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating history:", error);
    }
  }

  // not tested yet
  async function deleteHistory(id) {
    try {
      const docRef = doc(db, "histories", id); // 'histories' is your collection name
      await deleteDoc(docRef);
      console.log("Document successfully deleted.");
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  }

  return (
    <HistoryContext.Provider
      value={{
        histories,
        history,
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
