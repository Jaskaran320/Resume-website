import { color } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TextBubble({ markdown, type }) {
  const colorUser = {
      backgroundColor: '#D6E5E3',
      color: "#424874",
  };
  const colorBot = {
      backgroundColor: '#DCE0E4',
      color: "#424874",
  };
  return type == "user" ? (
    <div style={colorUser} 
    className="markdown whitespace-pre-line text--600 bg-opacity-40 text-opacity-80 rounded-xl p-2 text-xs md:text-base text-right font-poppins font-extralight md:font-normal tracking-tight leading-snug">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  ) : (
    <div style={colorBot}
    className="markdown whitespace-pre-line bg-opacity-40 text-opacity-80 rounded-xl p-2 text-xs md:text-base text-left font-poppins font-extralight md:font-normal tracking-tight leading-snug">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
}

export default TextBubble;
