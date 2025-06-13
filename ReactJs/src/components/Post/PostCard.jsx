"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Pause, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { createCommnetAction, likePostAction } from "../../Redux/Post/post.action"
import { isLikedByReqUser } from "../../utils/isLikeByReqUser"

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullCaption, setShowFullCaption] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const dispatch = useDispatch()
  const { post, auth } = useSelector((store) => store)

  const handleShowComment = () => setShowComments(!showComments)

  const handleCreateComment = (content) => {
    if (!content.trim()) return
    const reqData = {
      postId: item.id,
      data: {
        content: content.trim(),
      },
    }
    dispatch(createCommnetAction(reqData))
  }

  const fullName = `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`
  const username = `${item.user?.firstName?.toLowerCase() ?? ""}_${item.user?.lastName?.toLowerCase() ?? ""}`

  const handleLikePost = async () => {
    setIsLiking(true)
    await dispatch(likePostAction(item.id))
    setTimeout(() => setIsLiking(false), 300)
  }

  const toggleVideoPlay = (e) => {
    e.preventDefault()
    const video = e.target.closest(".video-container").querySelector("video")
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const isLiked = isLikedByReqUser(auth.user?.id, item)
  const truncatedCaption = item.caption?.length > 100 ? item.caption.substring(0, 100) + "..." : item.caption

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mb-6 shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500 group"
    >
      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating Sparkles */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-4 right-4 z-10"
      >
        <Sparkles className="w-4 h-4 text-yellow-400/60" />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between p-4 pb-3"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                <img
                  src={item.user?.profile || `https://ui-avatars.com/api/?name=${fullName}&background=random`}
                  alt={fullName}
                  className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 blur-sm"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-white font-semibold text-sm hover:text-gray-300 cursor-pointer transition-colors"
              >
                {fullName}
              </motion.span>
              <span className="text-gray-400 text-xs">{username} • 22h</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <MoreHorizontal className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Post Media */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {item.video ? (
            <div className="relative video-container group">
              <video src={item.video} className="w-full h-96 lg:h-[500px] object-cover" loop muted playsInline />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleVideoPlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-black/70 transition-colors">
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </div>
              </motion.button>
            </div>
          ) : item.img ? (
            <div className="relative group overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={item.img || "/placeholder.svg"}
                alt="Post content"
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : null}
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between p-4 pt-3"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleLikePost}
              className={`relative transition-all duration-300 ${
                isLiked ? "text-red-500" : "text-white hover:text-gray-300"
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
              {isLiking && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 rounded-full bg-red-500/30"
                />
              )}
              {isLiked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </motion.div>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleShowComment}
              className="text-white hover:text-gray-300 transition-all duration-200"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.8 }}
              className="text-white hover:text-gray-300 transition-all duration-200"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`transition-all duration-300 ${
              isBookmarked ? "text-yellow-400" : "text-white hover:text-gray-300"
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </motion.div>

        {/* Likes Count */}
        <motion.div
          variants={itemVariants}
          className="px-4 pb-2"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-white font-semibold text-sm cursor-pointer"
          >
            {item.likedByUsers?.length || 0} likes
          </motion.span>
        </motion.div>

        {/* Caption */}
        {item.caption && (
          <motion.div
            variants={itemVariants}
            className="px-4 pb-2"
          >
            <div className="text-white text-sm leading-relaxed">
              <span className="font-semibold mr-2">{username}</span>
              <span className="text-gray-100">
                {showFullCaption ? item.caption : truncatedCaption}
                {item.caption?.length > 100 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowFullCaption(!showFullCaption)}
                    className="text-gray-400 hover:text-gray-300 ml-1 transition-colors font-medium"
                  >
                    {showFullCaption ? "less" : "more"}
                  </motion.button>
                )}
              </span>
            </div>
          </motion.div>
        )}

        {/* View Comments */}
        {item.comments && item.comments.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="px-4 pb-2"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              onClick={handleShowComment}
              className="text-gray-400 hover:text-gray-300 text-sm transition-all duration-200"
            >
              View all {item.comments.length} comments
            </motion.button>
          </motion.div>
        )}

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10 bg-black/20 backdrop-blur-sm"
            >
              {/* Add Comment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-4 border-b border-white/5"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={auth.user?.profile || `https://ui-avatars.com/api/?name=${auth.user?.firstName}&background=random`}
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover mr-3 border border-white/20"
                />
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateComment(e.target.value)
                      e.target.value = ""
                    }
                  }}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold ml-3 transition-colors"
                >
                  Post
                </motion.button>
              </motion.div>

              {/* Comments List */}
              <div className="max-h-60 overflow-y-auto">
                {(item.comments || []).map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 hover:bg-white/5 transition-colors"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={
                        comment.user?.profile ||
                        `https://ui-avatars.com/api/?name=${comment.user?.firstName}&background=random`
                      }
                      alt={comment.user?.firstName}
                      className="w-8 h-8 rounded-full object-cover mr-3 border border-white/20 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm leading-relaxed">
                        <span className="font-semibold mr-2">{comment.user?.firstName || "user"}</span>
                        <span className="text-gray-100">{comment.content}</span>
                      </div>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-gray-400 text-xs">2h</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="text-gray-400 hover:text-gray-300 text-xs font-medium transition-colors"
                        >
                          Reply
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time stamp */}
        <motion.div
          variants={itemVariants}
          className="px-4 pb-4"
        >
          <span className="text-gray-500 text-xs uppercase tracking-wide">22 hours ago</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PostCard