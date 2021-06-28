import {
  CircularProgress,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import success from "../../assets/success.svg";
import fail from "../../assets/fail.svg";
import warning from "../../assets/warning.svg";
import pending from "../../assets/pending.svg";
import goust from "assets/goust-icon.webp";
// import visa from "../../assets/visa.png";
// import master from "../../assets/master.png";
// import paypal from "../../assets/paypal.png";

// const PS = {
//   creditCard: (
//     <div className='flex_box'>
//       <img src={visa} alt='' />
//       <img src={master} alt='' />
//     </div>
//   ),
//   electron: (
//     <div className='flex_box'>
//       <img src={paypal} alt='' />
//     </div>
//   ),
// };
import {
  getStatusList,
  getTypeList,
  getHistoryList,
} from "../../store/reducer";
import { setAlert } from "store/actionCreators";

export function OperationsHistory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);
  const merchants = useSelector((store) => store.reducer.merchants);
  let t = new Date();
  t.setDate(t.getDate() - 7);
  const [options, setOptions] = useState({
    operation_type: 1,
    date_from: t.toISOString().split("T")[0],
    date_to: new Date().toISOString().split("T")[0],
    status: 2,
    merchant_id: Boolean(merchants) ? merchants[0].merchant_id : "",
  });
  const errorHandler = useCallback(
    function (error) {
      if (Boolean(error)) {
        dispatch(setAlert({ open: true, severity: "error", message: error }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!state.statusList) {
      dispatch(getHistoryList(errorHandler, options));
      dispatch(getStatusList(errorHandler));
      dispatch(getTypeList(errorHandler));
    }
  }, [state.statusList, dispatch, errorHandler, merchants, options]);
  function filterChangeHandler(newOptions) {
    setOptions(newOptions);
    dispatch(getHistoryList(errorHandler, newOptions));
  }

  return (
    <>
      {state.statusList ? (
        <Grid container>
          <Grid item xs={12} container spacing={6}>
            <Grid item xs={2} lg={3}>
              {state.typeList && (
                <ThemeInput
                  margin='dense'
                  name='operationType'
                  select
                  variant='outlined'
                  value={options.operation_type}
                  onChange={(e) => {
                    filterChangeHandler({
                      ...options,
                      operation_type: e.target.value,
                    });
                  }}
                  fullWidth
                >
                  {state.typeList.map((type) => (
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
              )}
            </Grid>
            <Grid item xs={2} lg={3}>
              {merchants && (
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
                  {merchants.map((merchant) => (
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
              )}
            </Grid>
            <Grid item xs={6} lg={4}>
              <div
                className='flex_box'
                style={{ justifyContent: "space-between" }}
              >
                <ThemeInput
                  name='date_from'
                  type='date'
                  variant='outlined'
                  margin='dense'
                  value={options.date_from}
                  onChange={(e) => {
                    filterChangeHandler({
                      ...options,
                      date_from: e.target.value,
                    });
                  }}
                  inputProps={{ max: new Date().toISOString().split("T")[0] }}
                />
                <div style={{ margin: "0 10px" }}>-</div>
                <ThemeInput
                  name='date_to'
                  type='date'
                  variant='outlined'
                  margin='dense'
                  value={options.date_to}
                  onChange={(e) => {
                    filterChangeHandler({
                      ...options,
                      date_to: e.target.value,
                    });
                  }}
                  inputProps={{ max: new Date().toISOString().split("T")[0] }}
                />
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className='flex_box' style={{ justifyContent: "flex-end" }}>
                {state.statusList && (
                  <ThemeInput
                    margin='dense'
                    name='status'
                    select
                    variant='outlined'
                    value={options.status}
                    onChange={(e) => {
                      filterChangeHandler({
                        ...options,
                        status: e.target.value,
                      });
                    }}
                    fullWidth
                  >
                    {state.statusList.map((type) => (
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
                )}
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              marginTop: 40,
              padding: 15,
            }}
          >
            <Grid item xs={2}>
              <Typography variant='body2'>Операция</Typography>
            </Grid>
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
                Приход
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2' style={{ textAlign: "center" }}>
                Расход
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='body2' style={{ textAlign: "center" }}>
                Статус
              </Typography>
            </Grid>
          </Grid>
          {state.historyList ? (
            state.historyList.map((obj) => {
              const statusImg = [
                null,
                <img
                  src={pending}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
                <img
                  src={success}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
                <img
                  src={fail}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
                <img
                  src={fail}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
                <img
                  src={warning}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
                <img
                  src={success}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=''
                />,
              ];
              return (
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "25px 15px",
                  }}
                  key={obj.order_id + obj.date}
                >
                  <Grid item xs={2}>
                    <Typography variant='body2'>
                      {obj.operation_type.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body2'>{obj.date}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body2' style={{ textAlign: "center" }}>
                      {`${obj.sum} ${obj.main_currency}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body2' style={{ textAlign: "center" }}>
                      {`${obj.debit} ${obj.currency}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='body2' style={{ textAlign: "center" }}>
                      {Boolean(obj.credit) ? obj.credit : "---"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {statusImg[obj.status.value]}
                  </Grid>
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
      ) : (
        <Grid item xs={12}>
          <div className='flex_box'>
            <CircularProgress />
          </div>
        </Grid>
      )}
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
