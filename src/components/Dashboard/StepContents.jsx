import {
  makeStyles,
  MenuItem,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { ThemeInput } from "components/Auth/auth";
import { GoldToggleButton } from "shared/Buttons/buttons";

export function SecondStep({ handleNext }) {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = React.useState("Шаг 1");
  const [country, setCountry] = React.useState("USA");
  const countries = ["Russia", "China", "USA"];

  return (
    <div className={classes.stepContainer}>
      <ToggleButtonGroup
        exclusive
        value={tab}
        style={{ minWidth: xs ? "100%" : 454, maxHeight: 54, margin: "33px 0" }}
        onChange={(_, tab) => setTab(tab)}
      >
        <GoldToggleButton className={classes.toggleBtn} value="Шаг 1">
          Шаг 1
        </GoldToggleButton>
        <GoldToggleButton className={classes.toggleBtn} value="Шаг 2">
          Шаг 2
        </GoldToggleButton>
        <GoldToggleButton className={classes.toggleBtn} value="Шаг 3">
          Шаг 3
        </GoldToggleButton>
      </ToggleButtonGroup>
      <div className="flex_box" style={{ justifyContent: "space-between" }}>
        <Typography variant="body2" style={{ fontSize: 16, fontWeight: 300 }}>
          Страна регистрации вашей компании
        </Typography>
        <ThemeInput
          margin="dense"
          name="country"
          select
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.current)}
          style={{ marginBottom: 20, width: 334 }}
        >
          {countries.map((value) => (
            <MenuItem
              key={"country" + value}
              value={value}
              className={classes.menuItem}
            >
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
      </div>

      <div className="flex_box" style={{ justifyContent: "space-between" }}>
        <Typography variant="body2" style={{ fontSize: 16, fontWeight: 300 }}>
          Город регистрации вашей компании
        </Typography>
        <ThemeInput
          margin="dense"
          name="cityname"
          select
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.current)}
          style={{ marginBottom: 20, width: 334 }}
        >
          {countries.map((value) => (
            <MenuItem
              key={"city" + value}
              value={value}
              className={classes.menuItem}
            >
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
      </div>

      <Typography variant="body2">
        <CustomSwith />
      </Typography>
    </div>
  );
}

const CustomSwith = withStyles({})(Switch);

const useStyles = makeStyles((theme) => ({
  toggleBtn: {
    width: "33.33%",
    textTransform: "none",
    color: "#000",
    backgroundColor: "#f5f5f5",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "&:hover": {
      color: "#FF9900",
      backgroundColor: "#fff",
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
