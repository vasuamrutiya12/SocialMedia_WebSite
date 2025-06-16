"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Send, Bookmark, Share2, Download } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { likePostAction } from "../../Redux/Post/post.action"
import { isLikedByReqUser } from "../../utils/isLikeByReqUser"

const ReelActions = ({ reel, onShare, onSave }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector((store) => store)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleLike = () => {
    // For now, we'll use the post like action
    // You might want to create a separate reel like action
    dispatch(likePostAction(reel.id))
  }

  const handleSave = () => {
    setIsBookmarked(!isBookmarked)
    if (onSave) onSave(reel)
  }

  const handleShare = () => {
    setShowShareMenu(!showShareMenu)
  }

  const shareToChat = () => {
    if (onShare) onShare(reel)
    setShowShareMenu(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/reels/${reel.id}`)
    setShowShareMenu(false)
    // You might want to show a toast notification here
  }

  const downloadReel = () => {
    const link = document.createElement('a')
    link.href = reel.video
    link.download = `reel-${reel.id}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isLiked = reel.liked?.some(user => user.id === auth.user?.id) || false

  return (
    <div className="absolute right-3 top-3/4 transform -translate-y-1/2 flex flex-col items-center gap-6 text-white z-10">
      {/* Like Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center"
      >
        <button
          onClick={handleLike}
          className="transition-transform duration-200"
        >
          <Heart
            className={`w-8 h-8 mb-1 ${
              isLiked ? "text-red-500 fill-current" : "text-white"
            }`}
          />
        </button>
        <span className="text-xs font-medium">
          {reel.liked?.length || 0}
        </span>
      </motion.div>

      {/* Comment Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center"
      >
        <button className="transition-transform duration-200">
          <MessageCircle className="w-8 h-8 mb-1" />
        </button>
        <span className="text-xs font-medium">
          {reel.comments?.length || 0}
        </span>
      </motion.div>

      {/* Share Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center relative"
      >
        <button
          onClick={handleShare}
          className="transition-transform duration-200"
        >
          <Send className="w-8 h-8 mb-1" />
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute right-12 top-0 bg-black/80 backdrop-blur-md rounded-lg p-2 min-w-[120px]"
          >
            <button
              onClick={shareToChat}
              className="flex items-center space-x-2 w-full p-2 hover:bg-white/10 rounded text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to Chat</span>
            </button>
            <button
              onClick={copyLink}
              className="flex items-center space-x-2 w-full p-2 hover:bg-white/10 rounded text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
            <button
              onClick={downloadReel}
              className="flex items-center space-x-2 w-full p-2 hover:bg-white/10 rounded text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Save Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center"
      >
        <button
          onClick={handleSave}
          className="transition-transform duration-200"
        >
          <Bookmark
            className={`w-8 h-8 mb-1 ${
              isBookmarked ? "text-yellow-400 fill-current" : "text-white"
            }`}
          />
        </button>
      </motion.div>

      {/* Profile Picture */}
      <div className="mt-2">
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
      </div>
    </div>
  )
}

export default ReelActions