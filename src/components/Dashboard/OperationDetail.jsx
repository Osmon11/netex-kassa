import {
  CircularProgress,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOperationDetail } from "store/reducer";
import success from "assets/success.svg";
import fail from "assets/fail.svg";
import warning from "assets/warning.svg";
import pending from "assets/pending.svg";

export default function OperationDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const operationDetails = useSelector(
    (store) => store.reducer.operationDetails
  );
  const [merchant, setMerchant] = useState();
  const rawContents = [
    { name: "Дата и время", key: "date" },
    { name: "Сумма", key: "sum" },
    { name: "Сумма в валюте", key: "undefined" },
    { name: "Наша комиссия", key: "undefined" },
    { name: "Комиссия системы", key: "undefined" },
    { name: "Валюта", key: "undefined" },
    { name: "Платежная система", key: "undefined" },
    { name: "Номер квитанции", key: "batch" },
  ];

  useEffect(() => {
    if (operationDetails[match.params.id] === undefined) {
      dispatch(getOperationDetail(match.params.id));
    }
    if (
      merchant === undefined &&
      operationDetails[match.params.id] !== undefined
    ) {
      setMerchant(operationDetails[match.params.id]);
    }
  }, [operationDetails, merchant]);
  return (
    <div className='flex_box' style={{ paddingTop: 50 }}>
      <span style={{ width: "50%" }}>
        <Typography
          variant='h4'
          style={{ color: "#fff", textAlign: "center", marginBottom: "36px" }}
        >
          Детали транзакции
        </Typography>
        {merchant !== undefined ? (
          <Paper className={classes.paper}>
            <div className='flex_box'>
              <img
                src={
                  parseInt(merchant.status.value) === 2
                    ? success
                    : parseInt(merchant.status.value) === 1
                    ? pending
                    : merchant.status.slug === "blocked"
                    ? warning
                    : fail
                }
                style={{ width: "46px", marginTop: "25px" }}
                alt=''
              />
            </div>
            <Typography
              variant='h4'
              style={{ color: "#fff", textAlign: "center", marginTop: "12px" }}
            >
              {merchant.status.name}
            </Typography>
            <Divider
              style={{ marginTop: "30px", backgroundColor: "#5A5B63" }}
            />
            <div className={classes.paperContent}>
              <div
                className='flex_box'
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant='body2'>Тип операции</Typography>
                <Typography variant='body2'>
                  {merchant.operation_type.name}
                </Typography>
              </div>
              {rawContents.map((obj) => (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>{obj.name}</Typography>
                  <Typography variant='body2'>
                    {Boolean(merchant[obj.key]) ? merchant[obj.key] : "---"}
                  </Typography>
                </div>
              ))}
            </div>
          </Paper>
        ) : (
          <div className='flex_box'>
            <CircularProgress />
          </div>
        )}
      </span>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#2A2B31",
    borderRadius: "10px",
  },
  paperContent: {
    padding: "35px 45px",
  },
}));
