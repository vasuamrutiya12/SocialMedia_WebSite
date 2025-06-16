"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { navigationMenu } from "./SidebarNavigation.jsx"
import { Link, useLocation } from "react-router-dom"
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material"
import { MoreVertical, LogOut, Sparkles, Zap } from "lucide-react"
import { useSelector } from "react-redux"
import NotificationBell from "../Notifications/NotificationBell"

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { auth } = useSelector((store) => store)
  const location = useLocation()
  const menuItems = navigationMenu()

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="h-full bg-gradient-to-b from-black/60 via-gray-900/40 to-black/60 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col justify-between p-6 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 rounded-3xl"
      />

      <div className="relative z-10">
        {/* Enhanced Header */}
        <motion.div variants={logoVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="flex items-center space-x-3 mb-2"
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
              className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              >
                SocialConnect
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-purple-300/80 text-xs font-medium tracking-wider uppercase flex items-center gap-2"
          >
            <Zap className="w-3 h-3" />
            Connect • Share • Inspire
          </motion.p>
        </motion.div>

        {/* Enhanced Navigation */}
        <motion.nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={item.path} className="block">
                  <div
                    className={`
                      flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden group
                      ${active 
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 shadow-lg shadow-purple-500/20" 
                        : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon with animation */}
                    <motion.div
                      animate={active ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`text-xl ${active ? "text-purple-400" : "group-hover:text-purple-400"} transition-colors`}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Text */}
                    <span className={`font-medium ${active ? "font-semibold" : ""} transition-all`}>
                      {item.title}
                    </span>
                    
                    {/* Notification Bell for Notifications item */}
                    {item.title === "Notifications" && (
                      <div className="ml-auto">
                        <NotificationBell />
                      </div>
                    )}

                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>
      </div>

      {/* Enhanced Footer / User Info */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 pt-6 border-t border-white/10"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
        >
          {/* Enhanced Avatar */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5"
            >
              <Avatar
                alt="User Avatar"
                src={
                  auth.user?.profile ||
                  `https://ui-avatars.com/api/?name=${auth.user?.firstName}&background=random`
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid black",
                }}
              />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"
            />
          </div>
          
          {/* User Info */}
          <div className="flex-1 overflow-hidden">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-semibold text-white text-sm truncate group-hover:text-purple-300 transition-colors"
            >
              {auth.user?.firstName} {auth.user?.lastName}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-purple-300/80 text-xs font-medium"
            >
              @{auth.user?.firstName?.toLowerCase()}_{auth.user?.lastName?.toLowerCase()}
            </motion.p>
          </div>
          
          {/* Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>

          {/* Enhanced Menu */}
          <AnimatePresence>
            {open && (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: motion.div,
                  initial: { opacity: 0, scale: 0.8, y: -10 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: -10 },
                  transition: { duration: 0.2 },
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                    mt: 1,
                    color: "#fff",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleLogout}
                  component={motion.div}
                  whileHover={{ scale: 1.02, x: 5 }}
                  sx={{
                    display: "flex",
                    gap: 2,
                    px: 3,
                    py: 2,
                    borderRadius: "12px",
                    margin: "4px",
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                    },
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </MenuItem>
              </Menu>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar