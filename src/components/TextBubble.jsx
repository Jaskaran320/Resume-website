import { color } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
function TextBubble({ markdown, type }) {
  const colorUser = {
      backgroundColor: '#D4D0C4',
      color: '#9E6557',
  };
  const colorBot = {
      backgroundColor: '#D4D0C4',
      color: '#AE5B66',
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
