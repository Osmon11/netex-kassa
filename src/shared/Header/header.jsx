import { AppBar, Container, Toolbar } from "@material-ui/core";
import React from "react";
import logo from "assets/logo.png";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared";

export function Header() {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#18191D",
        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <Container>
        <Toolbar style={{ padding: "10px 0" }}>
          <div
            className="flex_box"
            style={{
              justifyContent: "space-between",
              width: "100%",
              maxHeight: 65,
            }}
          >
            <span className="flex_box">
              <NavLink to="/" className="nav_link">
                <img src={logo} alt="logo" />
              </NavLink>
              <p className="p_1" style={{ marginLeft: 10 }}>
                Excepteur sint
                <br /> occaecat cupidatat
                <br /> non proident
              </p>
            </span>

            <NavLink to="/documentation" className="nav_link">
              Документация
            </NavLink>
            <NavLink to="/about-us" className="nav_link">
              О нас
            </NavLink>
            <NavLink to="/rates" className="nav_link">
              Тарифы
            </NavLink>

            <span className="flex_box">
              <GoldButton style={{ minWidth: 90 }} outlined>
                Вход
              </GoldButton>
              <p className="nav_link" style={{ marginLeft: 10 }}>
                Регистрация
              </p>
            </span>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
