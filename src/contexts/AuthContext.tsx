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
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  const checkExpiry = (
    accessToken: string | null,
    refreshToken: string | null
  ) => {
    if (accessToken && refreshToken) {
      try {
        const accessDecoded: any = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (accessDecoded.exp < currentTime) {
          refreshTokenRequest(refreshToken);
        } else {
          setIsLoggedIn(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error decoding access token", error);
        setIsLoggedIn(false);
        setLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  };
  const { accessToken, refreshToken } = getTokens();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkExpiry(accessToken, refreshToken);
    console.log(isLoggedIn);
  }, [accessToken, refreshToken]);

  const refreshTokenRequest = async (refreshToken: string) => {
    console.log(refreshToken);
    const refreshDecoded: any = jwtDecode(refreshToken);
    const currentTime = Date.now() / 1000;
    if (refreshDecoded.exp < currentTime) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      try {
        const response = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const { access, refresh } = response.data;
        setTokens(access, refresh);
        setIsLoggedIn(true);
        setLoading(false);
        console.log("refreshed");
      } catch (error) {
        console.error("Failed to refresh token", error);
        setIsLoggedIn(false);
        setLoading(false);
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
  return {
    isLoggedIn,
    login,
    logout,
    loading,
  };
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
