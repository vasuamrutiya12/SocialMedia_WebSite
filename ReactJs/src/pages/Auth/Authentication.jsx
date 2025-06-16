"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLocation, Link } from "react-router-dom"
import { Users, Heart, MessageCircle, Share2, Camera, Zap, Sparkles, Instagram, Star, Waves, Orbit } from "lucide-react"
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

  const floatingElements = [
    { size: "w-2 h-2", color: "bg-purple-400/30", delay: 0 },
    { size: "w-3 h-3", color: "bg-pink-400/20", delay: 1 },
    { size: "w-1 h-1", color: "bg-blue-400/40", delay: 2 },
    { size: "w-4 h-4", color: "bg-yellow-400/25", delay: 3 },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Instagram social media interface"
        />
        {/* Animated Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70"
        />
        {/* Mesh Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fillOpacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
        />
      </motion.div>

      {/* Floating Social Icons with Enhanced Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {socialIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-60`}
            style={item.position}
            initial={{ opacity: 0, scale: 0, rotate: -180, y: 50 }}
            animate={{
              opacity: [0, 0.8, 0.4, 0.8],
              scale: [0, 1.3, 0.9, 1.1],
              rotate: [-180, 0, 15, -5, 0],
              y: [50, -30, 10, -20, 0],
            }}
            transition={{
              duration: 5,
              delay: item.delay,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.5, rotate: 360 }}
          >
            <item.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-2xl filter" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 150, -50, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-60 h-60 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-32 h-32 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -120, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.color} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: element.delay + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Enhanced Branding */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 flex-col justify-center items-start p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-lg"
          >
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-4 mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/30"
                />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
                >
                  SocialConnect
                </motion.h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1"
                />
              </div>
            </motion.div>

            {/* Enhanced Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight text-white"
            >
              Connect, Share, and{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Discover
              </motion.span>{" "}
              Amazing Stories
            </motion.h2>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed"
            >
              Join millions of people sharing their moments, connecting with friends, and discovering new communities
              around the world. Experience the future of social media.
            </motion.p>

            {/* Enhanced Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6 mb-8"
            >
              {[
                { icon: Users, text: "2M+ Active Users", color: "text-green-400" },
                { icon: Sparkles, text: "Trending Now", color: "text-yellow-400" },
                { icon: Zap, text: "Lightning Fast", color: "text-blue-400" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </motion.div>
                  <span className="text-white/70 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { value: "50M+", label: "Posts Shared", color: "from-purple-400 to-pink-400" },
                { value: "1B+", label: "Connections", color: "from-blue-400 to-cyan-400" },
                { value: "24/7", label: "Support", color: "from-green-400 to-emerald-400" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.2, type: "spring" }}
                    className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Enhanced Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Brand Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-8 md:hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center space-x-3"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 40px rgba(236, 72, 153, 0.5)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  SocialConnect
                </h1>
              </motion.div>
            </motion.div>

            {/* Enhanced Glassmorphism Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden group"
            >
              {/* Enhanced Animated Border */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(0deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
                    "linear-gradient(90deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
                    "linear-gradient(180deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))",
                    "linear-gradient(270deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl p-[1px]"
              >
                <div className="w-full h-full bg-black/20 backdrop-blur-2xl rounded-3xl" />
              </motion.div>

              {/* Floating Particles inside card */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Enhanced Form Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={isRegister ? "register" : "login"}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="text-2xl lg:text-3xl font-bold text-white mb-3"
                    >
                      {isRegister ? (
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Join SocialConnect
                        </span>
                      ) : (
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          Welcome Back
                        </span>
                      )}
                    </motion.h2>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isRegister ? "register-desc" : "login-desc"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/70 text-sm lg:text-base"
                    >
                      {isRegister
                        ? "Create your account and start connecting with amazing people"
                        : "Sign in to continue your social journey and connect with friends"}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isRegister ? "register-form" : "login-form"}
                    initial={{ opacity: 0, x: isRegister ? 50 : -50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: isRegister ? -50 : 50, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {isRegister ? <Register /> : <Login />}
                  </motion.div>
                </AnimatePresence>

                {/* Enhanced Toggle Link */}
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white/70 text-sm"
                      >
                        Already have an account?{" "}
                        <Link
                          className="text-purple-300 hover:text-purple-200 font-semibold transition-all duration-300 hover:underline underline-offset-4 relative group"
                          to="/login"
                        >
                          Sign In
                          <motion.span
                            className="absolute inset-0 bg-purple-400/20 rounded-lg -z-10"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </Link>
                      </motion.p>
                    ) : (
                      <motion.p
                        key="register-link"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white/70 text-sm"
                      >
                        Don't have an account?{" "}
                        <Link
                          className="text-purple-300 hover:text-purple-200 font-semibold transition-all duration-300 hover:underline underline-offset-4 relative group"
                          to="/register"
                        >
                          Join Now
                          <motion.span
                            className="absolute inset-0 bg-purple-400/20 rounded-lg -z-10"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </Link>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-6 pt-6 border-t border-white/20 text-center"
                >
                  <div className="flex items-center justify-center space-x-6 text-xs text-white/60">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                      <span>Secure & Safe</span>
                    </motion.div>
                    <div className="w-1 h-1 bg-white/30 rounded-full" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2"
                    >
                      <Users className="w-3 h-3" />
                      <span>2M+ Happy Users</span>
                    </motion.div>
                    <div className="w-1 h-1 bg-white/30 rounded-full" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Lightning Fast</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication