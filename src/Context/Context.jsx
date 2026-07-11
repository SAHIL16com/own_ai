import MainChat from "../config/gemini";
import { createContext, useState, useRef, useEffect } from "react";

export const Context = createContext();

const formatResponse = (text) => {
  if (!text) return "";

  let lines = text.split('\n');
  let html = [];
  let inList = false;
  let inCode = false;
  let codeContent = [];

  for (let line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${codeContent.join('\n')}</code></pre>`);
        codeContent = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeContent.push(line);
      continue;
    }

    let processedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');

    const trimmed = processedLine.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      if (trimmed) {
        html.push(`<p>${processedLine}</p>`);
      } else {
        html.push('<br/>');
      }
    }
  }

  if (inList) html.push('</ul>');
  if (inCode) html.push(`<pre><code>${codeContent.join('\n')}</code></pre>`);

  return html.join('');
};

const tokenizeHTML = (html) => {
  const tokens = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === '<') {
      let tag = '';
      while (i < html.length && html[i] !== '>') {
        tag += html[i];
        i++;
      }
      if (i < html.length) {
        tag += '>';
        i++;
      }
      tokens.push(tag);
    } else {
      let text = '';
      while (i < html.length && html[i] !== '<') {
        text += html[i];
        i++;
      }
      const words = text.split(/(\s+)/);
      for (const word of words) {
        if (word) {
          tokens.push(word);
        }
      }
    }
  }
  return tokens;
};

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const saved = localStorage.getItem("prevPrompts");
    return saved ? JSON.parse(saved) : [];
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const timeoutsRef = useRef([]);
  const abortRef = useRef(false);

  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const delayPara = (index, tokenContent, isLast) => {
    const id = setTimeout(() => {
      setResultData((prev) => prev + tokenContent);
      if (isLast) {
        setIsStreaming(false);
      }
    }, 10 * index);
    timeoutsRef.current.push(id);
  };

  const newChat = () => {
    stop();
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const stop = () => {
    abortRef.current = true;
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
    setLoading(false);
    setIsStreaming(false);
  };

  const onSent = async (prompt) => {
    const finalPrompt =
      typeof prompt === "string" ? prompt : input;

    if (!finalPrompt.trim()) return;

    // Clear previous timeouts and reset abort status
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
    abortRef.current = false;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setIsStreaming(true);

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

      if (abortRef.current) {
        return;
      }

      const formattedHTML = formatResponse(response);
      const tokens = tokenizeHTML(formattedHTML);

      for (let i = 0; i < tokens.length; i++) {
        delayPara(i, tokens[i], i === tokens.length - 1);
      }
    } catch (error) {
      console.error(error);
      if (!abortRef.current) {
        setResultData("Something went wrong. Please try again.");
      }
      setIsStreaming(false);
    } finally {
      setLoading(false);
      setInput("");
      if (abortRef.current) {
        setIsStreaming(false);
      }
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
    isStreaming,
    stop,
  };

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;