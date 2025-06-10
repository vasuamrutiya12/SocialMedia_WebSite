import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReel, getAllReels } from "../../Redux/Reels/reels.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import {
  FaHeart,
  FaCommentDots,
  FaPlus,
  FaTimes,
  FaShare,
  FaBookmark,
} from "react-icons/fa";

const Reels = () => {
  const dispatch = useDispatch();
  const { reels = [] } = useSelector((state) => state.reels) || {};

  const [showForm, setShowForm] = useState(false);
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

            {/* Side Icons - Positioned more centrally like Instagram */}
            <div className="absolute right-3 top-3/4 transform -translate-y-1/2 flex flex-col items-center gap-6 text-white z-10">
              <div className="flex flex-col items-center">
                <button className="hover:scale-110 transition-transform duration-200">
                  <FaHeart className="text-white text-3xl mb-1" />
                </button>
                <span className="text-xs font-medium">45.6K</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="hover:scale-110 transition-transform duration-200">
                  <FaCommentDots className="text-white text-3xl mb-1" />
                </button>
                <span className="text-xs font-medium">316</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="hover:scale-110 transition-transform duration-200">
                  <FaShare className="text-white text-3xl mb-1" />
                </button>
              </div>

              <div className="flex flex-col items-center">
                <button className="hover:scale-110 transition-transform duration-200">
                  <FaBookmark className="text-white text-3xl mb-1" />
                </button>
              </div>

              {/* Profile picture at bottom of side icons */}
              <div className="mt-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Text Overlay - Instagram style */}
            <div className="absolute bottom-4 left-4 right-20 text-white z-10">
              {/* Username and Follow button */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                  <span className="font-semibold text-sm">
                    @{reel.user?.firstName || "user"}
                  </span>
                </div>
                <button className="border border-white px-4 py-1 rounded-md text-xs font-medium hover:bg-white hover:text-black transition-colors">
                  Follow
                </button>
              </div>

              {/* Caption */}
              <div className="text-sm leading-relaxed mb-2">
                <p className="break-words">{reel.title}</p>
              </div>

              {/* Audio info */}
              <div className="flex items-center gap-2 text-xs opacity-80">
                <div className="w-3 h-3 bg-white rounded-full animate-spin"></div>
                <span>Original audio</span>
              </div>
            </div>

            {/* Top overlay with Instagram branding */}
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
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  loading
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
    </div>
  );
};

export default Reels;
