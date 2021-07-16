import {
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getMerchantStatistics } from "store/reducer";
import { Chart } from "../Chart";
import SelectCurrency from "./SelectCurrency";

export function Statistics({ merchant_id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);
  let merchantStatistics = state.statistics[merchant_id];
  let tableDataStatistics = merchantStatistics;
  const [currentBalance, setCurrentBalance] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  // const symbols = { USD: "$", RUB: "₽", KZT: "₸", KGS: "C" };

  React.useEffect(() => {
    if (!Boolean(state.balance)) {
      dispatch(getBalance());
    }
    if (!Boolean(currentBalance) && Boolean(state.balance)) {
      setCurrentBalance(
        state.balance.filter(
          (item) => parseInt(item.merchant_id) === parseInt(merchant_id)
        )[0]
      );
    }
    if (!Boolean(currency) && Boolean(currentBalance)) {
      setCurrency(currentBalance.currencies[0]);
    }
  }, [state.balance, currentBalance, currency, merchant_id, dispatch]);

  function getNewStatistics(currency) {
    dispatch(getMerchantStatistics(merchant_id, { currency }));
  }

  return Boolean(merchantStatistics) ? (
    <>
      <Grid item xs={12}>
        <div
          className='flex_box'
          style={{ margin: "65px 0 55px 0", justifyContent: "space-between" }}
        >
          <div
            className='flex_box'
            style={{ width: "70%", justifyContent: "space-between" }}
          >
            <span style={{ width: "20%" }}>
              <Typography variant='body1'>Баланс</Typography>
              <div className={classes.rectangle}>
                <Typography
                  variant='body1'
                  style={{ color: "#2A2B31", lineHeight: 1.2 }}
                >
                  {merchantStatistics.balance}
                </Typography>
              </div>
            </span>
            <span style={{ width: "20%" }}>
              <Typography variant='body1'>В ожидании</Typography>
              <div className={classes.rectangle}>
                <Typography
                  variant='body1'
                  style={{ color: "#2A2B31", lineHeight: 1.2 }}
                >
                  {merchantStatistics["balance-pending"]}
                </Typography>
              </div>
            </span>
            <span style={{ width: "20%" }}>
              <Typography variant='body1'>Заработано</Typography>
              <div className={classes.rectangle}>
                <Typography
                  variant='body1'
                  style={{ color: "#2A2B31", lineHeight: 1.2 }}
                >
                  {merchantStatistics["total-payment"]}
                </Typography>
              </div>
            </span>
            <span style={{ width: "20%" }}>
              <Typography variant='body1'>Выведено</Typography>
              <div className={classes.rectangle}>
                <Typography
                  variant='body1'
                  style={{ color: "#2A2B31", lineHeight: 1.2 }}
                >
                  {merchantStatistics["total-cashout"]}
                </Typography>
              </div>
            </span>
          </div>

          <span>
            <Typography variant='body1'>Валюта </Typography>
            <SelectCurrency onChange={(value) => getNewStatistics(value)} />
          </span>
        </div>
        {/* <Typography variant='body1' style={{ marginBottom: 20 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography> */}
      </Grid>
      <Chart
        labels={merchantStatistics.chart.labels}
        paymentData={merchantStatistics.chart.paymentData}
        cashoutData={merchantStatistics.chart.cashoutData}
      />
      <Grid
        item
        container
        className={classes.dataTable}
        style={{ padding: 30 }}
      >
        <Grid item container style={{ textAlign: "center", padding: 15 }}>
          <Grid item xs={4}>
            <Typography variant='body1'>Дата</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body1'>Платеж</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='body1'>Вывод</Typography>
          </Grid>
        </Grid>
        {tableDataStatistics.chart.labels.map((date, i) => (
          <Grid
            item
            container
            key={date + i}
            style={{
              borderBottom:
                i + 1 === tableDataStatistics.chart.labels.length
                  ? "none"
                  : "1px solid #3B3D44",
              textAlign: "center",
              padding: 15,
            }}
          >
            <Grid item xs={4}>
              <Typography variant='body1'>{date}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body1'>
                {tableDataStatistics.chart.paymentData[i]}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body1'>
                {tableDataStatistics.chart.cashoutData[i]}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <Grid item xs={12}>
      <div className='flex_box'>
        <CircularProgress />
      </div>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  rectangle: {
    padding: "8px 20px",
    marginTop: 8,
    background: "#F5F5F5",
    boxShadow: "inset 0px 4px 14px rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  },
  selectCurrency: {
    width: 100,
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
  dataTable: {
    backgroundColor: "#2a2b31",
    boxShadow: "inset 0px 4px 14px rgba(0, 0, 0, 0.05)",
    borderRadius: "4px",
    padding: "30px",
    marginBottom: "50px",
  },
}));
