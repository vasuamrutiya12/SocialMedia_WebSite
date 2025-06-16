"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Avatar,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Modal,
} from "@mui/material"
import { Settings, Grid, Bookmark, Tag, Users, Heart, MessageCircle, Sparkles, Star } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersPostAction } from "../../Redux/Post/post.action"
import ProfileModel from "./ProfileModel"
import PostCard from "../../components/Post/PostCard"

const Profile = () => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState("post")
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const { auth, post } = useSelector((store) => store)
  const closePost = () => setSelectedPost(null)
  
  const handleImageClick = (postItem) => {
    setSelectedPost(postItem)
  }

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getUsersPostAction(auth.user.id))
    }
  }, [auth.user?.id])

  const fullName = `${auth.user?.firstName ?? ""} ${auth.user?.lastName ?? ""}`
  const username = `@${auth.user?.firstName?.toLowerCase()}_${auth.user?.lastName?.toLowerCase()}`

  const handleChange = (_, newValue) => setTab(newValue)

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          variants={itemVariants}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 overflow-hidden"
        >
          {/* Header Background Effect */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl"
          />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              {/* Profile Picture */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 rounded-full p-1">
                  <Avatar
                    src={auth.user?.profile}
                    alt={fullName}
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: "4px solid black",
                    }}
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-full border-2 border-dashed border-white/30"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-black rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                  >
                    {auth.user?.username || username}
                  </motion.h1>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpen(true)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                    >
                      Edit Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                    >
                      View Archive
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
                    >
                      <Settings className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start gap-8 mb-6">
                  {[
                    { label: "posts", value: post.posts.length, icon: Grid },
                    { label: "followers", value: "420", icon: Users },
                    { label: "following", value: "445", icon: Heart },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={statsVariants}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="text-center group cursor-pointer"
                    >
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <stat.icon className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                        <span className="text-xl lg:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm capitalize group-hover:text-white transition-colors">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h2 className="text-lg font-semibold flex items-center gap-2 justify-center lg:justify-start">
                    {fullName}
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </h2>
                  <p className="text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                    जय हिन्द, जय भारत 🇮🇳<br />
                    जय श्री राम 🚩<br />
                    <span className="text-purple-400">✨ Creating amazing content</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          variants={itemVariants}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Highlights
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {[...Array(3)].map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/20 rounded-full flex items-center justify-center mb-2 group-hover:border-purple-400 transition-all duration-300">
                  <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 group-hover:text-pink-400 transition-colors" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                  Highlight {idx + 1}
                </span>
              </motion.div>
            ))}
            {/* Add Highlight */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex-shrink-0 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-black/20 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center mb-2 group-hover:border-purple-400 transition-all duration-300">
                <span className="text-2xl text-white/50 group-hover:text-purple-400 transition-colors">+</span>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">New</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-2 mb-8"
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            centered
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '12px',
                margin: '0 4px',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: 'rgba(168, 85, 247, 0.2)',
                },
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab 
              value="post" 
              label={
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4" />
                  Posts
                </div>
              } 
            />
            <Tab 
              value="saved" 
              label={
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Saved
                </div>
              } 
            />
            <Tab 
              value="tagged" 
              label={
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tagged
                </div>
              } 
            />
          </Tabs>
        </motion.div>

        {/* Posts Grid */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {tab === "post" && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {post.posts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl"
                  >
                    <Grid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet</h3>
                    <p className="text-gray-500">Start sharing your amazing moments!</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.posts.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group"
                        onClick={() => handleImageClick(item)}
                      >
                        {item.video ? (
                          <video
                            src={item.video}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={item.img}
                            alt="post"
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              <span className="font-semibold">{item.liked?.length || 0}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageCircle className="w-5 h-5" />
                              <span className="font-semibold">{item.comments?.length || 0}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <Modal
              open={Boolean(selectedPost)}
              onClose={closePost}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
              >
                <PostCard item={selectedPost} />
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Profile Edit Modal */}
        <ProfileModel open={open} handleClose={() => setOpen(false)} />
      </div>
    </motion.div>
  )
}

export default Profile