import {
  CircularProgress,
  createMuiTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@material-ui/core";
import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute } from "components";
import { Alert } from "@material-ui/lab";
import { setAlert } from "store/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const Main = React.lazy(() => import("./pages/Main"));
const Documentation = React.lazy(() => import("./pages/Documentation"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Rates = React.lazy(() => import("./pages/Rates"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Payment = React.lazy(() => import("./pages/Payment"));

export default function App() {
  const dispatch = useDispatch();
  const alert = useSelector((store) => store.reducer.alert);

  return (
    <div className='App'>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense
            fallback={
              <div
                className='flex_box'
                style={{ width: "100vw", height: "100vh" }}
              >
                <CircularProgress />
              </div>
            }
          >
            <Router>
              <Route exact path='/' component={Main} />
              <Route exac path='/documentation' component={Documentation} />
              <Route exact path='/about-us' component={AboutUs} />
              <Route exact path='/rates' component={Rates} />
              <Route exact path='/payment' component={Payment} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
            </Router>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => dispatch(setAlert({ ...alert, open: false }))}
      >
        <Alert
          onClose={() => dispatch(setAlert({ ...alert, open: false }))}
          severity={alert.severity}
          variant='filled'
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffa216",
      main: "#ff9900",
      dark: "#d58000",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h3: {
      fontWeight: 300,
      fontSize: 50,
      color: "#fff",
    },
    h4: {
      fontWeight: 300,
      fontSize: 30,
      color: "#000",
    },
    body1: {
      fontWeight: 300,
      fontSize: 20,
      color: "#fff",
    },
    body2: {
      fontWeight: 300,
      fontSize: 16,
      lineHeight: "150%",
      color: "#fff",
    },
    subtitle1: {
      fontWeight: "normal",
      fontSize: 20,
      textTransform: "uppercase",
      color: "#fff",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: 16,
      textTransform: "uppercase",
      color: "#fff",
    },
    button: {
      fontWeight: "normal",
      fontSize: 20,
      textTransform: "none",
      color: "#fff",
    },
  },
  shape: {
    borderRadius: 6,
  },
});
