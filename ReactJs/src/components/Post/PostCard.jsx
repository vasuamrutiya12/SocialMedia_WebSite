// import React, { useState } from "react";
// import {
//   Avatar,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   IconButton,
//   Typography,
//   Box,
//   Divider,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import SendIcon from "@mui/icons-material/Send";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createCommnetAction,
//   likePostAction,
// } from "../../Redux/Post/post.action";
// import { isLikedByReqUser } from "../../utils/isLikeByReqUser";

// const PostCard = ({ item }) => {
//   const [showComments, setShowComments] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const dispatch = useDispatch();
//   const { post, auth } = useSelector((store) => store);

//   const handleShowComment = () => setShowComments(!showComments);

//   const handleCreateComment = (content) => {
//     if (!content.trim()) return;
//     const reqData = {
//       postId: item.id,
//       data: {
//         content: content.trim(),
//       },
//     };
//     dispatch(createCommnetAction(reqData));
//   };

//   const fullName = `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`;
//   const username = `${item.user?.firstName?.toLowerCase() ?? ""}_${
//     item.user?.lastName?.toLowerCase() ?? ""
//   }`;

//   const handleLikePost = () => {
//     dispatch(likePostAction(item.id));
//   };

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         background: "transparent",
//         border: "1px solid rgba(255, 255, 255, 0.1)",
//         borderRadius: "12px",
//         marginBottom: "20px",
//         backdropFilter: "blur(10px)",
//         overflow: "visible",
//       }}
//     >
//       {/* Header */}
//       <CardHeader
//         avatar={
//           <Avatar
//             src={item.user?.profile || ""}
//             sx={{
//               width: 32,
//               height: 32,
//               border: "1px solid rgba(255, 255, 255, 0.2)",
//             }}
//           >
//             {item.user?.firstName?.[0] || "U"}
//           </Avatar>
//         }
//         action={
//           <IconButton
//             aria-label="settings"
//             sx={{ color: "rgba(255, 255, 255, 0.8)" }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={
//           <Typography
//             variant="subtitle2"
//             sx={{
//               color: "rgba(255, 255, 255, 0.9)",
//               fontWeight: 600,
//               fontSize: "14px",
//             }}
//           >
//             {fullName}
//           </Typography>
//         }
//         subheader={
//           <Typography
//             variant="caption"
//             sx={{
//               color: "rgba(255, 255, 255, 0.6)",
//               fontSize: "12px",
//             }}
//           >
//             {username} • 22h
//           </Typography>
//         }
//         sx={{ paddingBottom: "8px" }}
//       />

//       {/* Post Media: Image or Video */}
//       {item.video ? (
//         <Box
//           sx={{
//             width: "calc(100% - 32px)",
//             height: "400px",
//             position: "relative",
//             overflow: "hidden",
//             borderRadius: "8px",
//             margin: "0 16px",
//           }}
//         >
//           <video
//             src={item.video}
//             controls
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               objectPosition: "center",
//               borderRadius: "8px",
//             }}
//           />
//         </Box>
//       ) : item.img ? (
//         <Box
//           sx={{
//             width: "calc(100% - 32px)",
//             height: "400px",
//             position: "relative",
//             overflow: "hidden",
//             borderRadius: "8px",
//             margin: "0 16px",
//           }}
//         >
//           <img
//             src={item.img}
//             alt="Post media"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               objectPosition: "center",
//               borderRadius: "8px",
//             }}
//           />
//         </Box>
//       ) : null}

//       {/* Actions */}
//       <CardActions
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "8px 16px",
//           paddingTop: "12px",
//         }}
//         disableSpacing
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <IconButton
//             onClick={handleLikePost}
//             sx={{
//               color: "rgba(255, 255, 255, 0.8)",
//               padding: "8px",
//               "&:hover": {
//                 background: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             {isLikedByReqUser(auth.user?.id, item) ? (
//               <FavoriteIcon sx={{ color: "#ed4956" }} />
//             ) : (
//               <FavoriteBorderIcon />
//             )}
//           </IconButton>
//           <IconButton
//             onClick={handleShowComment}
//             aria-label="comment"
//             sx={{
//               color: "rgba(255, 255, 255, 0.8)",
//               padding: "8px",
//               "&:hover": {
//                 background: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             <ChatBubbleOutlineIcon />
//           </IconButton>
//           <IconButton
//             aria-label="share"
//             sx={{
//               color: "rgba(255, 255, 255, 0.8)",
//               padding: "8px",
//               "&:hover": {
//                 background: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Box>
//         <IconButton
//           onClick={() => setIsBookmarked(!isBookmarked)}
//           aria-label="bookmark"
//           sx={{
//             color: "rgba(255, 255, 255, 0.8)",
//             padding: "8px",
//             "&:hover": {
//               background: "rgba(255, 255, 255, 0.1)",
//             },
//           }}
//         >
//           {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
//         </IconButton>
//       </CardActions>

//       {/* Likes Count */}
//       <Box sx={{ px: 2, pb: 1 }}>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "rgba(255, 255, 255, 0.9)",
//             fontWeight: 600,
//             fontSize: "14px",
//           }}
//         >
//           124,131 likes
//         </Typography>
//       </Box>

//       {/* Caption */}
//       <CardContent sx={{ paddingTop: 0, paddingBottom: "8px" }}>
//         <Typography
//           variant="body2"
//           sx={{
//             color: "rgba(255, 255, 255, 0.9)",
//             fontSize: "14px",
//             lineHeight: 1.4,
//           }}
//         >
//           <Typography
//             component="span"
//             sx={{
//               fontWeight: 600,
//               marginRight: "8px",
//             }}
//           >
//             {username}
//           </Typography>
//           {item.caption}
//         </Typography>
//       </CardContent>

//       {/* View Comments */}
//       {item.comments && item.comments.length > 0 && (
//         <Box sx={{ px: 2, pb: 1 }}>
//           <Typography
//             variant="body2"
//             onClick={handleShowComment}
//             sx={{
//               color: "rgba(255, 255, 255, 0.6)",
//               fontSize: "14px",
//               cursor: "pointer",
//               "&:hover": {
//                 color: "rgba(255, 255, 255, 0.8)",
//               },
//             }}
//           >
//             View all {item.comments.length} comments
//           </Typography>
//         </Box>
//       )}

//       {/* Comments Section */}
//       {showComments && (
//         <Box>
//           {/* Add Comment */}
//           <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
//             <Avatar
//               sx={{
//                 width: 24,
//                 height: 24,
//                 marginRight: 2,
//                 border: "1px solid rgba(255, 255, 255, 0.2)",
//               }}
//             />
//             <input
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleCreateComment(e.target.value);
//                   e.target.value = "";
//                 }
//               }}
//               placeholder="Add a comment..."
//               style={{
//                 width: "100%",
//                 background: "transparent",
//                 border: "none",
//                 outline: "none",
//                 color: "rgba(255, 255, 255, 0.8)",
//                 fontSize: "14px",
//                 padding: "8px 0",
//               }}
//             />
//           </Box>

//           <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

//           {/* Comments List */}
//           <Box sx={{ px: 2, py: 1, maxHeight: "200px", overflowY: "auto" }}>
//             {(item.comments || []).map((comment, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   mb: 1.5,
//                   "&:last-child": { mb: 0 },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 24,
//                     height: 24,
//                     mr: 1.5,
//                     fontSize: "12px",
//                     border: "1px solid rgba(255, 255, 255, 0.2)",
//                   }}
//                 >
//                   {comment.user?.firstName?.[0] || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255, 255, 255, 0.9)",
//                       fontSize: "14px",
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     <Typography
//                       component="span"
//                       sx={{
//                         fontWeight: 600,
//                         marginRight: "8px",
//                       }}
//                     >
//                       {comment.user?.firstName || "user"}
//                     </Typography>
//                     {comment.content}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}
//     </Card>
//   );
// };

// export default PostCard;

"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Pause } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { createCommnetAction, likePostAction } from "../../Redux/Post/post.action"
import { isLikedByReqUser } from "../../utils/isLikeByReqUser"

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullCaption, setShowFullCaption] = useState(false)
  const dispatch = useDispatch()
  const { post, auth } = useSelector((store) => store)

  const handleShowComment = () => setShowComments(!showComments)

  const handleCreateComment = (content) => {
    if (!content.trim()) return
    const reqData = {
      postId: item.id,
      data: {
        content: content.trim(),
      },
    }
    dispatch(createCommnetAction(reqData))
  }

  const fullName = `${item.user?.firstName ?? ""} ${item.user?.lastName ?? ""}`
  const username = `${item.user?.firstName?.toLowerCase() ?? ""}_${item.user?.lastName?.toLowerCase() ?? ""}`

  const handleLikePost = () => {
    dispatch(likePostAction(item.id))
  }

  const toggleVideoPlay = (e) => {
    e.preventDefault()
    const video = e.target.closest(".video-container").querySelector("video")
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const isLiked = isLikedByReqUser(auth.user?.id, item)
  const truncatedCaption = item.caption?.length > 100 ? item.caption.substring(0, 100) + "..." : item.caption

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
              <img
                src={item.user?.profile || `https://ui-avatars.com/api/?name=${fullName}&background=random`}
                alt={fullName}
                className="w-full h-full rounded-full object-cover bg-black border-2 border-black"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm hover:text-gray-300 cursor-pointer transition-colors">
              {fullName}
            </span>
            <span className="text-gray-400 text-xs">{username} • 22h</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Media */}
      {item.video ? (
        <div className="relative video-container group">
          <video src={item.video} className="w-full h-96 lg:h-[500px] object-cover" loop muted playsInline />
          <button
            onClick={toggleVideoPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-black/70 transition-colors">
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </div>
          </button>
        </div>
      ) : item.img ? (
        <div className="relative group">
          <img
            src={item.img || "/placeholder.svg"}
            alt="Post content"
            className="w-full h-96 lg:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : null}

      {/* Actions */}
      <div className="flex items-center justify-between p-4 pt-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLikePost}
            className={`transition-all duration-200 hover:scale-110 ${
              isLiked ? "text-red-500" : "text-white hover:text-gray-300"
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleShowComment}
            className="text-white hover:text-gray-300 transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-gray-300 transition-all duration-200 hover:scale-110">
            <Send className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`transition-all duration-200 hover:scale-110 ${
            isBookmarked ? "text-yellow-400" : "text-white hover:text-gray-300"
          }`}
        >
          <Bookmark className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-4 pb-2">
        <span className="text-white font-semibold text-sm">{item.likedByUsers?.length || 0} likes</span>
      </div>

      {/* Caption */}
      {item.caption && (
        <div className="px-4 pb-2">
          <div className="text-white text-sm leading-relaxed">
            <span className="font-semibold mr-2">{username}</span>
            <span className="text-gray-100">
              {showFullCaption ? item.caption : truncatedCaption}
              {item.caption?.length > 100 && (
                <button
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="text-gray-400 hover:text-gray-300 ml-1 transition-colors"
                >
                  {showFullCaption ? "less" : "more"}
                </button>
              )}
            </span>
          </div>
        </div>
      )}

      {/* View Comments */}
      {item.comments && item.comments.length > 0 && (
        <div className="px-4 pb-2">
          <button onClick={handleShowComment} className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
            View all {item.comments.length} comments
          </button>
        </div>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-white/10 bg-black/20">
          {/* Add Comment */}
          <div className="flex items-center p-4 border-b border-white/5">
            <img
              src={auth.user?.profile || `https://ui-avatars.com/api/?name=${auth.user?.firstName}&background=random`}
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover mr-3 border border-white/20"
            />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value)
                  e.target.value = ""
                }
              }}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold ml-3 transition-colors">
              Post
            </button>
          </div>

          {/* Comments List */}
          <div className="max-h-60 overflow-y-auto">
            {(item.comments || []).map((comment, index) => (
              <div key={index} className="flex items-start p-4 hover:bg-white/5 transition-colors">
                <img
                  src={
                    comment.user?.profile ||
                    `https://ui-avatars.com/api/?name=${comment.user?.firstName}&background=random`
                  }
                  alt={comment.user?.firstName}
                  className="w-8 h-8 rounded-full object-cover mr-3 border border-white/20 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm leading-relaxed">
                    <span className="font-semibold mr-2">{comment.user?.firstName || "user"}</span>
                    <span className="text-gray-100">{comment.content}</span>
                  </div>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-gray-400 text-xs">2h</span>
                    <button className="text-gray-400 hover:text-gray-300 text-xs font-medium transition-colors">
                      Reply
                    </button>
                    <button className="text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time stamp */}
      <div className="px-4 pb-4">
        <span className="text-gray-500 text-xs uppercase tracking-wide">22 hours ago</span>
      </div>
    </div>
  )
}

export default PostCard
