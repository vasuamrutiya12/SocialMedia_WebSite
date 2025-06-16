"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { createReel, getAllReels } from "../../Redux/Reels/reels.action"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary"
import { FaPlus, FaTimes, FaPlay, FaPause } from "react-icons/fa"
import { Heart, MessageCircle, Share, Bookmark, Music, Sparkles } from "lucide-react"
import ReelActions from "../../components/Reels/ReelActions"

const Reels = () => {
  const dispatch = useDispatch()
  const { reels = [] } = useSelector((state) => state.reels) || {}
  const { auth } = useSelector((store) => store)

  const [showForm, setShowForm] = useState(false)
  const [showChatSelector, setShowChatSelector] = useState(false)
  const [selectedReel, setSelectedReel] = useState(null)
  const [title, setTitle] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0)
  const videoRefs = useRef({})

  const handleTogglePlay = (id, index) => {
    const videoEl = videoRefs.current[id]
    if (videoEl) {
      if (videoEl.paused) {
        // Pause all other videos
        Object.values(videoRefs.current).forEach(video => {
          if (video !== videoEl) video.pause()
        })
        videoEl.play()
        setCurrentPlayingIndex(index)
      } else {
        videoEl.pause()
      }
    }
  }

  useEffect(() => {
    dispatch(getAllReels())
  }, [dispatch])

  const handleUpload = async () => {
    try {
      setLoading(true)
      const videoUrl = await uploadToCloudinary(videoFile, "video")
      const payload = { title, video: videoUrl }
      await dispatch(createReel(payload))
      setShowForm(false)
      setTitle("")
      setVideoFile(null)
    } catch (error) {
      console.error("Error uploading reel:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleShareReel = (reel) => {
    setSelectedReel(reel)
    setShowChatSelector(true)
  }

  const handleSaveReel = (reel) => {
    console.log("Saving reel:", reel)
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const reelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, scale: 0.8 }
  }

  return (
    <div className="relative flex-1 h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Reels Viewer */}
      <AnimatePresence>
        {reels.map((reel, index) => (
          <motion.div
            key={reel.id}
            variants={reelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative h-screen w-full snap-start flex justify-center items-center p-4"
          >
            <div className="relative h-full w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl bg-black group">
              {/* Video Container */}
              <div className="relative w-full h-full">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[reel.id] = el
                  }}
                  src={reel.video}
                  autoPlay={index === 0}
                  muted
                  loop
                  className="w-full h-full object-cover"
                  onClick={() => handleTogglePlay(reel.id, index)}
                />

                {/* Video Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                
                {/* Play/Pause Indicator */}
                <AnimatePresence>
                  {currentPlayingIndex !== index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <FaPlay className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Reel Actions */}
              <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 text-white z-20">
                {/* Like Button */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center group"
                >
                  <motion.button
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-red-500/20 transition-all duration-300"
                  >
                    <Heart className="w-6 h-6 group-hover:text-red-400" />
                  </motion.button>
                  <span className="text-xs font-medium mt-1">
                    {reel.liked?.length || Math.floor(Math.random() * 1000)}
                  </span>
                </motion.div>

                {/* Comment Button */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center group"
                >
                  <motion.button
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-blue-500/20 transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6 group-hover:text-blue-400" />
                  </motion.button>
                  <span className="text-xs font-medium mt-1">
                    {reel.comments?.length || Math.floor(Math.random() * 100)}
                  </span>
                </motion.div>

                {/* Share Button */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center group"
                >
                  <motion.button
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    onClick={() => handleShareReel(reel)}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-green-500/20 transition-all duration-300"
                  >
                    <Share className="w-6 h-6 group-hover:text-green-400" />
                  </motion.button>
                </motion.div>

                {/* Save Button */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center group"
                >
                  <motion.button
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    onClick={() => handleSaveReel(reel)}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-yellow-500/20 transition-all duration-300"
                  >
                    <Bookmark className="w-6 h-6 group-hover:text-yellow-400" />
                  </motion.button>
                </motion.div>

                {/* Profile Picture */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative mt-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                    <img
                      src={
                        reel.user?.profile ||
                        `https://ui-avatars.com/api/?name=${reel.user?.firstName}&background=random`
                      }
                      alt={reel.user?.firstName}
                      className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                    />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-full border-2 border-dashed border-white/30"
                  />
                </motion.div>
              </div>

              {/* Enhanced Bottom Text Overlay */}
              <div className="absolute bottom-4 left-4 right-20 text-white z-10">
                {/* Username and Follow button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="flex items-center gap-2">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={
                        reel.user?.profile ||
                        `https://ui-avatars.com/api/?name=${reel.user?.firstName}&background=random`
                      }
                      alt={reel.user?.firstName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                    />
                    <span className="font-semibold text-sm">
                      @{reel.user?.firstName?.toLowerCase() || "user"}
                    </span>
                  </div>
                  {reel.user?.id !== auth.user?.id && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-white px-4 py-1 rounded-full text-xs font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                    >
                      Follow
                    </motion.button>
                  )}
                </motion.div>

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm leading-relaxed mb-3"
                >
                  <p className="break-words">{reel.title}</p>
                </motion.div>

                {/* Music and Time info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between text-xs opacity-80"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                    <Music className="w-3 h-3" />
                    <span>Original audio</span>
                  </div>
                  <span>{formatTime(reel.createdAt)}</span>
                </motion.div>
              </div>

              {/* Enhanced Top overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold">Reels</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-6 h-6 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Enhanced Floating Add Reel Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 z-50 flex items-center justify-center"
      >
        <FaPlus className="text-xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
        />
      </motion.button>

      {/* Enhanced Upload Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-purple-400/30 p-8 rounded-3xl space-y-6 relative text-white shadow-2xl"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 p-[1px]">
                <div className="w-full h-full bg-black/40 backdrop-blur-xl rounded-3xl" />
              </div>

              <div className="relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowForm(false)}
                  className="absolute top-0 right-0 text-purple-300 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </motion.button>

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
                >
                  Create Amazing Reel
                </motion.h2>

                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  type="text"
                  placeholder="What's your reel about? ✨"
                  className="w-full border border-purple-400/30 rounded-2xl px-6 py-4 bg-white/5 backdrop-blur-sm placeholder-purple-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium transition-all duration-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <motion.input
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="w-full text-sm text-purple-300 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:font-medium file:bg-purple-700/30 file:text-white hover:file:bg-purple-700/50 transition-all duration-300 file:transition-all file:duration-300"
                />

                <div className="flex justify-end gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-700/50 text-white rounded-2xl hover:bg-gray-700/70 transition-all duration-300 backdrop-blur-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpload}
                    disabled={loading || !title || !videoFile}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      loading || !title || !videoFile
                        ? "bg-purple-400/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Uploading...
                      </div>
                    ) : (
                      "Create Reel"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Selector Modal */}
      <AnimatePresence>
        {showChatSelector && selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-blue-400/30 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Share Reel
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowChatSelector(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Share className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-gray-400 mb-2">Chat selector coming soon!</p>
                <p className="text-sm text-gray-500">
                  This will show your chat list to share the reel
                </p>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChatSelector(false)}
                  className="px-6 py-3 bg-gray-700/50 text-white rounded-2xl hover:bg-gray-600/50 transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Reels