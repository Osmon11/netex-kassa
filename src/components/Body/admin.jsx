import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "./style.css";
import Logo from "../../shared/Logo/logo";
import ava from "assets/avatar.png";
import goust from "assets/goust-icon.webp";
import success from "assets/success.svg";
import fail from "assets/fail.svg";
import pending from "assets/pending.svg";
import settings from "assets/settings.svg";
import trash from "assets/trash.svg";
import projectsIco from "assets/projects-ico-2.svg";
import historyIco from "assets/history-ico.svg";
import settingsIco from "assets/settings-ico.svg";
import withdrawIco from "assets/withdraw-ico.svg";
import {
  CreateProject,
  ProjectSettings,
  WithdrawFunds,
  Settings,
  GetNewAdress,
  ConfirmDeleteProject,
  OperationsHistory,
} from "components/Dashboard";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "store/actions/profile";
import { logout } from "store/actions/sign";
import { GoldButton } from "shared/Buttons/buttons";
import { AppAxios } from "store/actions/sign";
import { getCurrencies, getMerchants } from "store/reducer";
import { setData, setUser } from "store/actionCreators";
import { initialState } from "store/initialState";
import cookie from "cookie_js";
import OperationDetail from "components/Dashboard/OperationDetail";

let drawerWidth = 300;
export function logoutHandler(dispatch) {
  cookie.remove("user", "token");
  dispatch(setUser(false));
  dispatch(
    logout(() => {
      dispatch(setData(initialState));
    })
  );
}

export function Admin() {
  const { state, merchants } = useSelector((store) => ({
    state: store.reducer,
    merchants: store.reducer,
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { firstname, lastname, avatar } = state.profileInfo
    ? state.profileInfo
    : { firstname: "Not", lastname: "Found", avatar: ava };

  useEffect(() => {
    if (!state.profileInfo) {
      dispatch(getProfile());
    }
    if (!merchants.merchants) {
      dispatch(getMerchants());
    }
    if (!state.currencies) {
      dispatch(getCurrencies());
    }
  }, [state.profileInfo, state.currencies, merchants.merchants, dispatch]);

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar style={{ paddingLeft: "15%" }}>
          <div className='flex_box'>
            <span
              className='subtitle'
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/dashboard/settings")}
            >
              {`${firstname} ${lastname}`}
            </span>
            <IconButton
              style={{ marginLeft: 20 }}
              onClick={() => history.push("/dashboard/settings")}
            >
              <Avatar alt='' src={avatar} />
            </IconButton>
            <Button
              variant='outlined'
              className={classes.customButton}
              style={{ marginLeft: 40 }}
              onClick={() => logoutHandler(dispatch)}
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
        <NavLink to='/' className='nav_link'>
          <Logo />
        </NavLink>
        <p className='subtitle' style={{ margin: "30px 0 0" }}>
          <NavLink
            exact
            to='/dashboard'
            className='nav_link flex_box'
            style={{ justifyContent: "flex-start" }}
          >
            <img src={projectsIco} alt='' style={{ marginRight: "20px" }} />
            Проекты
          </NavLink>
        </p>
        <ul className='projects'>
          {merchants.merchants &&
            merchants.merchants.map((merchant) => (
              <li key={merchant.name}>
                <Link
                  to={`/dashboard/project/${merchant.merchant_id}`}
                  className='project_link'
                >
                  {merchant.name}
                </Link>
              </li>
            ))}
          <li>
            <span className={classes.createProject}>
              <NavLink to='/dashboard/create-project' className='nav_link'>
                + Создать новый проект
              </NavLink>
            </span>
          </li>
        </ul>

        <p className='subtitle' style={{ margin: "8px 0" }}>
          <NavLink
            to='/dashboard/operations'
            className='nav_link flex_box'
            style={{ justifyContent: "flex-start" }}
          >
            <img src={historyIco} alt='' style={{ marginRight: "20px" }} />
            История операций
          </NavLink>
        </p>
        <p className='subtitle' style={{ margin: "8px 0" }}>
          <NavLink
            to='/dashboard/withdrawal-of-funds'
            className='nav_link flex_box'
            style={{ justifyContent: "flex-start" }}
          >
            <img src={settingsIco} alt='' style={{ marginRight: "20px" }} />
            Вывод средств
          </NavLink>
        </p>
        <p className='subtitle' style={{ margin: "8px 0" }}>
          <NavLink
            to='/dashboard/settings'
            className='nav_link flex_box'
            style={{ justifyContent: "flex-start" }}
          >
            <img src={withdrawIco} alt='' style={{ marginRight: "20px" }} />
            Настройки
          </NavLink>
        </p>
      </Drawer>

      <section className={classes.dashboardContent_root}>
        <div className={classes.dashboardContent}>
          <Switch>
            <Route exact path='/dashboard' component={DefaultComponent} />
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
            <Route
              exact
              path='/dashboard/operations'
              component={OperationsHistory}
            />
            <Route
              exact
              path='/dashboard/operations/detail/:id'
              component={OperationDetail}
            />
            <Route
              path='/dashboard/project/:id/delete'
              component={ConfirmDeleteProject}
            />
          </Switch>
        </div>
      </section>
      <div className='bg3_image' />
      {/* <NavLink
        to="/dashboard/get-new-adress"
        style={{ textDecoration: "none" }}
      >
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          Получить новый адрес
        </MenuItem>
      </NavLink> */}
    </div>
  );
}

function DefaultComponent() {
  const [merchants, setMerchants] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!merchants) {
      AppAxios.get("/account/list")
        .then((res) => {
          setMerchants(res.data.list);
        })
        .catch(() => {
          dispatch(dispatch({ type: "GET_MERCHANTS_FAILED" }));
        });
    }
  }, [merchants, dispatch]);

  return (
    <>
      <Typography variant='h4' style={{ color: "#fff" }}>
        Мои проекты
      </Typography>
      {Boolean(merchants) ? (
        <div style={{ margin: "40px 0" }}>
          <Grid
            item
            xs={12}
            container
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              padding: 15,
            }}
          >
            <Grid item xs={3}>
              <Typography variant='body2' style={{ fontWeight: 700 }}>
                Название проекта
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                ID
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Потвержден
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Модерация
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant='body2'></Typography>
            </Grid>
          </Grid>
          {merchants.map((merchant, i) => (
            <Grid
              item
              xs={12}
              container
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                padding: "25px 15px",
              }}
              key={merchant.name}
            >
              <Grid item xs={3}>
                <Typography variant='body2'>{merchant.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body2' style={{ textAlign: "center" }}>
                  {merchant.merchant_id}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <div className='flex_box'>
                  <img
                    src={
                      parseInt(merchant.status.id) === 4
                        ? success
                        : parseInt(merchant.status.id) === 3
                        ? success
                        : parseInt(merchant.status.id) === 2
                        ? success
                        : parseInt(merchant.status.id) === 1
                        ? pending
                        : fail
                    }
                    style={{ width: 24 }}
                    alt=''
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className='flex_box'>
                  <img
                    src={
                      parseInt(merchant.status.id) === 4
                        ? fail
                        : parseInt(merchant.status.id) === 3
                        ? pending
                        : parseInt(merchant.status.id) === 2
                        ? success
                        : parseInt(merchant.status.id) === 1
                        ? pending
                        : fail
                    }
                    style={{ width: 24 }}
                    alt=''
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className='flex_box'>
                  <NavLink
                    to={
                      merchant.status.slug === "blocked"
                        ? "/dashboard"
                        : `/dashboard/project/${merchant.merchant_id}/`
                    }
                    style={{
                      maxHeight: 24,
                      opacity: merchant.status.slug === "blocked" ? 0.3 : 1,
                    }}
                  >
                    <img src={settings} alt='' />
                  </NavLink>
                  <NavLink
                    to={
                      merchant.status.slug === "blocked"
                        ? "/dashboard"
                        : `/dashboard/project/${merchant.merchant_id}/delete`
                    }
                    style={{ marginLeft: 20, maxHeight: 24 }}
                  >
                    <img src={trash} alt='' style={{ maxHeight: 24 }} />
                  </NavLink>
                </div>
              </Grid>
            </Grid>
          ))}
        </div>
      ) : (
        <div className='flex_box'>
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <img src={goust} alt='' />
            <Typography variant='h3' style={{ color: "#3E414E" }}>
              Пока здесь пусто
            </Typography>
            <NavLink
              to='/dashboard/create-project'
              style={{ textDecoration: "none" }}
            >
              <GoldButton style={{ marginTop: 50 }}>Начать работу</GoldButton>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    width: "100%",
  },
  dashboardContent_root: {
    marginTop: 100,
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    paddingLeft: 60,
    paddingBottom: 50,
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 30,
    },
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 60,
    },
  },
  dashboardContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    outline: 0,
    zIndex: 1200,
    overflowY: "auto",
    flexDirection: "column",
    WebkitOverflowScrolling: "touch",
    paddingRight: 60,
    [theme.breakpoints.down("md")]: {
      paddingRight: 30,
    },
    [theme.breakpoints.down("lg")]: {
      paddingRight: 60,
    },
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
