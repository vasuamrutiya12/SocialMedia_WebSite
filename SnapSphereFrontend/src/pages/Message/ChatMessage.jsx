// ChatMessage.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Dialog } from "@mui/material";

const ChatMessage = ({ message, isOwnMessage }) => {
  const [open, setOpen] = useState(false);

  const handleImageClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
        mb={2}
        px={2}
      >
        <Paper
          elevation={1}
          sx={{
            maxWidth: "65%",
            p: 1,
            borderRadius: 3,
            borderTopLeftRadius: isOwnMessage ? 12 : 0,
            borderTopRightRadius: isOwnMessage ? 0 : 12,
            backgroundColor: isOwnMessage ? "#A4D2F5" : "#E2EAF4",
            color: "#1a1a1a",
            wordBreak: "break-word",
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
          }}
        >
          {message.image && (
            <Box
              component="img"
              src={message.image}
              alt="uploaded"
              onClick={handleImageClick}
              sx={{
                width: "100%",
                maxHeight: 250,
                borderRadius: 2,
                objectFit: "cover",
                mb: 1,
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            />
          )}

          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#2a2a2a",
            }}
          >
            {message.content}
          </Typography>
        </Paper>
      </Box>

      {/* 🖼️ Image Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box
          component="img"
          src={message.image}
          alt="enlarged"
          sx={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 2,
          }}
        />
      </Dialog>
    </>
  );
};

export default ChatMessage;
