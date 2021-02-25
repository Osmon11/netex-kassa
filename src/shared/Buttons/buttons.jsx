import { Button, withStyles } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import React from "react";

export const GoldButton = ({ outlined, children, style }) => {
  return (
    <Button
      style={{
        ...style,
        border: outlined ? "1px solid #FF9900" : "none",
        color: outlined ? "#FF9900" : "#fff",
        backgroundColor: outlined ? "transparent" : "#FF9900",
        minHeight: 55,
      }}
    >
      {children}
    </Button>
  );
};

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
