import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/auth/profile", {
        headers: { "x-auth-token": token }
      }).then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
