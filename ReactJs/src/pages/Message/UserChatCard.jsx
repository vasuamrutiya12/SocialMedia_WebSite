import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizicon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const { message, auth } = useSelector((store) => store);
  return (
    <Card
      sx={{
        backgroundColor: "#191c29",
        borderRadius: "1rem",
        boxShadow: "none",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: "1.3rem",
              bgcolor: "#2f334d",
              color: "#58c7fa",
            }}
            src=""
          />
        }
        action={
          <IconButton>
            <MoreHorizicon sx={{ color: "#aaa" }} />
          </IconButton>
        }
        title={
          <span className="text-white text-[1rem] font-semibold">
            {auth.user.id === chat.users[0].id
              ? chat.users[1].firstName + " " + chat.users[1].lastName
              : chat.users[0].firstName + " " + chat.users[0].lastName}
          </span>
        }
        subheader={<span className="text-gray-400 text-sm">New message</span>}
      />
    </Card>
  );
};

export default UserChatCard;
