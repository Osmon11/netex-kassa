import React from "react";
import { useSelector } from "react-redux";

export const AuthContex = React.createContext();

export function AuthProvider({ children }) {
  const user = useSelector((store) => store.reducer.user);
  return (
    <AuthContex.Provider value={{ currentUser: user }}>
      {children}
    </AuthContex.Provider>
  );
}
