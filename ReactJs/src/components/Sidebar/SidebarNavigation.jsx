import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import { useSelector } from 'react-redux';

export const navigationMenu = () => {
  const { auth } = useSelector((store) => store);
  const userId = auth.user?.id;

  return [
    {
      title: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      title: "Reels",
      icon: <ExploreIcon />,
      path: "/reels",
    },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
    {
      title: "Message",
      icon: <MessageIcon />,
      path: "/message",
    },
    {
      title: "Lists",
      icon: <ListAltIcon />,
      path: "/lists",
    },
    {
      title: "Communities",
      icon: <GroupIcon />,
      path: "/communities",
    },
    {
      title: "Profile",
      icon: <AccountCircleIcon />,
      path: `/profile/${userId}`,
    },
  ];
}; 