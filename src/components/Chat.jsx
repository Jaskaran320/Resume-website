import TextBubble from "./TextBubble.jsx";
import { ChatGroq } from "@langchain/groq";
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
export default function Chat() {
  const [queryText, setQueryText] = useState("");
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      markdown: "Please ask questions about Jaskaran Singh's resume 😀",
    },
  ]);

  const SystemPrompt = `You are an AI assistant that will ONLY answer questions pertaining to Jaskaran Singh. 
    Use the following informationn (Jaskaran Singh's Resume)  to answer the user's questions:

    ${resume_data}
    
    Return Markdown format with proper hyperlinks and formatting.
    DO NOT answer any questions or perform any task's not related to Jaskaran Singh's Resume. 
    If the user talks normally, you can converse normally as well.
    Be concise and do not overstate Jaskaran Singh's achievements or acomplishments. Try to be as helpful as possible but do not state any false information.
    If the answer is not in the context, say the word “Unknown".`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const model = new ChatGroq({
    model: "llama3-70b-8192",
    apiKey: import.meta.env.PUBLIC_GROQ_API_KEY,
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

  const handleClick = async (event) => {
    if (!queryText.trim()) return;

    let newChatHistory = [
      ...chatHistory,
      { type: "user", markdown: queryText },
    ];
    setChatHistory(newChatHistory);
    setQueryText("");

    try {
      console.log("Sending request with input:", queryText);

      const formattedChatHistory = newChatHistory
        .slice(1)
        .map((msg) =>
          msg.type === "user"
            ? new HumanMessage(msg.markdown)
            : new AIMessage(msg.markdown)
        );

      console.log("Formatted chat history:", formattedChatHistory);

      const response = await chain.invoke({
        input: queryText,
        chat_history: formattedChatHistory,
      });
      let finalResponse = response;
      if (response === "Unknown") {
        finalResponse = "I'm sorry, I don't know the answer to that question.";
      }

      console.log("Received response:", finalResponse);

      newChatHistory = [
        ...newChatHistory,
        { type: "bot", markdown: finalResponse },
      ];
      setChatHistory(newChatHistory);
    } catch (error) {
      console.log("Error processing request:", error);
      newChatHistory = [
        ...newChatHistory,
        {
          type: "bot",
          markdown:
            "I'm sorry, I encountered an error while processing your request.",
        },
      ];
      setChatHistory(newChatHistory);
    }
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
    if (chatContainerRef.current) {
      chatContainerRef.current.classList.add("smooth-scroll");
    }
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    const handleKeyPress = (event) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [chatHistory]);

  return (
    <div className="chat-island flex flex-col items-center ">
      <div className="chat space-y-4 flex flex-col justify-center items-center font-poppins text-base antialiased drop-shadow-xl my-6 md:my-10">
        <div
          ref={chatContainerRef}
          className="flex flex-col h-[60vh] w-[80vw] md:h-[63vh] md:w-[60vw] border-2 border-black border-opacity-20 px-2 py-4 overflow-auto rounded-lg smooth-scroll"
        >
          {chatHistory.map((textitem, index) =>
            textitem.type === "user" ? (
              <motion.div
                key={index+textitem.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="system-text self-end my-2 md:max-w-xl"
              >
                <TextBubble markdown={textitem.markdown} type="user" />
              </motion.div>
            ) : index === chatHistory.length - 1 ? (
              <motion.div
                key={index+textitem.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
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
        <div className="flex flex-col md:flex-row text-xs md:text-base space-x-2 items-center justify-center w-full font-poppins tracking-wide space-y-4 md:space-y-0 text-center">
          <input
            ref={inputRef}
            className="w-[80%] h-10 p-2 rounded-lg bg-transparent border-opacity-40 border border-black hover:cursor-pointer focus:outline-none"
            placeholder="Enter Prompt Here..."
            value={queryText}
            onChange={(e) => {
              setQueryText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <button
            className="bg-primary bg-opacity-20 md:bg-opacity-10 text-slate-100 md:text-text p-2 rounded-full hover:rotate-[-90deg] font-poppins hover:bg-opacity-30 hover:text-white transition-all duration-200"
            type="button"
            onClick={handleClick}
          >
            <img src={arrow.src} alt="arrow" className="h-6 w-6" />
          </button>
        </div>
        <div className="text-center text-xs md:text-sm text-primary opacity-75 w-3/4">
          NOTE: This chatbot is powered by Groq Cloud and LangChain. Please
          excuse any mistakes 😀.
        </div>
      </div>
    </div>
  );
}
