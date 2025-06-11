"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Users, TrendingUp, UserPlus, X, RefreshCw } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getUserSuggestions, followUserSuggestion } from "../../Redux/Suggestions/suggestions.action"
import { searchUser } from "../../Redux/Auth/auth.action"

const trendingTopics = [
  { tag: "#TechTalk", posts: "45K" },
  { tag: "#WebDevelopment", posts: "32K" },
  { tag: "#ReactJS", posts: "28K" },
  { tag: "#AI", posts: "67K" },
  { tag: "#Coding", posts: "89K" },
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

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/50" />
          </div>
          <input
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <X className="h-4 w-4 text-white/50 hover:text-white/80 transition-colors" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && searchResults && searchResults.length > 0 && (
          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
            {searchResults.slice(0, 5).map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profile || `https://ui-avatars.com/api/?name=${user.firstName}&background=random`}
                    alt={user.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-xs">@{user.firstName?.toLowerCase()}_{user.lastName?.toLowerCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollowUser(user.id)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Follow
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Suggestions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">Suggestions for You</h3>
              <p className="text-gray-400 text-sm">People you might know</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No suggestions available</p>
            </div>
          ) : (
            suggestions.slice(0, 5).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5">
                        <img
                          src={user.profile || `https://ui-avatars.com/api/?name=${user.firstName}&background=random`}
                          alt={user.firstName}
                          className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{user.firstName} {user.lastName}</p>
                      <p className="text-gray-400 text-xs">
                        {user.mutualFollowers ? `${user.mutualFollowers} mutual followers` : 'Suggested for you'}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFollowUser(user.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    <UserPlus className="w-3 h-3" />
                    Follow
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Trending Topics Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">Trending Now</h3>
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
              whileHover={{ x: 4 }}
              className="group cursor-pointer"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                      {trend.tag}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{trend.posts} posts</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2.5 text-blue-400 hover:text-blue-300 text-sm font-medium border border-blue-500/20 rounded-xl hover:bg-blue-500/10 transition-all duration-300"
        >
          Show more trends
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold text-base mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">2.5M</div>
            <div className="text-xs text-gray-400">Active Users</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-white">150K</div>
            <div className="text-xs text-gray-400">Posts Today</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomeRight