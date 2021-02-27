import { Button, withStyles } from "@material-ui/core";
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
