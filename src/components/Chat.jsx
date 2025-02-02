import TextBubble from "./TextBubble.jsx";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { resume_data } from "./resume-data.js";
import arrow from "../images/arrow.svg";
import square from "../images/square.svg";

export default function Chat() {
  const TYPING_SPEED = 10;
  const [queryText, setQueryText] = useState("");
  const [enablePrompt, setEnablePrompt] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const initialGreeting =
    "Hi there! Please ask me any questions about Jaskaran Singh and I will try my best to help you out. 😊";

  const SystemPrompt = `You are an AI assistant that will ONLY answer questions pertaining to Jaskaran Singh. 
    Use the following informationn (Jaskaran Singh's Resume)  to answer the user's questions:

    ${resume_data}
    
    Return Markdown format with proper hyperlinks. Bold important information. Give proper spacing and formatting.
    DO NOT answer any questions or perform any task's not related to Jaskaran Singh's Resume.
    Answer everything that you can with all the information provided as per the questions asked and provide appropriate spacing.
    If the user talks normally, you can converse normally as well.
    Make sure that your language is professional and grammatically correct.
    Be concise and do not overstate Jaskaran Singh's achievements or acomplishments. Try to be as helpful as possible but do not state any false information.
    If the answer is not in the context, say the word “Unknown".`;

  const messageRecommendations = [
    "What is his tech stack?",
    "What projects did he work on?",
    "How do I contact him?",
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash-002",
    temperature: 1,
    apiKey: import.meta.env.PUBLIC_GEM,
  });

  const chain = RunnableSequence.from([
    {
      input: (initialInput) => initialInput.input,
      chat_history: (initialInput) => initialInput.chat_history,
      resume_data: () => resume_data,
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const simulateTypingEffect = (reply, isInitialGreeting = false) => {
    let index = 0;
    let currentText = "";

    const typeCharacter = () => {
      if (index < reply.length && !abortControllerRef.current?.signal.aborted) {
        currentText += reply.charAt(index);

        setChatHistory((prevHistory) => {
          if (
            isInitialGreeting ||
            (prevHistory.length > 0 &&
              prevHistory[prevHistory.length - 1].type === "bot")
          ) {
            const updatedMessage = {
              type: "bot",
              markdown: currentText,
            };
            return isInitialGreeting
              ? [updatedMessage]
              : [...prevHistory.slice(0, -1), updatedMessage];
          } else {
            return [...prevHistory, { type: "bot", markdown: currentText }];
          }
        });
        index++;
        setTimeout(() => {
          typeCharacter();
          scrollToBottom();
        }, TYPING_SPEED);
      } else {
        setIsTyping(false);
        setEnablePrompt(true);
        scrollToBottom();
      }
    };

    if (!isInitialGreeting) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", markdown: "" },
      ]);
    }

    setIsTyping(true);
    abortControllerRef.current = new AbortController();
    setTimeout(() => {
      typeCharacter();
      scrollToBottom();
    }, TYPING_SPEED);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    simulateTypingEffect(initialGreeting, true);
  }, []);

  const handlePrompt = async (queryText) => {
    if (isTyping) return;

    setEnablePrompt(false);
    setIsTyping(true);

    let newChatHistory = [
      ...chatHistory,
      { type: "user", markdown: queryText },
    ];
    setChatHistory(newChatHistory);
    scrollToBottom();

    try {
      const formattedChatHistory = newChatHistory
        .slice(1)
        .map((msg) =>
          msg.type === "user"
            ? new HumanMessage(msg.markdown)
            : new AIMessage(msg.markdown)
        );

      const response = await chain.invoke({
        input: queryText,
        chat_history: formattedChatHistory,
      });
      let finalResponse =
        response.trim() === "Unknown"
          ? "I'm sorry, I don't know the answer to that question."
          : response;

      simulateTypingEffect(finalResponse);
    } catch (error) {
      simulateTypingEffect(
        "I'm sorry, I encountered an error while processing your request."
      );
    }
  };

  const handleClick = async () => {
    if (!queryText.trim() || isTyping) return;

    setQueryText("");
    setIsTyping(true);

    let newChatHistory = [
      ...chatHistory,
      { type: "user", markdown: queryText },
    ];
    setChatHistory(newChatHistory);
    scrollToBottom();

    try {
      const formattedChatHistory = newChatHistory
        .slice(1)
        .map((msg) =>
          msg.type === "user"
            ? new HumanMessage(msg.markdown)
            : new AIMessage(msg.markdown)
        );

      const response = await chain.invoke({
        input: queryText,
        chat_history: formattedChatHistory,
      });
      let finalResponse =
        response === "Unknown"
          ? "I'm sorry, I don't know the answer to that question."
          : response;

      simulateTypingEffect(finalResponse);
    } catch (error) {
      if (error.name === 'AbortError') {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "bot", markdown: "Response generation was stopped." },
        ]);
        setIsTyping(false);
      } else {
        simulateTypingEffect(
          "I'm sorry, I encountered an error while processing your request."
        );
      }
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.classList.add("smooth-scroll");
    }

    const handleKeyPress = (event) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [chatHistory]);

  return (
    <div className="chat-island flex flex-col items-center ">
      <div className="chat space-y-2 flex flex-col justify-center items-center font-poppins text-base antialiased drop-shadow-xl my-6 md:my-8">
        <div
          ref={chatContainerRef}
          className="flex flex-col z-10 bg-blue-200/5 h-[60vh] w-[90vw] md:h-[63vh] md:w-[60vw] border border-black border-opacity-[0.3] px-2 py-4 overflow-auto rounded-lg smooth-scroll"
        >
          {chatHistory.map((textitem, index) =>
            textitem.type === "user" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="system-text self-end my-2 md:max-w-xl"
              >
                <TextBubble markdown={textitem.markdown} type="user" />
              </motion.div>
            ) : index === chatHistory.length - 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="system-text self-start my-2 max-w-xl"
              >
                <TextBubble markdown={textitem.markdown} type="bot" />
              </motion.div>
            ) : (
              <div className="system-text self-start my-2 max-w-xl">
                <TextBubble markdown={textitem.markdown} type="bot" />
              </div>
            )
          )}
        </div>
        <div className="flex flex-col text-xs md:text-sm space-x-2 items-center justify-center w-full font-poppins tracking-wide space-y-4 md:space-y-3 text-center">
          <div className="message-rec flex justify-center items-center space-x-2 mt-2">
            {messageRecommendations.map((message, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: "#D1D6F0" }}
                  className=" text-xs text-center px-1 md:px-1 bg-opacity-40 content-center text-text rounded-2xl hover:cursor-pointer hover:bg-opacity-80 hover:text-black transition-all duration-200 h-16 w-[28%] md:h-12 md:w-[33%]"
                  onClick={() => {
                    if (enablePrompt && !isTyping) handlePrompt(message);
                  }}
                >
                  {message}
                </div>
              );
            })}
          </div>
          <div className="input w-[80%] h-10 px-2 rounded-2xl bg-transparent border-opacity-40 border border-black hover:cursor-pointer focus:outline-none flex">
            <input
              ref={inputRef}
              className="w-full rounded-lg bg-transparent focus:outline-none"
              placeholder={
                isTyping ? "Gemini is typing..." : "Enter Prompt Here..."
              }
              value={queryText}
              onChange={(e) => {
                setQueryText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isTyping) {
                  handleClick();
                }
              }}
            />
            <button type="button" onClick={isTyping ? handleStopGeneration : handleClick}>
              <img
                src={isTyping ? square.src : arrow.src}
                alt={isTyping ? "Stop" : "Send"}
                className={`h-6 w-6 rounded-full transition-all duration-200 ${
                  isTyping ? "" : "hover:rotate-[-90deg]"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="text-center text-xs md:text-sm text-primary opacity-75 w-3/4">
          NOTE: This chatbot is powered by Google Gemini and LangChain. Please
          excuse any mistakes 😀.
        </div>
      </div>
    </div>
  );
}
