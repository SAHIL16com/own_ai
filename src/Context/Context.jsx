import { useEffect } from "react";
import MainChat from "../config/gemini";
import {createContext} from "react";
export const Context = createContext();

const ContextProvider = ({ children }) => {

  const onSent = async (prompt) => {
    try {
      const response = await MainChat(prompt);
      console.log(response);
    } catch (error) {
      console.error("Gemini Error:", error);
    }
  };

  useEffect(() => {
    onSent("What is React JS?");
  }, []);

  const ContextValue = {
    onSent,
  };

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;