import { Button, Switch, withStyles } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";

export const GoldButton = withStyles({
  root: {
    color: "#fff",
    background: "#FF9900",
    border: "2px solid #ff9900",
    paddingRight: "16px",
    paddingLeft: "16px",
    "&:hover": {
      color: "#ff9900",
      backgroundColor: "transparent",
    },
  },
  outlined: {
    color: "#ff9900",
    backgroundColor: "transparent",
    border: "2px solid #ff9900",
    "&:hover": {
      border: "none",
      color: "#fff",
      background: "#FF9900",
    },
  },
})(Button);

export const GoldToggleButton = withStyles((theme) => ({
  root: {
    width: "33.33%",
    textTransform: "none",
    color: "#000",
    backgroundColor: "#f5f5f5",
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "&:hover": {
      color: "#FF9900",
      backgroundColor: "#fff",
    },
  },
  selected: {
    "&$selected": {
      color: "#fff",
      background: "#FF9900",
      boxShadow: "0px 13px 34px rgba(255, 153, 0, 0.35)",

      "&:hover": {
        color: "#fff",
        backgroundColor: "#FF9900",
      },
    },
  },
}))(ToggleButton);

export const CustomSwitch = withStyles({
  root: {
    width: 38,
    height: 18,
    padding: 0,
  },
  switchBase: {
    padding: 0,
    color: "#9f9f9f",
    "&$checked": {
      color: "#ff9900",
      transform: "translateX(18px)",
    },
    "&$checked + $track": {
      backgroundColor: "#fff",
      opacity: 1,
    },
  },
  thumb: {
    height: 18,
    borderRadius: 4,
  },
  track: {
    borderRadius: 4,
    backgroundColor: "#fff",
    opacity: 1,
  },
  checked: {
    transform: "translateX(18px)",
    color: "#ff9900",
  },
})(Switch);
