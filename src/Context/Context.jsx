import { FormInputIcon } from "lucide-react";
import MainChat from "../config/gemini";
import { createContext } from "react";
export const Context = createContext();
import { useState } from "react";

const ContextProvider = ({ children }) => {

  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {

    setResultData('')
    setLoading(true)
    setShowResult(true)
    const response = await MainChat(input)
    console.log(response)
    setResultData(response)
    setLoading(false)
    setInput("") 
  };



  const ContextValue = {
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;