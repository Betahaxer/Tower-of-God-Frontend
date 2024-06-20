import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SearchResultsPage,
} from "./pages";
import { useLocation } from "react-router-dom";
import NavBarTemplate from "./components/NavBarTemplate";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

interface Post {
  title: string;
  body: string;
}

function App() {
  return (
    <AuthProvider>
      <NavBarTemplate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
