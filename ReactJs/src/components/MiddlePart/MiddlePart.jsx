"use client"

import { useEffect, useState } from "react"
import { Plus, ImageIcon, Video, FileText, Sparkles, Heart, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PostCard from "../Post/PostCard"
import CreatePostModel from "../CreatePost/CreatePostModel"
import { useDispatch, useSelector } from "react-redux"
import { getAllPostAction } from "../../Redux/Post/post.action"
import { getAllStories, markStoryWatched } from "../../Redux/Story/story.actions"
import CreateStoryDialog from "./CreateStoryDialog"
import StoryCircle from "./StoryCircle"
import StoryViewer from "./StoryViewer"

const MiddlePart = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((store) => store)
  const { stories, watchedStoryIds } = useSelector((state) => state.story)
  const [selectedStory, setSelectedStory] = useState(null)
  const [openStoryViewer, setOpenStoryViewer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCreateStory, setOpenCreateStory] = useState(false)
  const [openCreatePostModel, setOpenCreatePostModel] = useState(false)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)

  const handleOpenStory = (index) => {
    const story = stories[index]
    setActiveStoryIndex(index)
    setSelectedStory(story)
    setOpenStoryViewer(true)
    dispatch(markStoryWatched(story.id))
  }

  const handleCloseCreatePostModel = () => setOpenCreatePostModel(false)

  const handleCloseViewer = () => {
    setOpenStoryViewer(false)
    setSelectedStory(null)
  }

  const handleCloseCreateStory = () => {
    setOpenCreateStory(false)
  }

  useEffect(() => {
    dispatch(getAllPostAction())
  }, [post.newComment])

  useEffect(() => {
    dispatch(getAllStories())
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-2 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col gap-4 lg:gap-6 min-h-screen relative"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Story Section */}
      <motion.div
        variants={itemVariants}
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 lg:p-6 overflow-hidden"
      >
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 p-[1px]">
          <div className="w-full h-full bg-black/40 backdrop-blur-xl rounded-3xl" />
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Stories</span>
          </motion.div>
          
          <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {/* Add Story Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCreateStory(true)}
              className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
            >
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                  <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
                />
              </div>
              <span className="text-xs lg:text-sm text-gray-300 mt-2 group-hover:text-white transition-colors">Your Story</span>
            </motion.div>

            {/* Render Stories */}
            <div className="flex overflow-x-auto gap-3 lg:gap-4 scrollbar-hide">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleOpenStory(i)}
                  className="flex-shrink-0"
                >
                  <StoryCircle
                    username={`user_${i + 1}`}
                    avatarUrl={`https://i.pravatar.cc/150?img=${i + 5}`}
                    seen={watchedStoryIds?.includes(story.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create Post Section */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-gray-900/60 via-purple-900/20 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 lg:p-6 overflow-hidden group hover:border-white/20 transition-all duration-300"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, rgba(119, 255, 198, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl"
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 lg:gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">V</span>
            </motion.div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              onClick={() => setOpenCreatePostModel(true)}
              readOnly
              placeholder="What's on your mind? ✨"
              className="flex-1 px-4 lg:px-6 py-3 lg:py-4 rounded-full border border-white/20 bg-white/5 text-gray-200 text-sm lg:text-base cursor-pointer hover:border-white/40 hover:bg-white/10 transition-all placeholder-white/50 focus:outline-none backdrop-blur-sm"
            />
          </div>

          <div className="flex justify-between gap-2 lg:gap-4">
            {[
              { icon: <ImageIcon className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Photo", color: "from-green-400 to-emerald-500", hoverColor: "hover:shadow-green-400/25" },
              { icon: <Video className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Video", color: "from-blue-400 to-cyan-500", hoverColor: "hover:shadow-blue-400/25" },
              { icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Article", color: "from-yellow-400 to-orange-500", hoverColor: "hover:shadow-yellow-400/25" },
            ].map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenCreatePostModel(true)}
                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm text-white bg-gradient-to-r ${item.color} border border-white/20 rounded-2xl cursor-pointer transition-all duration-300 flex-1 justify-center ${item.hoverColor} hover:shadow-lg backdrop-blur-sm`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Posts Section */}
      <motion.div
        variants={containerVariants}
        className="flex flex-col gap-4 lg:gap-6 relative z-10"
      >
        <AnimatePresence>
          {post.posts.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300"
            >
              <PostCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Floating Action Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenCreatePostModel(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Dialogs */}
      <CreateStoryDialog open={openCreateStory} handleClose={handleCloseCreateStory} />
      <StoryViewer
        open={openStoryViewer}
        handleClose={handleCloseViewer}
        stories={stories}
        activeIndex={activeStoryIndex}
      />
      <CreatePostModel handleClose={handleCloseCreatePostModel} open={openCreatePostModel} />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  )
}

export default MiddlePart