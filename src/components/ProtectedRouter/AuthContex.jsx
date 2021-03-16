import React from "react";

export const AuthContex = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setUser] = React.useState(null);

  return (
    <AuthContex.Provider value={{ currentUser }}>
      {children}
    </AuthContex.Provider>
  );
}
