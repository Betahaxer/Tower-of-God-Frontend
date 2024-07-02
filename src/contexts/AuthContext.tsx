import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { clearTokens, getTokens, setTokens } from "../utils/storage";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { accessToken, refreshToken } = getTokens();
    if (accessToken && refreshToken) {
      try {
        const accessDecoded: any = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (accessDecoded.exp < currentTime) {
          refreshTokenRequest(refreshToken);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decoding access token", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const refreshTokenRequest = async (refreshToken: string) => {
    console.log(refreshToken);
    const refreshDecoded: any = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    if (refreshDecoded.exp < currentTime) {
      setIsLoggedIn(false);
    } else {
      try {
        const response = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const { access, refresh } = response.data;
        setTokens(access, refresh);
        setIsLoggedIn(true);
        console.log("refreshed");
      } catch (error) {
        console.error("Failed to refresh token", error);
        setIsLoggedIn(false);
      }
    }
  };

  const login = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
