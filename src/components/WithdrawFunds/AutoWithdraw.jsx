import {
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyData } from "./NewRequest";
import settingsIcon from "assets/settings.svg";
import trash from "assets/trash.svg";
import {
  addAutoWithdraw,
  deleteAutoWithdraw,
  editAutoWithdraw,
  getListOfAutoWithdraw,
} from "store/reducer";
import { GoldButton } from "shared/Buttons/buttons";
import { ThemeInput } from "components/Auth/auth";
import { setAlert, setBackdrop } from "store/actionCreators";

export function AutoWithdraw() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cashoutSettingsList, merchants, balance } = useSelector(
    (store) => store.reducer
  );

  const [open, setOpen] = useState(false);
  const [mod, setDialogMod] = useState("");
  const [err, setErr] = React.useState("");
  const [sum, setSum] = React.useState(0);
  const [type, setType] = React.useState("1");
  const [merchantsFiltered, setFilteredMerchants] = React.useState(false);
  const [currentMerchant, setCurrentMerchant] = React.useState("");
  const [currentBalance, setCurrentBalance] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [settings, setSettings] = React.useState("");
  const types = [
    { name: "Каждый день", value: "2" },
    { name: "Каждую неделю", value: "3" },
    { name: "Всегда", value: "1" },
  ];

  useEffect(() => {
    if (!cashoutSettingsList) {
      dispatch(getListOfAutoWithdraw());
    }
  }, [dispatch, cashoutSettingsList]);
  useEffect(() => {
    if (!Boolean(currentMerchant) && Boolean(merchantsFiltered)) {
      setCurrentMerchant(merchantsFiltered[0]);
    }
    if (!merchantsFiltered && Boolean(merchants)) {
      setFilteredMerchants(
        merchants.filter((merchant) => merchant.status.slug !== "blocked")
      );
    }
    if (
      !Boolean(currentBalance) &&
      Boolean(balance) &&
      Boolean(currentMerchant)
    ) {
      setCurrentBalance(
        balance.filter(
          (item) =>
            parseInt(item.merchant_id) === parseInt(currentMerchant.merchant_id)
        )[0]
      );
    }
    if (!Boolean(currency) && Boolean(currentBalance)) {
      setCurrency(currentBalance.currencies[0]);
    }
  }, [
    dispatch,
    merchantsFiltered,
    merchants,
    balance,
    currentBalance,
    currentMerchant,
    currency,
  ]);

  const callback = () => {
    setOpen(false);
    dispatch(
      setAlert({
        open: true,
        severity: "success",
        message: "Успешно!",
      })
    );
    dispatch(getListOfAutoWithdraw());
  };
  const addNewSettings = () => {
    if (!err && sum > 0) {
      let newSettings = {
        merchant_id: currentMerchant.merchant_id,
        currency: currency.name,
        sum,
        type,
      };

      dispatch(setBackdrop(true));
      return mod === "add"
        ? dispatch(addAutoWithdraw(newSettings, callback))
        : dispatch(
            editAutoWithdraw(newSettings, settings.withdraw_id, callback)
          );
    } else {
      setErr("Введите сумму");
    }
  };
  const editSettingsHandler = (settings) => {
    const currentBalance = balance.filter(
      (item) => parseInt(item.merchant_id) === parseInt(settings.merchant_id)
    )[0];
    console.log(currentBalance);
    setSettings(settings);
    setDialogMod("edit");
    setOpen(true);
    setCurrentMerchant(
      merchantsFiltered.filter(
        (merchant) =>
          parseInt(merchant.merchant_id) === parseInt(settings.merchant_id)
      )[0]
    );
    setCurrentBalance(currentBalance);
    setCurrency(
      currentBalance.currencies.filter(
        (currency) => currency.name === settings.currency
      )[0]
    );
    setType(settings.withdraw_type.type);
    setSum(settings.sum);
  };
  return (
    <>
      <div className='flex_box' style={{ justifyContent: "space-between" }}>
        <Typography variant='h4' style={{ color: "#fff" }}>
          Мои проекты
        </Typography>
        <Typography
          variant='body1'
          onClick={() => {
            setSum("");
            setOpen(true);
            setDialogMod("add");
          }}
          className={classes.addBtn}
        >
          + Добавить
        </Typography>
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
                  <img
                    src={settingsIcon}
                    alt=''
                    style={{
                      maxHeight: 24,
                      cursor: "pointer",
                    }}
                    onClick={() => editSettingsHandler(settings)}
                  />
                  <img
                    src={trash}
                    alt=''
                    style={{ marginLeft: 20, maxHeight: 24, cursor: "pointer" }}
                    onClick={() => {
                      setSettings(settings);
                      setDialogMod("delete");
                      setOpen(true);
                    }}
                  />
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
        <DialogContent
          style={{
            backgroundColor: "#2A2B31",
            padding: "55px 80px 20px",
          }}
        >
          {mod === "add" || mod === "edit" ? (
            merchantsFiltered && (
              <>
                <Typography variant='body2'>Проект</Typography>
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
                    select
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
                  Промежуток
                </Typography>
                <ThemeInput
                  name='type'
                  select
                  variant='outlined'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ width: "100%" }}
                >
                  {types.map((type) => (
                    <MenuItem
                      key={type.name}
                      value={type.value}
                      className={classes.menuItem}
                      classes={{ selected: classes.selected }}
                    >
                      {type.name}
                    </MenuItem>
                  ))}
                </ThemeInput>
                <Typography variant='body2' style={{ margin: "15px 0px 5px" }}>
                  {`Введите сумму (${currency.name})`}
                </Typography>
                <ThemeInput
                  placeholder='Cумма'
                  value={sum}
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
                  style={{ width: "100%" }}
                />
                <GoldButton
                  style={{
                    ...btnStyles,
                  }}
                  onClick={addNewSettings}
                >
                  {mod === "add" ? "Создать" : "Сохранить"}
                </GoldButton>
              </>
            )
          ) : (
            <>
              <Typography
                variant='h4'
                style={{ textAlign: "center", color: "#fff" }}
              >
                Удалить настройку?
              </Typography>
              <GoldButton
                style={{
                  ...btnStyles,
                }}
                onClick={() =>
                  dispatch(deleteAutoWithdraw(settings.withdraw_id, callback))
                }
              >
                Удалить
              </GoldButton>
            </>
          )}
        </DialogContent>
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
  addBtn: {
    cursor: "pointer",
    "&:hover": {
      color: "#ff9900",
    },
  },
});
const btnStyles = {
  minHeight: 50,
  marginTop: 40,
  minWidth: 195,
  marginLeft: "50%",
  fontSize: 16,
  transform: "translateX(-50%)",
};
