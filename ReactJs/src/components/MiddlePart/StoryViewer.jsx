import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StoryViewer = ({ open, handleClose, stories, activeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
    
  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isVideo = (mediaUrl) => {
    if (!mediaUrl) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => mediaUrl.toLowerCase().includes(ext));
  };

  const renderMedia = (mediaUrl, style = {}) => {
    if (isVideo(mediaUrl)) {
      return (
        <video
          src={mediaUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style
          }}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    } else {
      return (
        <img
          src={mediaUrl}
          alt="story"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style
          }}
        />
      );
    }
  };

  const story = stories[currentIndex];

  if (!story) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth 
    PaperProps={{
        sx: {
          backgroundColor: "transparent", // full transparent background
          boxShadow: "none",              // removes default shadow
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "transparent", // Remove dark backdrop
        },
      }}>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          height: "90vh",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        {currentIndex > 0 && (
          <Box
            onClick={handlePrev}
            sx={{
              width: "130px",
              height: "80%",
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {renderMedia(stories[currentIndex - 1].video, { opacity: 0.6 })}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(0,0,0,0.5)",
                px: 1,
                borderRadius: 1,
                color: "#fff",
                fontSize: 12,
              }}
            >
              {stories[currentIndex - 1].username}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            flex: "0 1 360px",
            height: "640px",
            background: "#000",
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "4px 10px",
              borderRadius: "16px",
              zIndex: 2,
            }}
          >
            <Avatar
              src={`https://i.pravatar.cc/150?img=${currentIndex + 4}`}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant="body2" color="white">
              {story.username}
            </Typography>
          </Box>

          {renderMedia(story.video)}

          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              px: 2,
            }}
          >
            <TextField
              fullWidth
              placeholder={`Reply to ${story.username}...`}
              variant="outlined"
              size="small"
              sx={{
                bgcolor: "#ffffffdd",
                borderRadius: 5,
              }}
            />
          </Box>
        </Box>

        {currentIndex < stories.length - 1 && (
          <Box
            onClick={handleNext}
            sx={{
              width: "130px",
              height: "80%",
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {renderMedia(stories[currentIndex + 1].video, { opacity: 0.6 })}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(0,0,0,0.5)",
                px: 1,
                borderRadius: 1,
                color: "#fff",
                fontSize: 12,
              }}
            >
              {stories[currentIndex + 1].username}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;