import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReel, getAllReels } from "../../Redux/Reels/reels.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { FaPlus, FaTimes } from "react-icons/fa";
import ReelActions from "../../components/Reels/ReelActions";
import { createMessage } from "../../Redux/Message/message.action";

const Reels = () => {
  const dispatch = useDispatch();
  const { reels = [] } = useSelector((state) => state.reels) || {};
  const { auth } = useSelector((store) => store);

  const [showForm, setShowForm] = useState(false);
  const [showChatSelector, setShowChatSelector] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRefs = useRef({});

  const handleTogglePlay = (id) => {
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
    }
  };

  useEffect(() => {
    dispatch(getAllReels());
  }, [dispatch]);

  const handleUpload = async () => {
    try {
      setLoading(true);
      const videoUrl = await uploadToCloudinary(videoFile, "video");
      const payload = { title, video: videoUrl };
      await dispatch(createReel(payload));
      setShowForm(false);
      setTitle("");
      setVideoFile(null);
    } catch (error) {
      console.error("Error uploading reel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShareReel = (reel) => {
    setSelectedReel(reel);
    setShowChatSelector(true);
  };

  const handleSaveReel = (reel) => {
    // Implement save reel functionality
    console.log("Saving reel:", reel);
    // You can dispatch an action to save the reel to user's saved items
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative flex-1 h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory bg-black rounded-3xl shadow-xl">
      {/* Reels Viewer */}
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="relative h-screen w-full snap-start flex justify-center items-center p-4 transition-all duration-700 ease-out opacity-0 animate-fade-in"
        >
          <div className="relative h-full w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black">
            <video
              ref={(el) => {
                if (el) videoRefs.current[reel.id] = el;
              }}
              src={reel.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleTogglePlay(reel.id)}
            />

            {/* Reel Actions */}
            <ReelActions
              reel={reel}
              onShare={handleShareReel}
              onSave={handleSaveReel}
            />

            {/* Bottom Text Overlay */}
            <div className="absolute bottom-4 left-4 right-20 text-white z-10">
              {/* Username and Follow button */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      reel.user?.profile ||
                      `https://ui-avatars.com/api/?name=${reel.user?.firstName}&background=random`
                    }
                    alt={reel.user?.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm">
                    @{reel.user?.firstName?.toLowerCase() || "user"}
                  </span>
                </div>
                {reel.user?.id !== auth.user?.id && (
                  <button className="border border-white px-4 py-1 rounded-md text-xs font-medium hover:bg-white hover:text-black transition-colors">
                    Follow
                  </button>
                )}
              </div>

              {/* Caption */}
              <div className="text-sm leading-relaxed mb-2">
                <p className="break-words">{reel.title}</p>
              </div>

              {/* Time and Audio info */}
              <div className="flex items-center justify-between text-xs opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-spin"></div>
                  <span>Original audio</span>
                </div>
                <span>{formatTime(reel.createdAt)}</span>
              </div>
            </div>

            {/* Top overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-10">
              <div className="text-xl font-bold">Reels</div>
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Floating Add Reel Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50"
      >
        <FaPlus className="text-xl" />
      </button>

      {/* Upload Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="w-full max-w-sm bg-transparent border border-purple-400/30 p-6 rounded-2xl backdrop-blur-md space-y-5 relative text-white">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-purple-300 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold text-center text-purple-300">
              Upload a New Reel
            </h2>

            <input
              type="text"
              placeholder="Reel title"
              className="w-full border border-purple-400/30 rounded-lg px-4 py-2 bg-transparent placeholder-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full text-sm text-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-medium file:bg-purple-700/30 file:text-white hover:file:bg-purple-700/50 transition-colors"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-purple-700/20 text-white rounded-lg hover:bg-purple-700/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={loading || !title || !videoFile}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  loading || !title || !videoFile
                    ? "bg-purple-400/50 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Selector Modal for Sharing */}
      {showChatSelector && selectedReel && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share Reel</h3>
              <button
                onClick={() => setShowChatSelector(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="text-center py-8">
              <p className="text-gray-400">Chat selector will be implemented here</p>
              <p className="text-sm text-gray-500 mt-2">
                This will show your chat list to share the reel
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowChatSelector(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;