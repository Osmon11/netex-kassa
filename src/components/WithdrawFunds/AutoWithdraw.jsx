import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { EmptyData } from "./NewRequest";
import settingsIcon from "assets/settings.svg";
import trash from "assets/trash.svg";
import { getListOfAutoWithdraw } from "store/reducer";
import { GoldButton } from "shared/Buttons/buttons";
import { ThemeInput } from "components/Auth/auth";

export function AutoWithdraw() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cashoutSettingsList, merchants, balance } = useSelector(
    (store) => store.reducer
  );

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = React.useState("");
  const [sum, setSum] = React.useState(0);
  const [merchantsFiltered, setFilteredMerchants] = React.useState(false);
  const [currentMerchant, setCurrentMerchant] = React.useState("");
  const [currentBalance, setCurrentBalance] = React.useState("");
  const [currency, setCurrency] = React.useState("");

  useEffect(() => {
    if (!cashoutSettingsList) {
      dispatch(getListOfAutoWithdraw());
    }
    if (!merchantsFiltered && Boolean(merchants)) {
      setFilteredMerchants(
        merchants.filter((merchant) => merchant.status.slug !== "blocked")
      );
    }
  }, [dispatch, merchantsFiltered, merchants, cashoutSettingsList]);

  const addNewAutoWithdraw = () => {
    if (!err && sum > 0) {
    } else {
      setErr("Введите сумму");
    }
  };
  return (
    <>
      <div className='flex_box' style={{ justifyContent: "space-between" }}>
        <Typography variant='h4' style={{ color: "#fff" }}>
          Мои проекты
        </Typography>
        <GoldButton onClose={() => setOpen(true)}>+ Добавить</GoldButton>
      </div>
      {Boolean(cashoutSettingsList) ? (
        <div style={{ margin: "40px 0" }}>
          <Grid
            item
            xs={12}
            container
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              padding: 15,
            }}
          >
            <Grid item xs={3}>
              <Typography variant='body2' style={{ fontWeight: 700 }}>
                Название проекта
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Дата
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Сумма
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Последний вывод
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant='body2'
                style={{ textAlign: "center", fontWeight: 700 }}
              >
                Следующий вывод
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant='body2'></Typography>
            </Grid>
          </Grid>
          {cashoutSettingsList.map((settings, i) => (
            <Grid
              item
              xs={12}
              container
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                padding: "25px 15px",
              }}
              key={settings.date + settings.withdraw_id}
            >
              <Grid item xs={3}>
                <Typography variant='body2'>
                  {
                    merchants.filter(
                      (merchant) =>
                        merchant.merchant_id === settings.merchant_id
                    )[0].name
                  }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body2' style={{ textAlign: "center" }}>
                  {settings.date}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant='body2'
                  style={{ textAlign: "center" }}
                >{`${settings.sum} ${settings.currency}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body2' style={{ textAlign: "center" }}>
                  {settings.date_update}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body2' style={{ textAlign: "center" }}>
                  {settings.next_withdrawal}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <div className='flex_box'>
                  <NavLink
                    to={`/dashboard/cashout-auto/${settings.withdraw_id}/`}
                    style={{
                      maxHeight: 24,
                    }}
                  >
                    <img src={settingsIcon} alt='' />
                  </NavLink>
                  <NavLink
                    to={`/dashboard/cashout-auto/${settings.withdraw_id}/delete`}
                    style={{ marginLeft: 20, maxHeight: 24 }}
                  >
                    <img src={trash} alt='' style={{ maxHeight: 24 }} />
                  </NavLink>
                </div>
              </Grid>
            </Grid>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='auth-dialog'
      >
        {merchantsFiltered && (
          <DialogContent
            style={{
              backgroundColor: "#2A2B31",
              padding: "55px 80px 20px",
            }}
          >
            <div
              className='flex_box'
              style={{
                justifyContent: "space-between",
                margin: "15px 0px 5px",
              }}
            >
              <Typography variant='body2'>Проект</Typography>
              <Typography
                variant='body2'
                style={{ color: "#FF9900", marginLeft: 15 }}
              >
                {`${currency.balance} ${currency.name}`}
              </Typography>
            </div>
            <ThemeInput
              name='username'
              select
              variant='outlined'
              value={currentMerchant}
              onChange={(e) => {
                let newBalance = balance.filter(
                  (item) =>
                    parseInt(item.merchant_id) ===
                    parseInt(e.target.value.merchant_id)
                )[0];
                setCurrentMerchant(e.target.value);
                setCurrentBalance(newBalance);
                setCurrency(newBalance.currencies[0]);
              }}
              style={{ width: "100%" }}
            >
              {merchantsFiltered.map((merchant) => (
                <MenuItem
                  key={merchant.name}
                  value={merchant}
                  className={classes.menuItem}
                  classes={{ selected: classes.selected }}
                >
                  {merchant.name}
                </MenuItem>
              ))}
            </ThemeInput>
            <Typography variant='body2' style={{ margin: "15px 0px 5px" }}>
              Валюта
            </Typography>
            {Boolean(currentBalance) && (
              <ThemeInput
                name='currency'
                selec
                variant='outlined'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: "100%" }}
              >
                {currentBalance.currencies.map((c) => (
                  <MenuItem
                    key={c.name}
                    value={c}
                    className={classes.menuItem}
                    classes={{ selected: classes.selected }}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </ThemeInput>
            )}
            <Typography variant='body2' style={{ margin: "15px 0px 5px" }}>
              {`Введите сумму (${currency.name})`}
            </Typography>
            <ThemeInput
              placeholder='Cумма'
              name='amount'
              type='number'
              variant='outlined'
              error={Boolean(err)}
              helperText={err}
              onChange={(e) => {
                setErr("");
                setSum(e.target.value);
                if (
                  parseInt(e.target.value) >
                  Math.round(parseInt(currency.balance))
                ) {
                  setErr("Недостаточно денег");
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress />}
                  </InputAdornment>
                ),
              }}
              style={{ width: "100%" }}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

const useStyles = makeStyles({
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
});
