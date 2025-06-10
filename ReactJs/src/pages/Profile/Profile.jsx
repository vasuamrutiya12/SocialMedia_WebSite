import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  Modal,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPostAction } from "../../Redux/Post/post.action";
import ProfileModel from "./ProfileModel";
import PostCard from "../../components/Post/PostCard";

const Profile = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("post");
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { auth, post } = useSelector((store) => store);
  const theme = useTheme();
  const closePost = () => setSelectedPost(null);
  const handleImageClick = (postItem) => {
    setSelectedPost(postItem);
  };

  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getUsersPostAction(auth.user.id));
    }
  }, [auth.user?.id]);

  const fullName = `${auth.user?.firstName ?? ""} ${auth.user?.lastName ?? ""}`;
  const username = `@${auth.user?.firstName?.toLowerCase()}_${auth.user?.lastName?.toLowerCase()}`;

  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "#fff",
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 6,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        {/* Profile Header */}
        <Box
          sx={{
            display: "flex",
            gap: 6,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            mb: 5,
          }}
        >
          <Avatar
            src={auth.user?.profile}
            alt={fullName}
            sx={{
              width: 130,
              height: 130,
              boxShadow: "0 0 10px #111",
              border: "3px solid #444",
            }}
          />
          <Box flex={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {auth.user?.username || username}
              </Typography>
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#555",
                  textTransform: "none",
                  ":hover": { borderColor: "#888", bgcolor: "#111" },
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#555",
                  textTransform: "none",
                  ":hover": { borderColor: "#888", bgcolor: "#111" },
                }}
              >
                View Archive
              </Button>
              <IconButton>
                <SettingsOutlinedIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            {/* Stats */}
            <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
              <Typography>
                <strong>{post.posts.length}</strong> posts
              </Typography>
              <Typography>
                <strong>420</strong> followers
              </Typography>
              <Typography>
                <strong>445</strong> following
              </Typography>
            </Box>
            {/* Bio */}
            <Box mt={1}>
              <Typography fontWeight={600}>{fullName}</Typography>
              <Typography sx={{ whiteSpace: "pre-line", color: "#ccc" }}>
                जय हिन्द, जय भारत 🇮🇳{"\n"}जय श्री राम 🚩
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Highlights */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 4,
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "start" },
          }}
        >
          {[...Array(3)].map((_, idx) => (
            <Box key={idx} sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "#111",
                  border: "2px solid #666",
                  mx: "auto",
                  mb: 1,
                  boxShadow: "inset 0 0 5px #333",
                }}
              />
              <Typography variant="caption" color="#999">
                Highlight {idx + 1}
              </Typography>
            </Box>
          ))}
          {/* Add Highlight */}
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#1a1a1a",
                border: "2px dashed #555",
                mx: "auto",
                mb: 1,
              }}
            >
              +
            </Avatar>
            <Typography variant="caption" color="#999">
              New
            </Typography>
          </Box>
        </Box>

        {/* Tab Navigation */}
        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          centered
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab value="post" label="Posts" />
          <Tab value="saved" label="Saved" />
          <Tab value="tagged" label="Tagged" />
        </Tabs>

        {/* Posts Grid */}
        <Box mt={4}>
          {tab === "post" && (
            <>
              {post.posts.length === 0 ? (
                <Typography align="center" mt={4}>
                  No posts yet.
                </Typography>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 1,
                  }}
                >
                  {post.posts.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        width: "100%",
                        height: "200px",
                        cursor: "pointer",
                        overflow: "hidden",
                        borderRadius: "8px",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.02)" },
                      }}
                      onClick={() => handleImageClick(item)}
                    >
                      {item.video ? (
                        <video
                          src={item.video}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          muted
                          // optionally add controls or autoplay
                        />
                      ) : (
                        <img
                          src={item.img}
                          alt="post"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Post Modal */}
        <Modal
          open={Boolean(selectedPost)}
          onClose={closePost}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "95%", md: "27%" },
              bgcolor: "#111",
              borderRadius: "10px",
              boxShadow: 24,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {selectedPost && <PostCard item={selectedPost} />}
          </Box>
        </Modal>

        {/* Profile Edit Modal */}
        <ProfileModel open={open} handleClose={() => setOpen(false)} />
      </Box>
    </Box>
  );
};

export default Profile;
