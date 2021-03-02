import { Button, Switch, withStyles } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";

export const GoldButton = withStyles({
  root: {
    border: "none",
    color: "#fff",
    background: "#FF9900",
    "&:hover": {
      color: "#ff9900",
      backgroundColor: "transparent",
      border: "2px solid #ff9900",
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

export const GoldToggleButton = withStyles({
  selected: {
    "&$selected": {
      color: "#fff",
      background: "#FF9900",

      "&:hover": {
        color: "#fff",
        backgroundColor: "#FF9900",
      },
    },
  },
})(ToggleButton);

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
