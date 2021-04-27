import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "./style.css";
import Logo from "../../shared/Logo/logo";
import ava from "assets/avatar.png";
import {
  CreateProject,
  ProjectSettings,
  WithdrawFunds,
  Settings,
  GetNewAdress,
} from "components/Dashboard";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleGetMerchantsAction } from "store/actions/merchants";
import { getProfile } from "store/actions/profile";
import { logout } from "store/actions/sign";

let drawerWidth = 280;

export function Admin() {
  const {state, merchants} = useSelector( store => ({
    state: store.reducer,
    merchants: store.merchants
  }))
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  // const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { firstname, lastname, avatar } = state.profileInfo
    ? state.profileInfo
    : { firstname: "Not", lastname: "Found", avatar: ava };

  useEffect(() => {
    dispatch(getProfile());
    dispatch(handleGetMerchantsAction())
    // if (!merchants.merchants.length > 0) {
    //   dispatch(handleGetMerchantsAction())
    // }
  }, [state.merchants, dispatch]);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function logoutHandler() {
    dispatch(
      logout(() => {
        history.push("/");
      })
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar style={{ paddingLeft: "15%" }}>
          <div className="flex_box">
            <span
              className="subtitle"
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              {`${firstname} ${lastname}`}
            </span>
            <IconButton style={{ marginLeft: 20 }} onClick={handleOpen}>
              <Avatar alt="" src={avatar} />
            </IconButton>
            <Button
              variant="outlined"
              className={classes.customButton}
              style={{ marginLeft: 40 }}
              onClick={logoutHandler}
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
          <NavLink to="/" className="nav_link" style={{position: 'Absolute', left: '0px', top: '70px'}}>
            <Logo />
          </NavLink>

        <p className="subtitle" style={{ marginTop: '150px' }}>
          Проекты
        </p>
        <ul className="projects">
          { merchants.get.success ? (
            merchants.merchants.map((merchant) => (
              <li key={merchant.merchant_id}>
                <Link
                  to={`/dashboard/project/${merchant.merchant_id}`}
                  className="project_link"
                >
                  {merchant.name}
                </Link>
              </li>
            ))
          ) :
            merchants.get.loading ? 
            <div className="flex_box">
              <CircularProgress />
            </div> : null
          }
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

      <section
        style={{
          marginTop: 130,
          width: "100%",
          padding: md ? "0 30px" : "0 90px",
        }}
      >
        <Switch>
          <Route
            exact
            path="/dashboard/project/:id"
            component={ProjectSettings}
          />
          <Route exact path="/dashboard/settings" component={Settings} />
          <Route
            exact
            path="/dashboard/create-project"
            component={CreateProject}
          />
          <Route
            exact
            path="/dashboard/withdrawal-of-funds"
            component={WithdrawFunds}
          />
          <Route
            exact
            path="/dashboard/get-new-adress"
            component={GetNewAdress}
          />
        </Switch>
      </section>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
      >
        <NavLink
          to="/dashboard/get-new-adress"
          style={{ textDecoration: "none" }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Получить новый адрес
          </MenuItem>
        </NavLink>
        <NavLink
          to="/dashboard/withdrawal-of-funds"
          style={{ textDecoration: "none" }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Вывод средств
          </MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    backgroundColor: "#1a1b20",
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
  menuItem: {
    color: "#ff9900",
    "&:hover": {
      backgroundColor: "#ff9900",
      color: "#fff",
    },
  },
}));
