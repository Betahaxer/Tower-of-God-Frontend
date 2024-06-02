import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SearchResultsPage,
} from "./pages";
import { useLocation } from "react-router-dom";
import WithSubnavigation from "./components/NavBarTemplate";
import axios from "axios";
import { useState, useEffect } from "react";

//axios.defaults.baseURL = "http://127.0.0.1:8000";

interface Post {
  title: string;
  body: string;
}

function App() {
  // const location = useLocation();
  // const showNavBar = location.pathname !== "/";
  return (
    <>
      <WithSubnavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default App;
