import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken, setupInterceptors } from "../api/api";

interface User {
  userId: string;
  role: "USER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): User => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return {
    userId: payload.userId,
    role: payload.role,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (jwt: string) => {
    const decoded = decodeToken(jwt);
    setToken(jwt);
    setUser(decoded);
    setAuthToken(jwt);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext must be used inside provider");
  return ctx;
};