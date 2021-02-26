import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import "./style.css";
import logo from "assets/logo.png";
import ava from "assets/avatar.png";

const drawerWidth = 280;

export function Admin() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const projects = ["Netex.kg", "Bironex", "Интернет магазин Kivano"];

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar style={{ paddingLeft: "15%" }}>
          <div className="flex_box">
            <span className="subtitle">Азим Дженалиев</span>
            <Avatar alt="" src={ava} style={{ marginLeft: 20 }} />
            <Button
              variant="outlined"
              className={classes.customButton}
              style={{ marginLeft: 20 }}
            >
              Выйти
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <span
          className="flex_box"
          style={{ flexDirection: xs ? "column" : "row" }}
        >
          <img
            src={logo}
            style={{ height: sm ? 36 : "", width: 150 }}
            alt="logo"
          />
          <p
            className="p_1"
            style={{
              margin: xs ? 0 : "0 0 0 10px",
              fontSize: 10,
            }}
          >
            Excepteur sint
            <br /> occaecat cupidatat
            <br /> non proident
          </p>
        </span>

        <p className="subtitle">Проекты</p>
        <ul className="projects">
          {projects.map((value) => (
            <li key={value}>
              <span className="project_link">{value}</span>
            </li>
          ))}
          <li>
            <span className="subtitle" style={{ cursor: "pointer" }}>
              + Создать новый проект
            </span>
          </li>
        </ul>

        <p className="subtitle">История операций</p>
        <p className="subtitle">Настройки</p>
      </Drawer>

      <section
        style={{ marginTop: 65, width: "100%", paddingLeft: 40 }}
      ></section>

      <div className="bg3_image" />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexDirection: "row-reverse",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5);",
    backgroundColor: "transparent",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(270deg, #2A2B31 0%, #18191D 100%), #C4C4C4",
    padding: 20,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  customButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 300,
    border: "1px solid #fff",
    borderRadius: 8,
  },
}));
