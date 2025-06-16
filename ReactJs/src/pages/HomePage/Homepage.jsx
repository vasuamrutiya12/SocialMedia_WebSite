"use client"

import { useEffect } from "react"
import { useLocation, useMatch } from "react-router-dom"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { getProfileAction } from "../../Redux/Auth/auth.action"

import Sidebar from "../../components/Sidebar/Sidebar"
import MiddlePart from "../../components/MiddlePart/MiddlePart"
import Profile from "../Profile/Profile"
import HomeRight from "../../components/HomeRight/HomeRight"
import Reels from "../Reels/Reels"
import NotificationPanel from "../../components/Notifications/NotificationPanel"

// Custom scrollbar styles
const scrollbarStyles = {
  scrollbarWidth: "thin",
  scrollbarColor: "#4B5563 transparent",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(to bottom, #8B5CF6, #EC4899)",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "linear-gradient(to bottom, #7C3AED, #DB2777)",
  },
}

const HomePage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const matchProfile = useMatch("/profile/:userId")
  const token = localStorage.getItem("token")

  const isHome = location.pathname === "/"
  const isReels = location.pathname.startsWith("/reels")
  const isNotifications = location.pathname === "/notifications"

  // Decide which component to show in the middle
  const currentView = () => {
    if (isReels) return <Reels />
    if (isNotifications) return <NotificationPanel isOpen={true} onClose={() => {}} />
    if (matchProfile) return <Profile />
    return <MiddlePart />
  }

  useEffect(() => {
    if (token) dispatch(getProfileAction(token))
  }, [dispatch, token])

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
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
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex justify-center px-0 sm:px-2"
      >
        <div className="flex w-full max-w-[1900px] h-screen overflow-hidden">
          {/* Sidebar - Enhanced with animations */}
          <motion.div
            variants={sectionVariants}
            className="hidden lg:flex lg:w-80 xl:w-96 border-r border-gray-700/50 h-full px-4 py-6 bg-black/20 backdrop-blur-xl flex-shrink-0 relative"
          >
            {/* Sidebar glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent" />
            <div className="relative z-10 w-full">
              <Sidebar />
            </div>
          </motion.div>

          {/* Middle Part - Enhanced with page transitions */}
          <motion.div
            variants={sectionVariants}
            className={`
              flex-1 h-full overflow-y-auto bg-black/10 backdrop-blur-sm relative
              ${isReels || isNotifications ? "px-0 py-0" : "px-0 sm:px-8 py-2"}
              scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
            `}
            style={scrollbarStyles}
          >
            {/* Content glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full relative z-10"
              >
                {currentView()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Enhanced with animations */}
          {isHome && !isNotifications && (
            <motion.div
              variants={sectionVariants}
              className="hidden lg:flex lg:w-80 xl:w-96 border-l border-gray-700/50 h-full px-4 py-6 bg-black/20 backdrop-blur-xl flex-shrink-0 relative"
            >
              {/* Right panel glow effect */}
              <div className="absolute inset-0 bg-gradient-to-l from-blue-500/5 to-transparent" />
              <div className="relative z-10 w-full">
                <HomeRight />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HomePage