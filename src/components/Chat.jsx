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
  let [enablePrompt, setEnablePrompt] = useState(true);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      markdown:
        "Hi there! Please ask me any questions about Jaskaran Singh and I will try my best to help you out. 😊",
    },
  ]);

  const SystemPrompt = `You are an AI assistant that will ONLY answer questions pertaining to Jaskaran Singh. 
    Use the following informationn (Jaskaran Singh's Resume)  to answer the user's questions:

    ${resume_data}
    
    Return Markdown format with proper hyperlinks. Bold important information.
    DO NOT answer any questions or perform any task's not related to Jaskaran Singh's Resume. 
    If the user talks normally, you can converse normally as well.
    Be concise and do not overstate Jaskaran Singh's achievements or acomplishments. Try to be as helpful as possible but do not state any false information.
    If the answer is not in the context, say the word “Unknown".`;

  const messageRecommendations = [
    "Where is he working?",
    "How do I contact him?",
    "What is his tech stack?",
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const model = new ChatGroq({
    model: "llama3-70b-8192",
    // apiKey: `${process.env.GROQ_API_KEY}`,
    apiKey: "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",
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

  const handlePrompt = async (queryText) => {
    setEnablePrompt(false);
    let newChatHistory = [
      ...chatHistory,
      { type: "user", markdown: queryText },
    ];
    setChatHistory(newChatHistory);

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
      let finalResponse = response;
      if (response === "Unknown") {
        finalResponse = "I'm sorry, I don't know the answer to that question.";
      }

      newChatHistory = [
        ...newChatHistory,
        { type: "bot", markdown: finalResponse },
      ];
      setChatHistory(newChatHistory);
      setEnablePrompt(true);
    } catch (error) {
      newChatHistory = [
        ...newChatHistory,
        {
          type: "bot",
          markdown:
            "I'm sorry, I encountered an error while processing your request.",
        },
      ];
      setChatHistory(newChatHistory);
      setEnablePrompt(true);
    }
  };

  const handleClick = async (event) => {
    if (!queryText.trim()) return;

    let newChatHistory = [
      ...chatHistory,
      { type: "user", markdown: queryText },
    ];
    setChatHistory(newChatHistory);
    setQueryText("");

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
      let finalResponse = response;
      if (response === "Unknown") {
        finalResponse = "I'm sorry, I don't know the answer to that question.";
      }

      newChatHistory = [
        ...newChatHistory,
        { type: "bot", markdown: finalResponse },
      ];
      setChatHistory(newChatHistory);
    } catch (error) {
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
      <div className="chat space-y-2 flex flex-col justify-center items-center font-poppins text-base antialiased drop-shadow-xl my-6 md:my-8">
        <div
          ref={chatContainerRef}
          className="flex flex-col z-10 bg-orange-200/5 h-[60vh] w-[90vw] md:h-[63vh] md:w-[60vw] border border-black border-opacity-[0.3] px-2 py-4 overflow-auto rounded-lg smooth-scroll"
        >
          {chatHistory.map((textitem, index) =>
            textitem.type === "user" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="system-text self-end my-2 md:max-w-xl"
              >
                <TextBubble markdown={textitem.markdown} type="user" />
              </motion.div>
            ) : index === chatHistory.length - 1 ? (
              <motion.div
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
        <div className="flex flex-col text-xs md:text-sm space-x-2 items-center justify-center w-full font-poppins tracking-wide space-y-4 md:space-y-3 text-center">
          <div className="message-rec flex justify-center items-center space-x-2 mt-2">
            {messageRecommendations.map((message) => {
              return (
                <div
                  className="bg-orange-200 text-xs text-center px-1 md:px-1 bg-opacity-40 content-center text-text rounded-2xl hover:cursor-pointer hover:bg-opacity-80 hover:text-black transition-all duration-200 h-16 w-[28%] md:h-12 md:w-[33%]"
                  onClick={() => {
                    console.log(enablePrompt);
                    if (enablePrompt) handlePrompt(message);
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
            <button type="button" onClick={handleClick}>
              <img
                src={arrow.src}
                alt="arrow"
                className=" h-6 w-6 rounded-full hover:rotate-[-90deg] transition-all duration-200"
              />
            </button>
          </div>
        </div>
        <div className="text-center text-xs md:text-sm text-primary opacity-75 w-3/4">
          NOTE: This chatbot is powered by Groq Cloud and LangChain. Please
          excuse any mistakes 😀.
        </div>
      </div>
    </div>
  );
}
