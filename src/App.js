import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Documentation, AboutUs } from "./pages";

export default function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path='/' component={Main} />
          <Route exac path='/documentation' component={Documentation} />
          <Route exact path='/about-us' component={AboutUs} />
        </Router>
      </ThemeProvider>
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
