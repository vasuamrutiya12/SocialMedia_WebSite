import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Send } from "lucide-react";

const StoryViewer = ({ open, handleClose, stories, activeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentIndex(activeIndex);
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!open || isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2; // 5 seconds total (100 / 2 = 50 intervals * 100ms)
      });
    }, 100);

    return () => clearInterval(timer);
  }, [open, currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // Implement reply functionality here
      console.log("Reply:", replyText);
      setReplyText("");
    }
  };

  const isVideo = (mediaUrl) => {
    if (!mediaUrl) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => mediaUrl.toLowerCase().includes(ext));
  };

  const renderMedia = (mediaUrl, style = {}) => {
    if (isVideo(mediaUrl)) {
      return (
        <video
          src={mediaUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style
          }}
          autoPlay
          muted
          loop
          playsInline
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
      );
    } else {
      return (
        <img
          src={mediaUrl}
          alt="story"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style
          }}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />
      );
    }
  };

  const story = stories[currentIndex];

  if (!story) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {currentIndex < stories.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Story Container */}
          <div className="relative w-full max-w-md h-full max-h-[90vh] mx-4">
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: index < currentIndex ? "100%" : 
                             index === currentIndex ? `${progress}%` : "0%"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="absolute top-12 left-4 right-4 z-10 flex items-center space-x-3">
              <img
                src={
                  story.user?.profile ||
                  `https://ui-avatars.com/api/?name=${story.user?.firstName}&background=random`
                }
                alt={story.user?.firstName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  {story.user?.firstName || "User"}
                </p>
                <p className="text-white/70 text-xs">
                  {new Date(story.timeStamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Story Content */}
            <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
              {renderMedia(story.video || story.img)}
            </div>

            {/* Story Caption */}
            {story.caption && (
              <div className="absolute bottom-20 left-4 right-4 z-10">
                <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  {story.caption}
                </p>
              </div>
            )}

            {/* Reply Input */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                <input
                  type="text"
                  placeholder={`Reply to ${story.user?.firstName || "user"}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleReply()}
                  className="flex-1 bg-transparent text-white placeholder-white/70 text-sm focus:outline-none px-3 py-2"
                />
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="text-white hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Click areas for navigation */}
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full cursor-pointer"
                onClick={handlePrev}
              />
              <div
                className="w-1/2 h-full cursor-pointer"
                onClick={handleNext}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryViewer;