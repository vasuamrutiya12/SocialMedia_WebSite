// import React from "react";
// import SearchUser from "../SearchUser/SearchUser";
// import PopularUserCard from "./PopularUserCard";
// import { Card, Box, Typography, Button } from "@mui/material";
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';

// const popularUser = [1, 2, 3, 4, 5];

// const HomeRight = () => {
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
//       {/* Search Section */}
//       <SearchUser />
      
//       {/* Suggestions Card */}
//       <Card
//         elevation={0}
//         sx={{
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           borderRadius: "24px",
//           padding: "24px",
//           position: "relative",
//           overflow: "hidden",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "linear-gradient(180deg, #000000, rgba(135, 60, 255, 0.3))",
//             zIndex: -1,
//           }
//         }}
//       >
//         {/* Header */}
//         <Box 
//           sx={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             mb: 3,
//             pb: 2,
//             borderBottom: "1px solid rgba(102, 126, 234, 0.1)"
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box
//               sx={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "12px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
//               }}
//             >
//               <PeopleIcon sx={{ color: "white", fontSize: "20px" }} />
//             </Box>
//             <Box>
//               <Typography 
//                 sx={{ 
//                   fontSize: "16px",
//                   fontWeight: 700,
//                   color: "#fff",
//                   lineHeight: 1.2
//                 }}
//               >
//                 Suggestions for You
//               </Typography>
//               <Typography 
//                 sx={{ 
//                   fontSize: "12px",
//                   color: "rgba(102, 126, 234, 0.7)",
//                   fontWeight: 500
//                 }}
//               >
//                 People you might know
//               </Typography>
//             </Box>
//           </Box>
          
//           <Button
//             variant="text"
//             sx={{
//               fontSize: "12px",
//               fontWeight: 600,
//               color: "#667eea",
//               padding: "6px 12px",
//               borderRadius: "12px",
//               textTransform: "none",
//               background: "rgba(102, 126, 234, 0.1)",
//               border: "1px solid rgba(102, 126, 234, 0.2)",
//               "&:hover": {
//                 background: "rgba(102, 126, 234, 0.15)",
//                 transform: "translateY(-1px)",
//                 boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)"
//               },
//               transition: "all 0.3s ease"
//             }}
//           >
//             View All
//           </Button>
//         </Box>

//         {/* User Suggestions */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {popularUser.map((item, index) => (
//             <Box
//               key={index}
//               sx={{
//                 animation: `slideInRight 0.5s ease ${index * 0.1}s both`,
//                 "@keyframes slideInRight": {
//                   "0%": {
//                     opacity: 0,
//                     transform: "translateX(20px)"
//                   },
//                   "100%": {
//                     opacity: 1,
//                     transform: "translateX(0)"
//                   }
//                 }
//               }}
//             >
//               <PopularUserCard />
//             </Box>
//           ))}
//         </Box>
//       </Card>

//       {/* Trending Topics Card */}
//       <Card
//         elevation={0}
//         sx={{
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           borderRadius: "24px",
//           padding: "24px",
//           position: "relative",
//           overflow: "hidden",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%)",
//             zIndex: -1,
//           }
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
//           <Box
//             sx={{
//               width: 40,
//               height: 40,
//               borderRadius: "12px",
//               background: "linear-gradient(135deg, #764ba2 0%, #f093fb 100%)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 4px 12px rgba(240, 147, 251, 0.3)"
//             }}
//           >
//             <TrendingUpIcon sx={{ color: "white", fontSize: "20px" }} />
//           </Box>
//           <Box>
//             <Typography 
//               sx={{ 
//                 fontSize: "16px",
//                 fontWeight: 700,
//                 color: "rgba(0, 0, 0, 0.8)",
//                 lineHeight: 1.2
//               }}
//             >
//               Trending Now
//             </Typography>
//             <Typography 
//               sx={{ 
//                 fontSize: "12px",
//                 color: "rgba(118, 75, 162, 0.7)",
//                 fontWeight: 500
//               }}
//             >
//               What's happening
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {["#TechTalk", "#WebDevelopment", "#ReactJS", "#AI", "#Coding"].map((trend, index) => (
//             <Box
//               key={index}
//               sx={{
//                 padding: "12px 16px",
//                 borderRadius: "16px",
//                 background: "rgba(118, 75, 162, 0.05)",
//                 border: "1px solid rgba(118, 75, 162, 0.1)",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   background: "rgba(118, 75, 162, 0.1)",
//                   transform: "translateX(4px)",
//                   boxShadow: "0 4px 12px rgba(118, 75, 162, 0.2)"
//                 }
//               }}
//             >
//               <Typography 
//                 sx={{ 
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   color: "#764ba2"
//                 }}
//               >
//                 {trend}
//               </Typography>
//               <Typography 
//                 sx={{ 
//                   fontSize: "12px",
//                   color: "rgba(0, 0, 0, 0.6)",
//                   mt: 0.5
//                 }}
//               >
//                 {Math.floor(Math.random() * 50) + 10}K posts
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default HomeRight;



"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Users, TrendingUp, UserPlus, X } from "lucide-react"

const popularUser = [1, 2, 3, 4, 5]
const trendingTopics = [
  { tag: "#TechTalk", posts: "45K" },
  { tag: "#WebDevelopment", posts: "32K" },
  { tag: "#ReactJS", posts: "28K" },
  { tag: "#AI", posts: "67K" },
  { tag: "#Coding", posts: "89K" },
]

const HomeRight = () => {
  const [searchQuery, setSearchQuery] = useState("")

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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
          >
            View All
          </motion.button>
        </div>

        {/* User Suggestions */}
        <div className="space-y-3">
          {popularUser.map((item, index) => (
            <motion.div
              key={index}
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
                        src={`https://i.pravatar.cc/150?img=${index + 10}`}
                        alt={`User ${index + 1}`}
                        className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">user_{index + 1}</p>
                    <p className="text-gray-400 text-xs">Suggested for you</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  <UserPlus className="w-3 h-3" />
                  Follow
                </motion.button>
              </div>
            </motion.div>
          ))}
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
