import { useState, useEffect, memo } from "react";

/**
 * Terminal Preview Widget
 * Shows a small terminal preview in the bottom-right corner with typing animation.
 * Clicking it expands to the full terminal modal.
 *
 * @param {Object} props
 * @param {Function} props.onClick - Callback when preview is clicked to open full terminal
 * @param {boolean} props.isTerminalOpen - Whether the main terminal is currently open
 */
const TerminalPreview = memo(({ onClick, isTerminalOpen }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Commands to cycle through with typing animation
  const terminalLines = [
    "$ help",
    "$ skills",
    "$ projects",
    "$ contact",
    "$ about",
    "$ experience",
  ];

  useEffect(() => {
    if (isTerminalOpen) return; // Pause animation when terminal is open

    const currentLine = terminalLines[currentLineIndex];
    let charIndex = 0;

    // Typing effect
    const typingInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setDisplayText(currentLine.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Wait before clearing and moving to next line
        setTimeout(() => {
          setDisplayText("");
          setCurrentLineIndex((prev) => (prev + 1) % terminalLines.length);
          setIsTyping(true);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, isTerminalOpen]);

  // Don't show preview when terminal is open
  if (isTerminalOpen) return null;

  return (
    <div
      onClick={onClick}
      className="hidden md:block fixed bottom-6 right-6 z-50 cursor-pointer group"
      role="button"
      aria-label="Open terminal (Ctrl+K)"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Terminal Preview Box */}
      <div className="relative bg-[#0d1117] rounded-lg shadow-2xl border border-[#30363d] overflow-hidden transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:border-cerulean/50">
        {/* Title Bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#161b22] border-b border-[#30363d]">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[#8b949e] text-xs font-mono">
            terminal
          </span>
        </div>

        {/* Terminal Content */}
        <div className="px-5 py-4 min-w-[320px] min-h-[120px]">
          <div className="font-mono text-base mb-2 text-cerulean-light">
            Welcome to Arun's Portfolio
          </div>
          <div className="font-mono text-base">
            {/* Prompt and typing text */}
            <span className="text-green-400">{displayText}</span>
            {/* Blinking cursor */}
            <span
              className={`inline-block w-2.5 h-5 bg-green-400 ml-1 align-middle ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            />
          </div>
          {/* Hint text */}
          <div className="text-[#8b949e] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to open • Ctrl+K
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-cerulean/5 to-punch-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none terminal-scanlines opacity-30" />
      </div>
    </div>
  );
});

TerminalPreview.displayName = "TerminalPreview";

export default TerminalPreview;
