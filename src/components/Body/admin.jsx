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
import logo from "assets/logo.png";
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
import { getMerchants, logout } from "store/reducer";

let drawerWidth = 280;

export function Admin() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = useSelector((store) => store.reducer.data);

  // useEffect(() => {
  //   if (!data) {
  //     dispatch(getMerchants());
  //   }
  // }, [data, dispatch]);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function logoutHandler() {
    dispatch(logout(() => history.push("/")));
  }
  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar style={{ paddingLeft: "15%" }}>
          <div className='flex_box'>
            <span
              className='subtitle'
              style={{ cursor: "pointer" }}
              onClick={handleOpen}
            >
              Азим Дженалиев
            </span>
            <IconButton style={{ marginLeft: 20 }} onClick={handleOpen}>
              <Avatar alt='' src={ava} />
            </IconButton>
            <Button
              variant='outlined'
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
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.toolbar} />
        <span
          className='flex_box'
          style={{ flexDirection: xs ? "column" : "row" }}
        >
          <NavLink to='/dashboard'>
            <img
              src={logo}
              style={{ height: sm ? 36 : "", width: 150 }}
              alt='logo'
            />
          </NavLink>
          <p
            className='p_1'
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

        <p className='subtitle' style={{ marginTop: 50 }}>
          Проекты
        </p>
        <ul className='projects'>
          {data ? (
            data.merchants.map((merchant, index) => (
              <li key={merchant.merchant_id}>
                <Link
                  to={`/dashboard/project/:${index}`}
                  className='project_link'
                >
                  {merchant.name}
                </Link>
              </li>
            ))
          ) : (
            <div className='flex_box'>
              <CircularProgress />
            </div>
          )}
          <li>
            <NavLink
              to='/dashboard/create-project'
              style={{ textDecoration: "none" }}
            >
              <span className={classes.createProject}>
                + Создать новый проект
              </span>
            </NavLink>
          </li>
        </ul>

        <p className='subtitle'>
          <NavLink to='/dashboard/operations' className='nav_link'>
            История операций
          </NavLink>
        </p>
        <p className='subtitle'>
          <NavLink to='/dashboard/settings' className='nav_link'>
            Настройки
          </NavLink>
        </p>
      </Drawer>

      <section
        style={{
          marginTop: 130,
          width: "100%",
          paddingRight: md ? 10 : "10%",
          paddingLeft: md ? 10 : 90,
        }}
      >
        <Switch>
          <Route
            exact
            path='/dashboard/project/:id'
            component={ProjectSettings}
          />
          <Route exact path='/dashboard/settings' component={Settings} />
          <Route
            exact
            path='/dashboard/create-project'
            component={CreateProject}
          />
          <Route
            exact
            path='/dashboard/withdrawal-of-funds'
            component={WithdrawFunds}
          />
          <Route
            exact
            path='/dashboard/get-new-adress'
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
          to='/dashboard/get-new-adress'
          style={{ textDecoration: "none" }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Получить новый адрес
          </MenuItem>
        </NavLink>
        <NavLink
          to='/dashboard/withdrawal-of-funds'
          style={{ textDecoration: "none" }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            Вывод средств
          </MenuItem>
        </NavLink>
      </Menu>
      <div className='bg3_image' />
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
    paddingRight: "10%",
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
  menuItem: {
    color: "#ff9900",
    "&:hover": {
      backgroundColor: "#ff9900",
      color: "#fff",
    },
  },
}));
