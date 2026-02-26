import { useState, useRef, useEffect } from "react";

/**
 * Terminal Input Component
 * Handles user input with blinking cursor and command history navigation
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback when command is submitted
 * @param {Function} props.onHistoryNavigation - Callback for up/down arrow navigation
 */
const TerminalInput = ({ onSubmit, onHistoryNavigation }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep focus on input
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (input.trim()) {
          onSubmit(input);
          setInput("");
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevCommand = onHistoryNavigation("up");
        if (prevCommand !== null) {
          setInput(prevCommand);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        const nextCommand = onHistoryNavigation("down");
        if (nextCommand !== null) {
          setInput(nextCommand);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex items-center gap-2 mt-2 cursor-text"
      onClick={handleContainerClick}
    >
      {/* Prompt */}
      <span className="text-[#27c93f] select-none shrink-0">
        <span className="text-[#58a6ff]">visitor</span>
        <span className="text-[#8b949e]">@</span>
        <span className="text-[#f0883e]">portfolio</span>
        <span className="text-[#8b949e]">:</span>
        <span className="text-[#a371f7]">~</span>
        <span className="text-[#8b949e]">$</span>
      </span>

      {/* Input Container */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-[#c9d1d9] outline-none caret-transparent font-mono"
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command input"
        />

        {/* Custom Blinking Cursor */}
        <span
          className="absolute top-0 text-[#27c93f] animate-blink pointer-events-none"
          style={{ left: `${input.length}ch` }}
          aria-hidden="true"
        >
          █
        </span>
      </div>
    </div>
  );
};

export default TerminalInput;
