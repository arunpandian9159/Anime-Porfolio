import { memo, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { isGoogleDriveUrl } from "../../utils/videoUtils";

/**
 * VideoPreview component with lazy loading and auto-play on hover
 * Falls back to poster image if video is unavailable
 */
const VideoPreview = memo(
  ({
    videoSrc,
    posterSrc,
    alt = "Video preview",
    onExpand,
    className = "",
  }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const isDriveVideo = useMemo(() => isGoogleDriveUrl(videoSrc), [videoSrc]);

    // Intersection Observer for lazy loading
    useEffect(() => {
      const container = containerRef.current;
      if (!container || !videoSrc) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(container);
            }
          });
        },
        { threshold: 0.1, rootMargin: "100px" },
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, [videoSrc]);

    // Handle video load
    const handleVideoLoaded = useCallback(() => {
      setIsLoaded(true);
    }, []);

    // Handle video error
    const handleVideoError = useCallback(() => {
      setHasError(true);
      setIsLoaded(false);
    }, []);

    // Track cursor position relative to container
    const handleMouseMove = useCallback((e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }, []);

    // Auto-play on hover
    const handleMouseEnter = useCallback(
      (e) => {
        setIsHovering(true);
        // Set initial cursor position
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
        if (videoRef.current && isLoaded && !hasError && !isDriveVideo) {
          videoRef.current.play().catch(() => {
            // Silently handle autoplay failures
          });
        }
      },
      [isLoaded, hasError, isDriveVideo],
    );

    // Pause on mouse leave
    const handleMouseLeave = useCallback(() => {
      setIsHovering(false);
      if (videoRef.current && !videoRef.current.paused && !isDriveVideo) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, [isDriveVideo]);

    // Handle click to expand
    const handleClick = useCallback(() => {
      if (onExpand && videoSrc) {
        onExpand();
      }
    }, [onExpand, videoSrc]);

    // If no video source, just show the poster image (no click handler)
    if (!videoSrc) {
      return (
        <div
          ref={containerRef}
          className={`relative w-full h-full overflow-hidden ${className}`}
        >
          <img
            src={posterSrc}
            alt={alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden cursor-pointer group ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Play video preview: ${alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Poster image (shown until video loads or as fallback) */}
        <img
          src={posterSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
            isLoaded && isHovering && !isDriveVideo
              ? "opacity-0"
              : "opacity-100"
          }`}
        />

        {/* Video element (lazy loaded) - only for direct video links */}
        {isVisible && !isDriveVideo && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
              isLoaded && isHovering ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Play icon overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-oxford-navy/30 transition-opacity duration-300 pointer-events-none ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-punch-red/90 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            <i
              className="fas fa-play text-honeydew text-xl ml-1"
              aria-hidden="true"
            ></i>
          </div>
        </div>

        {/* Cursor-following expand hint on hover */}
        {onExpand && isHovering && (
          <div
            className="absolute pointer-events-none bg-oxford-navy/90 text-honeydew px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-lg z-10 whitespace-nowrap transition-opacity duration-200"
            style={{
              left: cursorPos.x + 15,
              top: cursorPos.y + 15,
              opacity: isLoaded ? 1 : 0.7,
            }}
          >
            <i className="fas fa-expand" aria-hidden="true"></i>
            <span>Click to expand</span>
          </div>
        )}
      </div>
    );
  },
);

VideoPreview.displayName = "VideoPreview";

export default VideoPreview;
