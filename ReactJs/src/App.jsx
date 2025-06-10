import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Auth/Authentication";
import Message from "./pages/Message/Message";
import HomePage from "./pages/HomePage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./Redux/store";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/DarkTheme";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch=useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getProfileAction(token));
  }, [token]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/" element={auth.user ? <HomePage /> : <Authentication />} />
      <Route
        path="/reels"
        element={auth.user ? <HomePage /> : <Authentication />}
      />
      <Route
        path="/profile/:userId"
        element={auth.user ? <HomePage /> : <Authentication />}
      />
      <Route
        path="/message"
        element={auth.user ? <Message /> : <Authentication />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </ThemeProvider>
    
  );
}

export default App;
