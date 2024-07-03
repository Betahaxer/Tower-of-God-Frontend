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
import { AuthProvider } from "./contexts/AuthContext";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ComparePage from "./pages/ComparePage";
import { Box } from "@chakra-ui/react";
import { GoogleLoadingPage } from "./components/GoogleLogin";

axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.baseURL = "https://tower-of-god.onrender.com";
axios.defaults.withCredentials = true;

interface Post {
  title: string;
  body: string;
}

function App() {
  return (
    <AuthProvider>
      <Box position="sticky" top="0px" zIndex={9999}>
        <NavBar />
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/google" element={<GoogleLoadingPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/products/*" element={<ProductDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
