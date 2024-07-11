import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
function TextBubble({ markdown, type }) {
  return type == "user" ? (
    <div className="markdown whitespace-pre-line text-green-600 bg-opacity-40 text-opacity-80 bg-green-100 rounded-xl p-2 text-xs md:text-base text-right font-poppins font-extralight md:font-normal tracking-tight leading-snug">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  ) : (
    <div className="markdown whitespace-pre-line text-blue-600 bg-opacity-40 text-opacity-80 bg-blue-100  rounded-xl p-2 text-xs md:text-base text-left font-poppins font-extralight md:font-normal tracking-tight leading-snug">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
}

export default TextBubble;
