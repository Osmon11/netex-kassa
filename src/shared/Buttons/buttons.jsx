import { Button } from "@material-ui/core";
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
