import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import "./style.css";
import logo from "assets/logo.png";
import ava from "assets/avatar.png";
import { CreateProject } from "components/Dashboard";
import { NavLink, Route, Switch } from "react-router-dom";
import { VerticalStepper } from "components/Dashboard/VerticalStepper";
import { Settings } from "components/Dashboard/Settings";

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
            <IconButton style={{ marginLeft: 20 }}>
              <Avatar alt="" src={ava} />
            </IconButton>
            <Button
              variant="outlined"
              className={classes.customButton}
              style={{ marginLeft: 40 }}
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
            <NavLink
              to="/dashboard/create-project"
              style={{ textDecoration: "none" }}
            >
              <span className={classes.createProject}>
                + Создать новый проект
              </span>
            </NavLink>
          </li>
        </ul>

        <p className="subtitle">
          <NavLink to="/dashboard/operations" className="nav_link">
            История операций
          </NavLink>
        </p>
        <p className="subtitle">
          <NavLink to="/dashboard/settings" className="nav_link">
            Настройки
          </NavLink>
        </p>
      </Drawer>

      <section style={{ marginTop: 65, width: "100%", paddingLeft: 40 }}>
        <Switch>
          <Route exact path="/dashboard/settings" component={Settings} />
          <Route
            exact
            path="/dashboard/create-project"
            component={CreateProject}
          />
          <Route exact path="/dashboard/steps" component={VerticalStepper} />
        </Switch>
      </section>

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
  createProject: {
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    "&:hover": {
      color: "#ff9900",
    },
  },
}));
