// import React, { useEffect, useState } from "react";
// import { Avatar, Card, IconButton, Box, Typography, Chip } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { Dialog } from "@mui/material";
// import ImageIcon from "@mui/icons-material/Image";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import ArticleIcon from "@mui/icons-material/Article";
// import PostCard from "../Post/PostCard";
// import CreatePostModel from "../CreatePost/CreatePostModel";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPostAction } from "../../Redux/Post/post.action";
// import {
//   getAllStories,
//   markStoryWatched,
// } from "../../Redux/Story/story.actions";
// import CreateStoryDialog from "./CreateStoryDialog"; // Add your dialog component here
// import StoryCircle from "./StoryCircle";
// import StoryViewer from "./StoryViewer";

// const MiddlePart = () => {
//   const dispatch = useDispatch();
//   const { post } = useSelector((store) => store);
//   const { stories, watchedStoryIds } = useSelector((state) => state.story);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [openStoryViewer, setOpenStoryViewer] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openCreateStory, setOpenCreateStory] = useState(false);
//   const [openCreatePostModel, setOpenCreatePostModel] = useState(false);
//   const [activeStoryIndex, setActiveStoryIndex] = useState(0);

//   const handleOpenStory = (index) => {
//     const story = stories[index];
//     setActiveStoryIndex(index);
//     setSelectedStory(story);
//     setOpenStoryViewer(true);
//     dispatch(markStoryWatched(story.id));
//   };

//   const handleCloseCreatePostModel = () => setOpenCreatePostModel(false);

//   const handleCloseViewer = () => {
//     setOpenStoryViewer(false);
//     setSelectedStory(null);
//   };

//   const handleCloseCreateStory = () => {
//     setOpenCreateStory(false);
//   };

//   useEffect(() => {
//     dispatch(getAllPostAction());
//   }, [post.newComment]);

//   useEffect(() => {
//     dispatch(getAllStories());
//   }, []);
//   return (
//     <Box
//       sx={{
//         px: { xs: 2, sm: 5 },
//         py: { xs: 2, sm: 3 },
//         maxWidth: "600px",
//         margin: "0 auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         minHeight: "100vh",
//       }}
//     >
//        {/* Story Section */}
//        <Card
//         elevation={0}
//         sx={{
//           background: "transparent",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           borderRadius: "12px",
//           padding: "12px",
//           backdropFilter: "blur(10px)",
//           overflowX: "auto",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             overflowX: "auto",
//             pb: 1,
//             px: 1,
//             "&::-webkit-scrollbar": { display: "none" },
//             scrollbarWidth: "none",
//           }}
//         >
//           {/* Add Story Button */}
//           <Box
//             onClick={() => setOpenCreateStory(true)}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 66,
//                 height: 66,
//                 backgroundColor: "#262626",
//                 border: "2px solid #000",
//               }}
//             >
//               <AddIcon sx={{ color: "white" }} />
//             </Avatar>
//             <Typography variant="caption" sx={{ mt: 0.5, color: "#ccc" }}>
//               Your Story
//             </Typography>
//           </Box>

//           {/* Render Stories */}
//           <Box sx={{ display: "flex", overflowX: "auto", gap: 2 }}>
//             {stories.map((story, i) => (
//               <Box key={story.id} onClick={() => handleOpenStory(i)}>
//                 <StoryCircle
//                   username={`user_${i + 1}`}
//                   avatarUrl={`https://i.pravatar.cc/150?img=${i + 5}`}
//                   seen={watchedStoryIds?.includes(story.id)}
//                 />
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Card>

//       {/* Create Story Dialog */}
//       <CreateStoryDialog
//         open={openCreateStory}
//         handleClose={handleCloseCreateStory}
//       />

//       {/* Story Viewer Dialog (like Instagram) */}
//       <StoryViewer
//         open={openStoryViewer}
//         handleClose={handleCloseViewer}
//         stories={stories}
//         activeIndex={activeStoryIndex}
//       />

//       {/* Create Story Dialog */}
//       <CreateStoryDialog
//         open={openDialog}
//         handleClose={() => setOpenDialog(false)}
//       />
//       {/* Create Post */}
//       <Card
//         elevation={0}
//         sx={{
//           background: "rgba(17, 24, 39, 0.6)",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           borderRadius: "16px",
//           p: 2,
//           mb: 3,
//           backdropFilter: "blur(12px)",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//           <Avatar sx={{ width: 40, height: 40 }} />
//           <Box
//             component="input"
//             onClick={() => setOpenCreatePostModel(true)}
//             readOnly
//             placeholder="What's on your mind?"
//             sx={{
//               flex: 1,
//               px: 2,
//               py: 1,
//               borderRadius: "20px",
//               border: "1px solid rgba(255, 255, 255, 0.2)",
//               background: "rgba(255, 255, 255, 0.05)",
//               color: "#e5e7eb",
//               fontSize: 14,
//               cursor: "pointer",
//               "&:hover": {
//                 borderColor: "rgba(255, 255, 255, 0.4)",
//                 background: "rgba(255, 255, 255, 0.1)",
//               },
//               "&::placeholder": {
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           />
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           {[
//             { icon: <ImageIcon />, label: "Photo", color: "#4ade80" },
//             { icon: <VideocamIcon />, label: "Video", color: "#60a5fa" },
//             { icon: <ArticleIcon />, label: "Article", color: "#fbbf24" },
//           ].map((item, index) => (
//             <Chip
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               onClick={() => setOpenCreatePostModel(true)}
//               sx={{
//                 px: 2,
//                 height: 36,
//                 fontSize: 13,
//                 color: "#f3f4f6",
//                 background: "rgba(255, 255, 255, 0.08)",
//                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                 borderRadius: "18px",
//                 cursor: "pointer",
//                 "&:hover": {
//                   background: "rgba(255, 255, 255, 0.15)",
//                   transform: "scale(1.02)",
//                 },
//                 "& .MuiChip-icon": {
//                   color: item.color,
//                   fontSize: "18px",
//                 },
//               }}
//             />
//           ))}
//         </Box>
//       </Card>

//       {/* Posts */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {post.posts.map((item, index) => (
//           <Box
//             key={item.id || index}
//             sx={{
//               animation: `fadeInUp 0.4s ease ${index * 0.05}s both`,
//               "@keyframes fadeInUp": {
//                 "0%": { opacity: 0, transform: "translateY(20px)" },
//                 "100%": { opacity: 1, transform: "translateY(0)" },
//               },
//             }}
//           >
//             <PostCard item={item} />
//           </Box>
//         ))}
//       </Box>

//       {/* Create Post Dialog */}
//       <CreatePostModel
//         handleClose={handleCloseCreatePostModel}
//         open={openCreatePostModel}
//       />
//     </Box>
//   );
// };

// export default MiddlePart;




"use client"

import { useEffect, useState } from "react"
import { Plus, ImageIcon, Video, FileText } from "lucide-react"
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

  return (
    <div className="px-2 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col gap-4 lg:gap-6 min-h-screen">
      {/* Story Section */}
      <div className="bg-transparent border border-white/10 rounded-xl p-3 lg:p-4 backdrop-blur-sm overflow-x-auto">
        <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
          {/* Add Story Button */}
          <div
            onClick={() => setOpenCreateStory(true)}
            className="flex flex-col items-center cursor-pointer flex-shrink-0"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-700 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <span className="text-xs lg:text-sm text-gray-300 mt-1">Your Story</span>
          </div>

          {/* Render Stories */}
          <div className="flex overflow-x-auto gap-3 lg:gap-4 scrollbar-hide">
            {stories.map((story, i) => (
              <div key={story.id} onClick={() => handleOpenStory(i)} className="flex-shrink-0">
                <StoryCircle
                  username={`user_${i + 1}`}
                  avatarUrl={`https://i.pravatar.cc/150?img=${i + 5}`}
                  seen={watchedStoryIds?.includes(story.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Story Dialog */}
      <CreateStoryDialog open={openCreateStory} handleClose={handleCloseCreateStory} />

      {/* Story Viewer Dialog */}
      <StoryViewer
        open={openStoryViewer}
        handleClose={handleCloseViewer}
        stories={stories}
        activeIndex={activeStoryIndex}
      />

      {/* Create Story Dialog */}
      <CreateStoryDialog open={openDialog} handleClose={() => setOpenDialog(false)} />

      {/* Create Post */}
      <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-4 lg:p-6 mb-4 lg:mb-6 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
          <input
            onClick={() => setOpenCreatePostModel(true)}
            readOnly
            placeholder="What's on your mind?"
            className="flex-1 px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/20 bg-white/5 text-gray-200 text-sm lg:text-base cursor-pointer hover:border-white/40 hover:bg-white/10 transition-all placeholder-white/50 focus:outline-none"
          />
        </div>

        <div className="flex justify-between gap-2 lg:gap-4">
          {[
            { icon: <ImageIcon className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Photo", color: "text-green-400" },
            { icon: <Video className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Video", color: "text-blue-400" },
            { icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" />, label: "Article", color: "text-yellow-400" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setOpenCreatePostModel(true)}
              className="flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm text-gray-200 bg-white/8 border border-white/20 rounded-2xl cursor-pointer hover:bg-white/15 hover:scale-105 transition-all duration-200 flex-1 justify-center"
            >
              <span className={item.color}>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {post.posts.map((item, index) => (
          <div
            key={item.id || index}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: "both",
            }}
          >
            <PostCard item={item} />
          </div>
        ))}
      </div>

      {/* Create Post Dialog */}
      <CreatePostModel handleClose={handleCloseCreatePostModel} open={openCreatePostModel} />

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default MiddlePart
