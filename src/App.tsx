import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SearchResultsPage,
} from "./pages";
import NavBar from "./components/NavBar";
import axios from "axios";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ComparePage from "./pages/ComparePage";
import { Box, Text } from "@chakra-ui/react";
import { GoogleLoadingPage } from "./components/GoogleLogin";
import WishlistPage from "./pages/WishlistPage";
import SmoothScrolling from "./utils/SmoothScrolling";

//axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "https://tower-of-god.onrender.com";
axios.defaults.withCredentials = true;

interface Post {
  title: string;
  body: string;
}

function App() {
  return (
    <AuthProvider>
      <Box position="sticky" top="0px" zIndex="1">
        <NavBar />
      </Box>
      <Box zIndex="0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/google" element={<GoogleLoadingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/products/*" element={<ProductDetailsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Box>
    </AuthProvider>
  );
}
export default App;
