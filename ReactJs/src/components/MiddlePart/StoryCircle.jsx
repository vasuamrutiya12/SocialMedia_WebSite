import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const StoryCircle = ({ username, avatarUrl, seen = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 1,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: 66,
          height: 66,
          borderRadius: "50%",
          padding: "2px",
          background: seen
            ? "rgba(255, 255, 255, 0.3)"
            : "linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 60,
            height: 60,
            border: "2px solid #111827",
          }}
        />
      </Box>
      <Typography
        variant="caption"
        noWrap
        sx={{ maxWidth: 70, mt: 0.5, color: "#e5e7eb", textAlign: "center" }}
      >
        {username}
      </Typography>
    </Box>
  );
};

export default StoryCircle;
