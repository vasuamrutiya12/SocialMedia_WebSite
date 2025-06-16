import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(88, 199, 250)",
    },
    secondary: {
      main: "#5A20CB",
    },
    background: {
      main: "#212534",
      default: "#212534",
      paper: "#212534",
    },
  },
});
