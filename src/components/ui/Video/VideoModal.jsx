import { memo, useRef, useEffect, useCallback, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { isGoogleDriveUrl, getDriveEmbedUrl } from "../../utils/videoUtils";

/**
 * VideoModal component for expanded video playback
 * Supports full video controls, keyboard navigation, and click outside to close
 */
const VideoModal = memo(
  ({ isOpen, onClose, videoSrc, posterSrc, title = "Video" }) => {
    const modalRef = useRef(null);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const controlsTimeoutRef = useRef(null);

    const isDriveVideo = useMemo(() => isGoogleDriveUrl(videoSrc), [videoSrc]);
    const embedUrl = useMemo(() => getDriveEmbedUrl(videoSrc), [videoSrc]);

    // Video controls
    const togglePlay = useCallback(() => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }, []);

    const toggleMute = useCallback(() => {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }, []);

    const toggleFullscreen = useCallback(() => {
      if (!videoContainerRef.current) return;

      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen?.() ||
          videoContainerRef.current.webkitRequestFullscreen?.();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        setIsFullscreen(false);
      }
    }, []);

    // Handle fullscreen change events (when user exits via browser controls)
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleFullscreenChange,
        );
      };
    }, []);

    // Handle escape key to close (only when not in fullscreen)
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e) => {
        if (e.key === "Escape" && !isFullscreen) {
          onClose();
        } else if (e.key === " ") {
          e.preventDefault();
          togglePlay();
        } else if (e.key === "f" || e.key === "F") {
          toggleFullscreen();
        } else if (e.key === "m" || e.key === "M") {
          toggleMute();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      isOpen,
      isFullscreen,
      onClose,
      togglePlay,
      toggleFullscreen,
      toggleMute,
    ]);

    // Prevent body scroll when modal is open
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

    // Auto-hide controls
    const resetControlsTimeout = useCallback(() => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying && !isDriveVideo) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    }, [isPlaying, isDriveVideo]);

    // Handle click outside to close
    const handleBackdropClick = useCallback(
      (e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      },
      [onClose],
    );

    const handleVolumeChange = useCallback((e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
      }
    }, []);

    const handleSeek = useCallback((e) => {
      const newTime = parseFloat(e.target.value);
      setCurrentTime(newTime);
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    }, []);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Video event handlers
    const handleTimeUpdate = useCallback(() => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    }, []);

    const handleLoadedMetadata = useCallback(() => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    }, []);

    const handlePlay = useCallback(() => {
      setIsPlaying(true);
      resetControlsTimeout();
    }, [resetControlsTimeout]);

    const handlePause = useCallback(() => {
      setIsPlaying(false);
      setShowControls(true);
    }, []);

    if (!isOpen) return null;

    const modalContent = (
      <div
        ref={modalRef}
        className="fixed z-50 flex items-center justify-center bg-oxford-navy/95 backdrop-blur-sm"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
        }}
        onClick={handleBackdropClick}
        onMouseMove={resetControlsTimeout}
        role="dialog"
        aria-modal="true"
        aria-label={`Video player: ${title}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-oxford-navy-light/80 text-honeydew hover:bg-punch-red transition-all duration-300 flex items-center justify-center ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close video"
        >
          <i className="fas fa-times text-lg" aria-hidden="true"></i>
        </button>

        {/* Video container */}
        <div
          ref={videoContainerRef}
          className={`relative bg-oxford-navy-dark overflow-hidden shadow-2xl transition-all duration-300 ${
            isFullscreen
              ? "w-screen h-screen max-w-none rounded-none"
              : "w-full max-w-5xl mx-4 rounded-xl"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video element or Iframe */}
          {isDriveVideo ? (
            <iframe
              src={embedUrl}
              className={`w-full bg-black ${
                isFullscreen ? "h-screen" : "aspect-video"
              }`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={title}
            ></iframe>
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                className={`w-full object-contain bg-black ${
                  isFullscreen ? "h-screen" : "aspect-video"
                }`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={handlePlay}
                onPause={handlePause}
                onClick={togglePlay}
                playsInline
              />

              {/* Play/Pause overlay */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 rounded-full bg-punch-red/90 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <i
                      className="fas fa-play text-honeydew text-2xl ml-1"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Controls bar - only for custom video */}
          {!isDriveVideo && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-oxford-navy/90 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress bar */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-frosted-blue/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-punch-red"
                  aria-label="Video progress"
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="text-honeydew hover:text-punch-red transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <i
                      className={`fas ${
                        isPlaying ? "fa-pause" : "fa-play"
                      } text-lg`}
                      aria-hidden="true"
                    ></i>
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-honeydew hover:text-punch-red transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      <i
                        className={`fas ${
                          isMuted || volume === 0
                            ? "fa-volume-mute"
                            : volume < 0.5
                              ? "fa-volume-down"
                              : "fa-volume-up"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-frosted-blue/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-honeydew"
                      aria-label="Volume"
                    />
                  </div>

                  {/* Time display */}
                  <span className="text-honeydew/80 text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="text-honeydew hover:text-punch-red transition-colors"
                  aria-label={
                    isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }
                >
                  <i
                    className={`fas ${
                      isFullscreen ? "fa-compress" : "fa-expand"
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          )}

          {/* Title */}
          <div
            className={`absolute top-0 left-0 right-0 bg-linear-to-b from-oxford-navy/90 to-transparent p-4 transition-opacity duration-300 ${
              showControls || isDriveVideo ? "opacity-100" : "opacity-0"
            }`}
          >
            <h3 className="text-honeydew font-semibold">{title}</h3>
          </div>
        </div>

        {/* Keyboard hints - only for custom video */}
        {!isDriveVideo && (
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-frosted-blue/60 text-xs transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>
              <kbd className="px-1.5 py-0.5 bg-oxford-navy-light rounded">
                Space
              </kbd>{" "}
              Play/Pause
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-oxford-navy-light rounded">
                M
              </kbd>{" "}
              Mute
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-oxford-navy-light rounded">
                F
              </kbd>{" "}
              Fullscreen
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-oxford-navy-light rounded">
                Esc
              </kbd>{" "}
              Close
            </span>
          </div>
        )}
      </div>
    );

    return createPortal(modalContent, document.body);
  },
);

VideoModal.displayName = "VideoModal";

export default VideoModal;
