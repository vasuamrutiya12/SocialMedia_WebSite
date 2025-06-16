"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, TrendingUp, UserPlus, X, RefreshCw, Sparkles, Star, Zap, Heart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getUserSuggestions, followUserSuggestion } from "../../Redux/Suggestions/suggestions.action"
import { searchUser } from "../../Redux/Auth/auth.action"

const trendingTopics = [
  { tag: "#TechTalk", posts: "45K", color: "from-blue-400 to-cyan-400" },
  { tag: "#WebDevelopment", posts: "32K", color: "from-green-400 to-emerald-400" },
  { tag: "#ReactJS", posts: "28K", color: "from-purple-400 to-pink-400" },
  { tag: "#AI", posts: "67K", color: "from-orange-400 to-red-400" },
  { tag: "#Coding", posts: "89K", color: "from-yellow-400 to-orange-400" },
]

const HomeRight = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const { suggestions, loading: suggestionsLoading } = useSelector((state) => state.suggestions || { suggestions: [], loading: false })
  const { searchUser: searchResults } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserSuggestions())
  }, [dispatch])

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        dispatch(searchUser(searchQuery))
      }, 300)
      return () => clearTimeout(debounceTimer)
    }
  }, [searchQuery, dispatch])

  const handleFollowUser = (userId) => {
    dispatch(followUserSuggestion(userId))
  }

  const handleRefreshSuggestions = () => {
    dispatch(getUserSuggestions())
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 h-full w-full relative"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-5 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Search Section */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group"
      >
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            >
              <Search className="h-5 w-5 text-white/50" />
            </motion.div>
            <input
              type="text"
              placeholder="Search amazing people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
            />
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-4 w-4 text-white/50 hover:text-white/80 transition-colors" />
              </motion.button>
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchQuery && searchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 max-h-60 overflow-y-auto"
              >
                {searchResults.slice(0, 5).map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src={user.profile || `https://ui-avatars.com/api/?name=${user.firstName}&background=random`}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all"
                      />
                      <div>
                        <p className="text-white font-medium text-sm">{user.firstName} {user.lastName}</p>
                        <p className="text-gray-400 text-xs">@{user.firstName?.toLowerCase()}_{user.lastName?.toLowerCase()}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFollowUser(user.id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      Follow
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Suggestions Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all duration-300 group overflow-hidden"
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
          className="absolute inset-0 rounded-2xl"
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Users className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold text-base flex items-center gap-2">
                  Suggestions for You
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </h3>
                <p className="text-gray-400 text-sm">People you might know</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefreshSuggestions}
                disabled={suggestionsLoading}
                className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${suggestionsLoading ? 'animate-spin' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
              >
                View All
              </motion.button>
            </div>
          </div>

          {/* User Suggestions */}
          <div className="space-y-3">
            {suggestionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                />
              </div>
            ) : suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 text-gray-400"
              >
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No suggestions available</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {suggestions.slice(0, 5).map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5"
                          >
                            <img
                              src={user.profile || `https://ui-avatars.com/api/?name=${user.firstName}&background=random`}
                              alt={user.firstName}
                              className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                            />
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {user.mutualFollowers ? `${user.mutualFollowers} mutual followers` : 'Suggested for you'}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFollowUser(user.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                      >
                        <UserPlus className="w-3 h-3" />
                        Follow
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>

      {/* Trending Topics Card */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-white/20 transition-all duration-300 group overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                Trending Now
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </h3>
              <p className="text-gray-400 text-sm">What's happening</p>
            </div>
          </div>

          <div className="space-y-3">
            {trendingTopics.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 4, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                  {/* Trending indicator */}
                  <motion.div
                    className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${trend.color}`}
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  />
                  
                  <div className="flex items-center justify-between ml-3">
                    <div>
                      <p className={`text-white font-medium text-sm group-hover:bg-gradient-to-r group-hover:${trend.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                        {trend.tag}
                      </p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {trend.posts} posts
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2.5 text-blue-400 hover:text-blue-300 text-sm font-medium border border-blue-500/20 rounded-xl hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
          >
            Show more trends
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl"
        />

        <div className="relative z-10">
          <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
            Quick Stats
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 bg-white/5 rounded-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors"
              >
                2.5M
              </motion.div>
              <div className="text-xs text-gray-400">Active Users</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-3 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors"
              >
                150K
              </motion.div>
              <div className="text-xs text-gray-400">Posts Today</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HomeRight