import React from "react";
import { Footer } from "shared/Footer/footer";
import { Header } from "../shared/Header/header";

export function AppContainer({ children }) {
  return (
    <div className="app_container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
