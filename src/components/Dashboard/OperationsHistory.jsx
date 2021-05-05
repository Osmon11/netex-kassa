import {
  CircularProgress,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import success from "../../assets/success.svg";
import fail from "../../assets/fail.svg";
import warning from "../../assets/warning.svg";
import pending from "../../assets/pending.svg";
import goust from "assets/goust-icon.svg";
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
import { creatRequest } from "../../store/reducer";
import { setAlert } from "store/actionCreators";

export function OperationsHistory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const merchants = useSelector((store) => store.merchants.merchants);
  const [data, setData] = useState([]);
  const [statusSelect, setStatus] = useState(null);
  const [operationTypeSelect, setOperationType] = useState(null);
  const [listOfOperations, setListOfOperations] = useState({
    operation_type: 1,
    date_from: "20.04.2021",
    date_to: "21.04.2021",
    status: 2,
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
    if (data.length === 0) {
      creatRequest("/operations/list", undefined, errorHandler).then((res) => {
        if (Boolean(res)) {
          let list = res.data.list;
          let arr = [];
          for (let key in list) {
            arr.push(list[key]);
          }
          setData(arr);
        }
      });
    }
    if (merchants && Boolean(listOfOperations.merchant_id)) {
      setListOfOperations({
        ...listOfOperations,
        merchant_id: merchants[0].merchant_id,
      });
    }
    if (!statusSelect) {
      creatRequest("/operations/options/status", undefined, errorHandler).then(
        (res) => {
          if (Boolean(res)) {
            let list = res.data.list;
            let arr = [];
            for (let key in list) {
              arr.push({ value: key, name: list[key].name });
            }
            setStatus(arr);
          }
        }
      );
    }
    if (!operationTypeSelect) {
      creatRequest("/operations/options/type", undefined, errorHandler).then(
        (res) => {
          if (Boolean(res)) {
            let list = res.data.list;
            let arr = [];
            for (let key in list) {
              arr.push({ value: key, name: list[key].name });
            }
            setOperationType(arr);
          }
        }
      );
    }
  }, [
    statusSelect,
    operationTypeSelect,
    errorHandler,
    data,
    merchants,
    listOfOperations,
  ]);

  useEffect(() => {
    if (listOfOperations)
      creatRequest("/operations/list", listOfOperations, errorHandler).then(
        (res) => {
          if (Boolean(res)) {
            console.log(res.data);
          }
        }
      );
  }, [listOfOperations, errorHandler]);
  return (
    <>
      {data.length > 0 ? (
        <Grid container>
          <Grid item xs={12} container spacing={6}>
            <Grid item xs={2}>
              {operationTypeSelect && (
                <ThemeInput
                  margin="dense"
                  name="operationType"
                  select
                  variant="outlined"
                  value={listOfOperations.operation_type}
                  onChange={(e) =>
                    setListOfOperations({
                      ...listOfOperations,
                      operation_type: e.target.value,
                    })
                  }
                  fullWidth
                >
                  {operationTypeSelect.map((type) => (
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
            <Grid item xs={2}>
              <ThemeInput
                margin="dense"
                name="projects"
                select
                variant="outlined"
                value={listOfOperations.merchant_id}
                onChange={(e) =>
                  setListOfOperations({
                    ...listOfOperations,
                    merchant_id: e.target.value,
                  })
                }
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
            </Grid>
            <Grid item xs={4}>
              <div
                className="flex_box"
                style={{ justifyContent: "space-between" }}
              >
                <ThemeInput
                  name="date_from"
                  type="date"
                  variant="outlined"
                  margin="dense"
                  value={listOfOperations.date_from}
                  onChange={(e) =>
                    setListOfOperations({
                      ...listOfOperations,
                      date_from: e.target.value,
                    })
                  }
                />
                <div style={{ margin: "0 10px" }}>-</div>
                <ThemeInput
                  name="date_to"
                  type="date"
                  variant="outlined"
                  margin="dense"
                  value={listOfOperations.date_to}
                  onChange={(e) =>
                    setListOfOperations({
                      ...listOfOperations,
                      date_to: e.target.value,
                    })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <div className="flex_box" style={{ justifyContent: "flex-end" }}>
                {statusSelect && (
                  <ThemeInput
                    margin="dense"
                    name="status"
                    select
                    variant="outlined"
                    value={listOfOperations.status}
                    onChange={(e) =>
                      setListOfOperations({
                        ...listOfOperations,
                        status: e.target.value,
                      })
                    }
                    fullWidth
                  >
                    {statusSelect.map((type) => (
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
              <Typography variant="body2">Операция</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">Дата</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Приход</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={{ textAlign: "center" }}>
                Расход
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" style={{ textAlign: "center" }}>
                Валюта
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={{ textAlign: "center" }}>
                Статус
              </Typography>
            </Grid>
          </Grid>
          {data ? (
            data.map((obj) => {
              const statusImg = [
                null,
                <img
                  src={pending}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
                />,
                <img
                  src={success}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
                />,
                <img
                  src={fail}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
                />,
                <img
                  src={fail}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
                />,
                <img
                  src={warning}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
                />,
                <img
                  src={success}
                  style={{ width: 24 }}
                  title={obj.status.name}
                  alt=""
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
                    <Typography variant="body2">
                      {obj.operation_type.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">{obj.date}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">{obj.debit}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" style={{ textAlign: "center" }}>
                      {obj.credit}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2" style={{ textAlign: "center" }}>
                      {obj.currency}
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
              <div className="flex_box">
                <CircularProgress />
              </div>
            </Grid>
          )}
        </Grid>
      ) : (
        <div className="flex_box">
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <img src={goust} alt="" />
            <Typography variant="h3" style={{ color: "#3E414E" }}>
              Пока здесь пусто
            </Typography>
          </div>
        </div>
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
