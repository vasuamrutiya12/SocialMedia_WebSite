import React, { useState } from "react";
import { 
  Avatar, 
  Button, 
  CardHeader, 
  Box, 
  Typography, 
  Chip 
} from "@mui/material";
import { red, blue, green, purple, orange } from "@mui/material/colors";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';

const users = [
  { name: "Code with Vasu", username: "@codewithhvasu", color: red[500], specialty: "Frontend Dev" },
  { name: "Sarah Johnson", username: "@sarahj_dev", color: blue[500], specialty: "UI/UX Designer" },
  { name: "Mike Chen", username: "@mikechen_ai", color: green[500], specialty: "AI Engineer" },
  { name: "Lisa Wong", username: "@lisawong_data", color: purple[500], specialty: "Data Scientist" },
  { name: "Alex Rivera", username: "@alexr_mobile", color: orange[500], specialty: "Mobile Dev" }
];

let userIndex = 0;

const PopularUserCard = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const user = users[userIndex % users.length];
  userIndex++;

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.9)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: `linear-gradient(90deg, ${user.color}, transparent)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover::before": {
          opacity: 1,
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar 
          sx={{ 
            bgcolor: user.color,
            width: 48,
            height: 48,
            fontSize: "20px",
            fontWeight: 600,
            boxShadow: `0 4px 12px ${user.color}40`,
            border: "2px solid white",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: `0 6px 16px ${user.color}60`,
            }
          }}
        >
          {user.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box
          sx={{
            position: "absolute",
            bottom: -2,
            right: -2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#4ade80",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(74, 222, 128, 0.4)"
          }}
        />
      </Box>

      <Box sx={{ flex: 1, ml: 2, minWidth: 0 }}>
        <Typography 
          sx={{ 
            fontSize: "15px", 
            fontWeight: 600, 
            color: "rgba(0, 0, 0, 0.8)",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {user.name}
        </Typography>
        <Typography 
          sx={{ 
            fontSize: "13px", 
            color: "rgba(0, 0, 0, 0.5)",
            fontWeight: 500,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {user.username}
        </Typography>
        <Chip
          label={user.specialty}
          size="small"
          sx={{
            height: "20px",
            fontSize: "10px",
            fontWeight: 600,
            background: `${user.color}15`,
            color: user.color,
            border: `1px solid ${user.color}30`,
            "& .MuiChip-label": {
              padding: "0 8px"
            }
          }}
        />
      </Box>

      <Button
        variant={isFollowing ? "contained" : "outlined"}
        size="small"
        onClick={handleFollowClick}
        startIcon={isFollowing ? <CheckIcon /> : <PersonAddIcon />}
        sx={{
          minWidth: isFollowing ? "100px" : "80px",
          height: "32px",
          borderRadius: "16px",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "none",
          transition: "all 0.3s ease",
          ...(isFollowing ? {
            background: user.color,
            color: "white",
            "&:hover": {
              background: user.color,
              opacity: 0.9,
              transform: "scale(0.98)"
            }
          } : {
            color: user.color,
            borderColor: user.color,
            background: `${user.color}10`,
            "&:hover": {
              background: user.color,
              color: "white",
              transform: "scale(1.02)",
              boxShadow: `0 4px 12px ${user.color}40`
            }
          })
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Box>
  );
};

export default PopularUserCard;