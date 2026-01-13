import { useEffect, useCallback } from "react";

/**
 * Section IDs mapped to number keys 1-9
 * Order matches the visual flow of the portfolio
 */
const SECTION_MAP = {
  1: "hero",
  2: "about",
  3: "skills",
  4: "experience",
  5: "projects",
  6: "education",
  7: "certifications",
  8: "contact",
};

/**
 * Custom hook for keyboard navigation throughout the portfolio
 * 
 * Shortcuts:
 * - Ctrl+K: Open terminal (prepared for future implementation)
 * - 1-9: Navigate to corresponding section

 * - Escape: Close modals
 * 
 * @param {Object} options - Configuration options
 * @param {Function} options.onTerminalToggle - Callback when Ctrl+K is pressed
 * @param {Function} options.onEscape - Callback when Escape is pressed
 * @returns {Object} - Object containing keyboard navigation state and handlers
 */
export const useKeyboardNavigation = (options = {}) => {
  const { onTerminalToggle, onEscape } = options;

  /**
   * Navigate to a section by ID with smooth scrolling
   */
  const navigateToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Account for fixed navbar
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }, []);

  /**
   * Handle keyboard events
   */
  const handleKeyDown = useCallback(
    (event) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = event.target;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      // Ctrl+K - Open terminal
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onTerminalToggle?.();
        return;
      }

      // Escape - Close modals
      if (event.key === "Escape") {
        onEscape?.();
        return;
      }

      // Number keys 1-9 - Navigate to sections
      const num = parseInt(event.key, 10);
      if (
        num >= 1 &&
        num <= 9 &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        const sectionId = SECTION_MAP[num];
        if (sectionId) {
          event.preventDefault();
          navigateToSection(sectionId);
        }
      }
    },
    [onTerminalToggle, onEscape, navigateToSection]
  );

  // Attach keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    navigateToSection,
    sectionMap: SECTION_MAP,
  };
};

export default useKeyboardNavigation;
