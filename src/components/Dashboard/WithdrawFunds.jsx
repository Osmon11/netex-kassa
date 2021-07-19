import { makeStyles } from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { AutoWithdraw } from "components/WithdrawFunds/AutoWithdraw";
import { CashoutList } from "components/WithdrawFunds/CashoutList";
import { NewRequest } from "components/WithdrawFunds/NewRequest";
import React from "react";
import { GoldToggleButton } from "shared/Buttons/buttons";

export function WithdrawFunds() {
  const classes = useStyles();
  const [tab, setTab] = React.useState("Новая заявка");

  return (
    <>
      <div className='flex_box'>
        <ToggleButtonGroup
          exclusive
          value={tab}
          style={{ width: "100%", margin: "33px 0" }}
          onChange={(_, tab) => setTab(tab)}
        >
          <GoldToggleButton className={classes.toggleBtn} value='Новая заявка'>
            Новая заявка
          </GoldToggleButton>
          <GoldToggleButton
            className={classes.toggleBtn}
            value='Заявки на вывод'
          >
            Заявки на вывод
          </GoldToggleButton>
          <GoldToggleButton className={classes.toggleBtn} value='Авто вывод'>
            Авто вывод
          </GoldToggleButton>
        </ToggleButtonGroup>
      </div>

      {tab === "Новая заявка" && <NewRequest />}
      {tab === "Заявки на вывод" && <CashoutList />}
      {tab === "Авто вывод" && <AutoWithdraw />}
    </>
  );
}

const useStyles = makeStyles({
  root: {
    fontSize: 16,
    color: "#fff",
    borderRadius: "50%",
    border: "1px solid #fff",
    width: 40,
    height: 40,
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    "&$active": { color: "#ff9900", border: "1px solid #ff9900" },
  },
  completed: {
    "&$completed": { color: "#ff9900", border: "1px solid #ff9900" },
  },
  menuItem: {
    color: "#ff9900",
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
  customBtn: {
    width: "40%",
    minHeight: 50,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      color: "#fff",
      borderColor: "#fff",
    },
  },
});
