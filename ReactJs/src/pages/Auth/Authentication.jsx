"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLocation, Link } from "react-router-dom"
import { Users, Heart, MessageCircle, Share2, Camera, Zap, Sparkles, Instagram, Star } from "lucide-react"
import Login from "./Login"
import Register from "./Register"

const Authentication = () => {
  const location = useLocation()
  const isRegister = location.pathname === "/register"

  const socialIcons = [
    { icon: Heart, delay: 0, color: "text-red-400", position: { top: "10%", left: "15%" } },
    { icon: MessageCircle, delay: 0.5, color: "text-blue-400", position: { top: "20%", right: "40%" } },
    { icon: Share2, delay: 1, color: "text-green-400", position: { bottom: "30%", left: "10%" } },
    { icon: Camera, delay: 1.5, color: "text-purple-400", position: { top: "60%", right: "35%" } },
    { icon: Users, delay: 2, color: "text-yellow-400", position: { bottom: "20%", right: "45%" } },
    { icon: Zap, delay: 2.5, color: "text-pink-400", position: { top: "40%", left: "8%" } },
    { icon: Star, delay: 3, color: "text-indigo-400", position: { bottom: "15%", left: "20%" } },
    { icon: Sparkles, delay: 3.5, color: "text-cyan-400", position: { top: "25%", left: "35%" } },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
      <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Instagram social media interface"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60" />
        {/* Additional Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      </div>

      {/* Floating Social Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {socialIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-60`}
            style={item.position}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.6],
              scale: [0, 1.2, 0.8, 1],
              rotate: [-180, 0, 10, 0],
              y: [0, -20, 0, -10, 0],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 6,
              ease: "easeInOut",
            }}
          >
            <item.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-lg" />
          </motion.div>
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content Container - Split Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding and Info */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 flex-col justify-center items-start p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-pink-500/50 transition-all duration-300">
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                SocialConnect
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 leading-tight text-white"
            >
              Connect, Share, and Discover Amazing Stories
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-white/80 mb-8 leading-relaxed"
            >
              Join millions of people sharing their moments, connecting with friends, and discovering new communities
              around the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70">2M+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-white/70">Trending Now</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50M+</div>
                <div className="text-sm text-white/60">Posts Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1B+</div>
                <div className="text-sm text-white/60">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/60">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Brand Header - Only visible on mobile */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-6 md:hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center hover:shadow-pink-500/50 transition-all duration-300">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  SocialConnect
                </h1>
              </motion.div>
            </motion.div>

            {/* Glassmorphism Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Additional blur effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />

              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 p-[1px]">
                <div className="w-full h-full bg-transparent rounded-3xl" />
              </div>

              <div className="relative z-10">
                {/* Form Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={isRegister ? "register" : "login"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      {isRegister ? "Join SocialConnect" : "Welcome Back"}
                    </motion.h2>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isRegister ? "register-desc" : "login-desc"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/70 text-sm"
                    >
                      {isRegister
                        ? "Create your account and start connecting"
                        : "Sign in to continue your social journey"}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isRegister ? "register-form" : "login-form"}
                    initial={{ opacity: 0, x: isRegister ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRegister ? -50 : 50 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {isRegister ? <Register /> : <Login />}
                  </motion.div>
                </AnimatePresence>

                {/* Toggle Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-6 text-center"
                >
                  <AnimatePresence mode="wait">
                    {isRegister ? (
                      <motion.p
                        key="login-link"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white/70 text-sm"
                      >
                        Already have an account?{" "}
                        <Link
                          className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 hover:underline underline-offset-4"
                          to="/login"
                        >
                          Sign In
                        </Link>
                      </motion.p>
                    ) : (
                      <motion.p
                        key="register-link"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-white/70 text-sm"
                      >
                        Don't have an account?{" "}
                        <Link
                          className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 hover:underline underline-offset-4"
                          to="/register"
                        >
                          Join Now
                        </Link>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-6 pt-6 border-t border-white/20 text-center"
                >
                  <div className="flex items-center justify-center space-x-4 text-xs text-white/60">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Secure</span>
                    </div>
                    <div className="w-1 h-1 bg-white/30 rounded-full" />
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>2M+ Users</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating particles inside card */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 w-1 h-1 bg-purple-300/30 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    delay: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
