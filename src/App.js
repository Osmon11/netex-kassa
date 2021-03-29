import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Main,
  Documentation,
  AboutUs,
  Rates,
  Dashboard,
  Payment,
} from "./pages";
import { AuthProvider, PrivateRoute } from "components";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Route exact path="/" component={Main} />
            <Route exac path="/documentation" component={Documentation} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/rates" component={Rates} />
            <Route exact path="/payment" component={Payment} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Router>
        </ThemeProvider>
      </AuthProvider>
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
