import { AuthAPI } from "components/Auth/auth";
import React from "react";

export const AuthContex = React.createContext();

export function AuthProvider({ children }) {
  const auth = new AuthAPI();
  return (
    <AuthContex.Provider value={{ currentUser: auth.user }}>
      {children}
    </AuthContex.Provider>
  );
}
