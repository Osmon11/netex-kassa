import {
  CircularProgress,
  Divider,
  InputAdornment,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  Zoom,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOperationDetail } from "store/reducer";
import success from "assets/success.svg";
import fail from "assets/fail.svg";
import warning from "assets/warning.svg";
import pending from "assets/pending.svg";
import copyIcon from "assets/copy-icon.png";
import { ThemeInput } from "components/Auth/auth";
import CopyToClipboard from "react-copy-to-clipboard";

export default function OperationDetail({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const operationDetails = useSelector(
    (store) => store.reducer.operationDetails
  );
  const [merchant, setMerchant] = useState();
  const [tooltip, setTooltip] = useState(false);

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
  }, [operationDetails, merchant, dispatch, match.params]);

  function closeTooltip() {
    setTimeout(() => setTooltip(false), 1500);
  }
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
              {merchant.operation_type.name && (
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
              )}
              {Boolean(merchant.date) && (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>Дата и время</Typography>
                  <Typography variant='body2'>{merchant.date}</Typography>
                </div>
              )}
              {Boolean(merchant.sum) && (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>Сумма</Typography>
                  <Typography variant='body2'>
                    {`${merchant.sum} ${merchant.main_currency}`}
                  </Typography>
                </div>
              )}
              {Boolean(merchant.credit || merchant.debit) && (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>Сумма в валюте</Typography>
                  <Typography variant='body2'>
                    {`${merchant.credit || merchant.debit} ${
                      merchant.currency || merchant.main_currency
                    }`}
                  </Typography>
                </div>
              )}
              {Boolean(merchant.additional_commission) && (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>Наша комиссия</Typography>
                  <Typography variant='body2'>
                    {merchant.additional_commission}
                  </Typography>
                </div>
              )}
              {Boolean(merchant.comission) && (
                <div
                  className='flex_box'
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant='body2'>Комиссия</Typography>
                  <Typography variant='body2'>{merchant.comission}</Typography>
                </div>
              )}
              {Boolean(merchant.batch) && (
                <>
                  <Typography variant='body2' style={{ marginBottom: "10px" }}>
                    Номер квитанции
                  </Typography>
                  <ThemeInput
                    name='key'
                    type='text'
                    style={{ width: "100%" }}
                    value={merchant.batch}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Tooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={tooltip}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title='Copied'
                            arrow
                            TransitionComponent={Zoom}
                          >
                            <CopyToClipboard
                              text={merchant.batch}
                              onCopy={() => {
                                setTooltip(true);
                                closeTooltip();
                              }}
                            >
                              <img
                                src={copyIcon}
                                style={{ cursor: "pointer" }}
                                alt='content copy'
                              />
                            </CopyToClipboard>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    variant='outlined'
                    disabled
                  />
                </>
              )}
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
