import {
  Grid,
  makeStyles,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import goust from "assets/goust-icon.webp";
import { ThemeInput } from "components/Auth/auth";
import SelectCurrency from "components/Dashboard/SelectCurrency";
import { statusImg } from "components/Dashboard/OperationsHistory";
import { useHistory } from "react-router-dom";
import { getCashoutList, getMerchants } from "store/reducer";
import { setBackdrop } from "store/actionCreators";
import { Pagination } from "@material-ui/lab";

export function CashoutList() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(1388));
  const history = useHistory();
  const dispatch = useDispatch();
  const { cashoutList, totalCashoutList, merchants } = useSelector(
    (store) => store.reducer
  );

  const [page, setPage] = React.useState(1);
  const [merchantsFiltered, setFilteredMerchants] = React.useState(false);
  const [options, setOptions] = useState({
    merchant_id: "",
    currency: "",
  });

  useEffect(() => {
    if (!merchants) {
      dispatch(getMerchants());
    }
    if (!Boolean(options.merchant_id) && Boolean(merchantsFiltered)) {
      setOptions({ ...options, merchant_id: merchantsFiltered[0].merchant_id });
    }
    if (!merchantsFiltered && Boolean(merchants)) {
      setFilteredMerchants(
        merchants.filter((merchant) => merchant.status.slug !== "blocked")
      );
    }
    if (Boolean(options.merchant_id) && !Boolean(cashoutList)) {
      dispatch(getCashoutList(options));
    }
  }, [dispatch, merchants, merchantsFiltered, options, cashoutList]);

  const filterChangeHandler = (options) => {
    dispatch(setBackdrop(true));
    setOptions(options);
    dispatch(getCashoutList(options));
  };
  const handleChange = (event, page) => {
    dispatch(setBackdrop(true));
    dispatch(getCashoutList(options, page));
    setPage(page);
  };
  return (
    <Grid container>
      <Grid item xs={12} container spacing={md ? 3 : 6}>
        <Grid item xs={2}>
          {merchantsFiltered ? (
            <ThemeInput
              margin='dense'
              name='projects'
              select
              variant='outlined'
              value={options.merchant_id}
              onChange={(e) => {
                filterChangeHandler({
                  ...options,
                  merchant_id: e.target.value,
                });
              }}
              fullWidth
            >
              {merchantsFiltered.map((merchant) => (
                <MenuItem
                  key={merchant.name}
                  value={merchant.merchant_id}
                  className={classes.menuItem}
                  classes={{ selected: classes.selected }}
                >
                  {merchant.name}
                </MenuItem>
              ))}
            </ThemeInput>
          ) : (
            <div className='flex_box' style={{ height: "100%" }}>
              <img src={goust} style={{ height: "40px" }} alt='' />
            </div>
          )}
        </Grid>
        <Grid item xs={2}>
          <SelectCurrency
            onChange={(value) =>
              filterChangeHandler({ ...options, currency: value })
            }
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
          marginTop: 25,
          padding: 15,
        }}
      >
        <Grid item xs={2}>
          <Typography variant='body2'>Дата</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Сумма
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Валюта
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Номер квитанции
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Статус
          </Typography>
        </Grid>
      </Grid>
      {cashoutList ? (
        cashoutList.map((obj, i) => {
          return (
            <Grid
              item
              xs={12}
              onClick={() =>
                history.push(`/dashboard/operations/detail/${obj.operation_id}`)
              }
              container
              className={classes.operationItem}
              key={obj.order_id + obj.date + i}
            >
              <Grid item xs={2}>
                <Typography variant='body2' style={{ marginTop: "6px" }}>
                  {obj.date}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant='body2'
                  style={{ textAlign: "center", marginTop: "6px" }}
                >
                  {obj.sum}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant='body2'
                  style={{ textAlign: "center", marginTop: "6px" }}
                >
                  {obj.currency}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='body2'
                  style={{ textAlign: "center", marginTop: "6px" }}
                >
                  {Boolean(obj.batch) ? String(obj.batch).slice(0, 10) : "---"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ textAlign: "center", marginTop: "6px" }}
              >
                {statusImg[obj.status.value]}
              </Grid>
              {totalCashoutList > 1 && (
                <div
                  className='flex_box'
                  style={{ width: "100%", padding: "25px 0px" }}
                >
                  <Pagination
                    count={totalCashoutList}
                    page={page}
                    onChange={handleChange}
                    classes={{ ul: classes.ul }}
                    variant='outlined'
                    color='primary'
                  />
                </div>
              )}
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <div className='flex_box'>
            <div style={{ textAlign: "center", marginTop: 100 }}>
              <img src={goust} alt='' />
              <Typography variant='h3' style={{ color: "#3E414E" }}>
                Ничего не найдено
              </Typography>
            </div>
          </div>
        </Grid>
      )}
    </Grid>
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
  ul: {
    "& li .MuiPaginationItem-root": {
      color: "#fff",
      borderColor: "#fff",
    },
    "& li .MuiPaginationItem-root.Mui-selected": {
      color: "#ff9900",
      borderColor: "#ff9900",
    },
  },
  operationItem: {
    cursor: "pointer",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
    padding: "25px 15px",
    "&:hover p": {
      color: "#ff9900",
    },
  },
});
