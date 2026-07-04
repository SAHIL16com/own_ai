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


  const delayPara =(index , nextWord) =>{
    setTimeout ( function (){
      setResultData(prev =>prev+nextWord);

    },75 *index)
  }
  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {

    setResultData('')
    setLoading(true)
    setShowResult(true)
    let response ;
    if(prompt !== undefined){
      response = await MainChat(prompt)
      setRecentPrompts(prompt)
    }
    else{
       setPrevPrompts(prev => [...prev, input])
       setRecentPrompts(input)
       response = await MainChat(input)
    }
    
   
    let responseArray = response.split("**");
    let newResponse = " ";
    for (let i = 0 ; i < responseArray.length  ; i++ )
    {
      if( i === 0 || i % 2 !== 1  ){
        newResponse += responseArray[i];
      }
      else{
        newResponse += "<br/>"+responseArray[i]+"<br/>"
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>")
    let newResponseArray = newResponse2.split(" ")
    for(let i = 0 ; i < newResponseArray.length ; i++)
    {
      const nextWord = newResponseArray[i] ;
      delayPara(i , nextWord+" ") 
    }
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
    newChat
  };

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;