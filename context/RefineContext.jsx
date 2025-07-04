import { createContext, useState } from "react";

export const RefineContext = createContext();

export const RefineProvider = ({ children }) => {
  const [categoryContext, setCategoryContext] = useState("professional");
  const [toneContext, setToneContext] = useState("polite");
  const [textContext, setTextContext] = useState("");
  const [titleContext, setTitleContext] = useState("");
  const [suggestionContext, setSuggestionContext] = useState("");

  return (
    <RefineContext.Provider
      value={{
        categoryContext,
        setCategoryContext,
        toneContext,
        setToneContext,
        textContext,
        setTextContext,
        titleContext,
        setTitleContext,
        suggestionContext,
        setSuggestionContext,
      }}
    >
      {children}
    </RefineContext.Provider>
  );
};
