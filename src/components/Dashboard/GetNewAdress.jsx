import { Button, makeStyles, MenuItem, Typography } from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React from "react";
import qrCode from "assets/qr-code.png";
import { GoldButton } from "shared/Buttons/buttons";
import { NavLink } from "react-router-dom";

export function GetNewAdress() {
  const classes = useStyles();
  const [project, setProject] = React.useState("Netex.kg");
  const [wallet, setWallet] = React.useState("Bitcoin");
  const projects = ["Netex.kg", "Bironex", "Интернет магазин Kivano"];
  const wallets = ["Bitcoin", "Qiwi"];

  return (
    <section style={{ marginBottom: 30 }}>
      <p
        className="title"
        style={{ fontSize: 25, marginTop: 0, marginBottom: 30 }}
      >
        Получить новый адрес
      </p>
      <Typography variant="body2" style={{ marginTop: 15 }}>
        Проект
      </Typography>
      <ThemeInput
        margin="dense"
        name="username"
        select
        variant="outlined"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        style={{ marginBottom: 20, width: 334 }}
      >
        {projects.map((value) => (
          <MenuItem
            key={value}
            value={value}
            className={classes.menuItem}
            classes={{ selected: classes.selected }}
          >
            {value}
          </MenuItem>
        ))}
      </ThemeInput>
      <Typography variant="body2" style={{ marginTop: 15 }}>
        Выберите кошелек
      </Typography>
      <ThemeInput
        margin="dense"
        name="username"
        select
        variant="outlined"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ marginBottom: 20, width: 334 }}
      >
        {wallets.map((value) => (
          <MenuItem
            key={value}
            value={value}
            className={classes.menuItem}
            classes={{ selected: classes.selected }}
          >
            {value}
          </MenuItem>
        ))}
      </ThemeInput>
      <Typography variant="body2" style={{ lineHeight: "200%" }}>
        Скопируйте этот адрес
      </Typography>
      <Typography variant="body2" style={{ lineHeight: "200%" }}>
        0x682Ff717FCeb0e1ADeF130645615E9aF9cc80289
      </Typography>
      <img
        src={qrCode}
        alt=""
        style={{ padding: 10, backgroundColor: "#fff", marginTop: 20 }}
      />
      <div
        className="flex_box"
        style={{
          justifyContent: "flex-start",
          marginTop: 40,
        }}
      >
        <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
          <Button className={classes.customBtn} variant="outlined">
            Закрыть
          </Button>
        </NavLink>
        <GoldButton
          style={{ width: 250, marginLeft: 20, minHeight: 50, fontSize: 16 }}
        >
          Получить новый адрес
        </GoldButton>
      </div>
    </section>
  );
}

const useStyles = makeStyles({
  customBtn: {
    width: 200,
    minHeight: 50,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      color: "#fff",
      borderColor: "#fff",
    },
  },
  menuItem: {
    color: "#ff9900",
    selected: {
      "&:hover": {
        color: "#ff9900",
      },
    },
    "&:hover": {
      backgroundColor: "#ff9900",
      color: "#fff",
    },
  },
  selected: {
    "&:hover": {
      color: "#ff9900",
    },
  },
});
