import React from "react";
import { navigationMenu } from "./SidebarNavigation.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Card,
  Box,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import NotificationBell from "../Notifications/NotificationBell";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);
  const location = useLocation();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "95vh",
        background: "linear-gradient(180deg, #000000, rgba(135, 60, 255, 0.3))",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        border: "1px solid #374151",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: "26px",
              color: "#a78bfa",
              letterSpacing: "-0.5px",
            }}
          >
            Tech Social
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#c084fc",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.4px",
              opacity: 0.8,
            }}
          >
            CONNECT • SHARE • INSPIRE
          </Typography>
        </Box>

        {/* Navigation */}
        <Box component="nav" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navigationMenu.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <Link to={item.path} key={index} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: "12px 16px",
                    borderRadius: "12px",
                    color: active ? "#c084fc" : "#e5e7eb",
                    backgroundColor: active ? "rgba(167,139,250,0.1)" : "transparent",
                    border: active ? "1px solid rgba(167,139,250,0.3)" : "1px solid transparent",
                    fontWeight: active ? 600 : 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(167,139,250,0.1)",
                      transform: "translateX(2px)",
                    },
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ fontSize: 20 }}>{item.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
                    {item.title}
                  </Typography>
                  {item.title === "Notifications" && (
                    <Box sx={{ ml: "auto" }}>
                      <NotificationBell />
                    </Box>
                  )}
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>

      {/* Footer / User Info */}
      <Box sx={{ pt: 3, borderTop: "1px solid #374151", mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: "12px",
            backgroundColor: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.1)",
          }}
        >
          <Avatar
            alt="User Avatar"
            src={
              auth.user?.profile ||
              `https://ui-avatars.com/api/?name=${auth.user?.firstName}&background=random`
            }
            sx={{
              width: 42,
              height: 42,
              border: "2px solid rgba(167,139,250,0.4)",
              boxShadow: "0 2px 6px rgba(167,139,250,0.2)",
            }}
          />
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#e5e7eb",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {auth.user?.firstName} {auth.user?.lastName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#c084fc",
                opacity: 0.8,
                fontWeight: 500,
              }}
            >
              @{auth.user?.firstName?.toLowerCase()}_{auth.user?.lastName?.toLowerCase()}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClick}
            sx={{
              p: 1,
              color: "#c084fc",
              "&:hover": {
                backgroundColor: "rgba(167,139,250,0.1)",
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                mt: 1,
                color: "#fff",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{
                display: "flex",
                gap: 1,
                px: 2,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(167,139,250,0.1)",
                  color: "#c084fc",
                },
              }}
            >
              <LogoutIcon fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

export default Sidebar;