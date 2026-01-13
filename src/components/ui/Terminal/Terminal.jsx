import { useEffect, useRef, useState, useCallback } from "react";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import { executeCommand, COMMANDS } from "./commands";

/**
 * Interactive Terminal Modal Component
 * Provides a command-line interface for exploring the portfolio
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the terminal is visible
 * @param {Function} props.onClose - Callback to close the terminal
 */
const Terminal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    {
      type: "output",
      content: "Welcome to Arunpandian's Portfolio Terminal",
      isWelcome: true,
    },
    {
      type: "output",
      content: "Type 'help' for available commands",
      isHint: true,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const contentRef = useRef(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when terminal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Handle command execution
   */
  const handleCommand = useCallback((input) => {
    const trimmedInput = input.trim().toLowerCase();
    
    // Add command to history
    setHistory((prev) => [...prev, { type: "command", content: input }]);
    
    // Add to command history for up/down navigation
    if (trimmedInput) {
      setCommandHistory((prev) => [...prev, trimmedInput]);
      setHistoryIndex(-1);
    }

    // Handle clear command specially
    if (trimmedInput === "clear") {
      setHistory([
        {
          type: "output",
          content: "Terminal cleared",
          isHint: true,
        },
      ]);
      return;
    }

    // Execute command and add output
    const output = executeCommand(trimmedInput);
    setHistory((prev) => [...prev, { type: "output", content: output }]);
  }, []);

  /**
   * Navigate command history with up/down arrows
   */
  const handleHistoryNavigation = useCallback(
    (direction) => {
      if (commandHistory.length === 0) return null;

      let newIndex;
      if (direction === "up") {
        newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
      } else {
        newIndex =
          historyIndex === -1
            ? -1
            : Math.min(commandHistory.length - 1, historyIndex + 1);
      }

      setHistoryIndex(newIndex);
      return newIndex === -1 ? "" : commandHistory[newIndex];
    },
    [commandHistory, historyIndex]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Terminal Window */}
      <div
        ref={terminalRef}
        className="relative w-full max-w-3xl h-[70vh] max-h-[600px] bg-[#0d1117] rounded-lg shadow-2xl border border-[#30363d] overflow-hidden flex flex-col animate-terminal-open"
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
              aria-label="Close terminal"
            />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
          </div>
          <span
            id="terminal-title"
            className="text-[#8b949e] text-sm font-mono"
          >
            terminal — arunpandian@portfolio
          </span>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm terminal-content"
        >
          {history.map((item, index) => (
            <TerminalOutput
              key={index}
              type={item.type}
              content={item.content}
              isWelcome={item.isWelcome}
              isHint={item.isHint}
            />
          ))}
          
          {/* Input Line */}
          <TerminalInput
            onSubmit={handleCommand}
            onHistoryNavigation={handleHistoryNavigation}
          />
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none terminal-scanlines" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Terminal;
