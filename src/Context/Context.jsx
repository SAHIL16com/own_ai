import MainChat from "../config/gemini";
import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const onSent = async (prompt) => {
    const finalPrompt =
      typeof prompt === "string" ? prompt : input;

    if (!finalPrompt.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      let response;

      if (typeof prompt === "string") {
        setRecentPrompts(finalPrompt);
        response = await MainChat(finalPrompt);
      } else {
        setPrevPrompts((prev) => [...prev, finalPrompt]);
        setRecentPrompts(finalPrompt);
        response = await MainChat(finalPrompt);
      }

      let responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          newResponse += "<b>" + responseArray[i] + "</b>";
        } else {
          newResponse += responseArray[i];
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split(" ");

      for (let i = 0; i < newResponseArray.length; i++) {
        delayPara(i, newResponseArray[i] + " ");
      }
    } catch (error) {
      console.error(error);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const ContextValue = {
    onSent,
    prevPrompts,
    setPrevPrompts,
    recentPrompts,
    setRecentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;