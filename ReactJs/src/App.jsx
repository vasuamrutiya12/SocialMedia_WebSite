import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Auth/Authentication";
import Message from "./pages/Message/Message";
import HomePage from "./pages/HomePage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/DarkTheme";
import { useNotifications } from "./hooks/useNotifications";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  if (!token || !auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Initialize notifications
  useNotifications();

  useEffect(() => {
    if (token) {
      dispatch(getProfileAction(token));
    }
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!auth.user ? <Authentication /> : <Navigate to="/" />} />
        <Route path="/register" element={!auth.user ? <Authentication /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reels"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/message"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/communities"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;