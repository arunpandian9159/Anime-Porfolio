import { useState, useEffect, useRef } from "react";

/**
 * Terminal Output Component
 * Displays command output with optional typewriter animation
 * Supports both text and JSX content
 *
 * @param {Object} props
 * @param {string} props.type - "command" or "output"
 * @param {string|JSX.Element} props.content - Content to display
 * @param {boolean} props.isWelcome - Whether this is the welcome message
 * @param {boolean} props.isHint - Whether this is a hint message
 */
const TerminalOutput = ({ type, content, isWelcome, isHint }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef(null);

  // Check if content is JSX (React element)
  const isJSX = typeof content !== "string";

  useEffect(() => {
    // Skip typewriter for commands or JSX content
    if (type === "command" || isJSX) {
      setDisplayedContent(content);
      return;
    }

    // Typewriter effect for text output
    setIsTyping(true);
    let index = 0;
    const text = String(content);

    // Faster typing for welcome/hint messages
    const speed = isWelcome || isHint ? 20 : 15;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedContent(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content, type, isJSX, isWelcome, isHint]);

  // Command line display
  if (type === "command") {
    return (
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#27c93f] select-none shrink-0">
          <span className="text-[#58a6ff]">visitor</span>
          <span className="text-[#8b949e]">@</span>
          <span className="text-[#f0883e]">portfolio</span>
          <span className="text-[#8b949e]">:</span>
          <span className="text-[#a371f7]">~</span>
          <span className="text-[#8b949e]">$</span>
        </span>
        <span className="text-[#c9d1d9]">{content}</span>
      </div>
    );
  }

  // Output display
  return (
    <div
      ref={contentRef}
      className={`mb-2 ${
        isWelcome
          ? "text-[#58a6ff] font-bold text-base"
          : isHint
            ? "text-[#8b949e] italic"
            : "text-[#c9d1d9]"
      }`}
    >
      {isJSX ? (
        content
      ) : (
        <>
          {displayedContent}
          {isTyping && (
            <span className="text-[#27c93f] animate-blink" aria-hidden="true">
              █
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default TerminalOutput;
