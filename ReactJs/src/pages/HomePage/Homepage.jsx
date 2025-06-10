// import React, { useEffect } from "react";
// import { Box, CssBaseline, Grid, useMediaQuery, useTheme } from "@mui/material";
// import { useLocation, useMatch } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfileAction } from "../../Redux/Auth/auth.action";

// import Sidebar from "../../components/Sidebar/Sidebar";
// import MiddlePart from "../../components/MiddlePart/MiddlePart";
// import Profile from "../Profile/Profile";
// import HomeRight from "../../components/HomeRight/HomeRight";
// import Reels from "../Reels/Reels";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const matchProfile = useMatch("/profile/:userId");
//   const token = localStorage.getItem("token");

//   const isHome = location.pathname === "/";
//   const isReels = location.pathname.startsWith("/reels");

//   // Set center part padding
//   const centerPaddingX = isReels ? 0 : { xs: 0, sm: 20 };
//   const centerPaddingY = isReels ? 0 : 2;

//   // Decide which component to show in the middle
//   const currentView = () => {
//     if (isReels) return <Reels />;
//     if (matchProfile) return <Profile />;
//     return <MiddlePart />;
//   };

//   useEffect(() => {
//     if (token) dispatch(getProfileAction(token));
//   }, [dispatch, token]);

//   return (
//     <>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100dvh",
//           bgcolor: "#000",
//           display: "flex",
//           justifyContent: "center",
//           px: { xs: 0, sm: 2 },
//           color: "#fff",
//         }}
//       >
//         <Grid
//           container
//           spacing={2}
//           sx={{
//             maxWidth: "1900px",
//             height: "100dvh",
//             overflow: "hidden",
//             flexWrap: "nowrap",
//           }}
//         >
//           {/* Sidebar - hidden on mobile */}
//           {!isMobile && (
//             <Grid
//               item
//               lg={3}
//               sx={{
//                 borderRight: "1px solid #262626",
//                 height: "100%",
//                 mx: 10,
//                 px: 2,
//                 py: 3,
//                 bgcolor: "#000",
//               }}
//             >
//               <Sidebar />
//             </Grid>
//           )}

//           {/* Middle Part */}
//           <Grid
//             item
//             xs={12}
//             lg={isHome ? 6 : 9}
//             sx={{
//               overflowY: "auto",
//               height: "100%",
//               px: centerPaddingX,
//               py: centerPaddingY,
//               bgcolor: "#000",
//               "&::-webkit-scrollbar": {
//                 width: 6,
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "#333",
//                 borderRadius: 6,
//               },
//             }}
//           >
//             <Box key={location.pathname}>{currentView()}</Box>
//           </Grid>

//           {/* Right Panel - only on Home and not mobile */}
//           {isHome && !isMobile && (
//             <Grid
//               item
//               lg={3}
//               sx={{
//                 borderLeft: "1px solid #262626",
//                 height: "100%",
//                 px: 2,
//                 py: 3,
//                 bgcolor: "#000",
//               }}
//             >
//               <HomeRight />
//             </Grid>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default HomePage;




"use client"

import { useEffect } from "react"
import { useLocation, useMatch } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getProfileAction } from "../../Redux/Auth/auth.action"

import Sidebar from "../../components/Sidebar/Sidebar"
import MiddlePart from "../../components/MiddlePart/MiddlePart"
import Profile from "../Profile/Profile"
import HomeRight from "../../components/HomeRight/HomeRight"
import Reels from "../Reels/Reels"

const HomePage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const matchProfile = useMatch("/profile/:userId")
  const token = localStorage.getItem("token")

  const isHome = location.pathname === "/"
  const isReels = location.pathname.startsWith("/reels")

  // Decide which component to show in the middle
  const currentView = () => {
    if (isReels) return <Reels />
    if (matchProfile) return <Profile />
    return <MiddlePart />
  }

  useEffect(() => {
    if (token) dispatch(getProfileAction(token))
  }, [dispatch, token])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-center px-0 sm:px-2">
        <div className="flex w-full max-w-[1900px] h-screen overflow-hidden">
          {/* Sidebar - hidden on mobile and tablet */}
          <div className="hidden lg:flex lg:w-80 xl:w-96 border-r border-gray-700 h-full px-4 py-6 bg-black flex-shrink-0">
            <Sidebar />
          </div>

          {/* Middle Part */}
          <div
            className={`
              flex-1 h-full overflow-y-auto bg-black
              ${isReels ? "px-0 py-0" : "px-0 sm:px-8 py-2"}
              scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
            `}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 transparent",
            }}
          >
            <div
              key={location.pathname}
              className="w-full"
              style={{
                WebkitScrollbar: {
                  width: "6px",
                },
                WebkitScrollbarThumb: {
                  backgroundColor: "#4B5563",
                  borderRadius: "6px",
                },
                WebkitScrollbarTrack: {
                  backgroundColor: "transparent",
                },
              }}
            >
              {currentView()}
            </div>
          </div>

          {/* Right Panel - only on Home and not mobile/tablet */}
          {isHome && (
            <div className="hidden lg:flex lg:w-80 xl:w-96 border-l border-gray-700 h-full px-4 py-6 bg-black flex-shrink-0">
              <HomeRight />
            </div>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #6B7280;
        }
      `}</style>
    </div>
  )
}

export default HomePage
