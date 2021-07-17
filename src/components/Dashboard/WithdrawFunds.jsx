import {
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { ThemeInput } from "components/Auth/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared/Buttons/buttons";
import { Success } from "./CreateProject";
import goust from "assets/goust-icon.webp";
import { cashOut, getBalance, viewMerchant } from "store/reducer";
import { setAlert } from "store/actionCreators";

export function WithdrawFunds() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down(1400));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { merchants, balance, merchantDetails } = useSelector(
    (store) => store.reducer
  );
  const [merchantsFiltered, setFilteredMerchants] = React.useState(false);
  const [currentMerchant, setCurrentMerchant] = React.useState("");
  const [currentBalance, setCurrentBalance] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [merchantDetail, setMerchantDetail] = React.useState("");
  const [sum, setSum] = React.useState(0);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const steps = ["Создать", "Потвердить", "Успешно"];
  const requisites = [
    { text: "INN", key: "inn" },
    { text: "BIK", key: "bik" },
    { text: "IBAN", key: "iban" },
    { text: "OKPO", key: "okpo" },
    { text: "Bank Name", key: "bank_name" },
    { text: "Account", key: "checking_account" },
  ];

  React.useEffect(() => {
    if (!Boolean(balance)) {
      dispatch(getBalance());
    }
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
    if (
      Boolean(currentMerchant) &&
      Boolean(merchantDetails[currentMerchant.merchant_id])
    ) {
      setMerchantDetail(merchantDetails[currentMerchant.merchant_id]);
    }
  }, [
    merchants,
    merchantDetails,
    merchantsFiltered,
    balance,
    currentBalance,
    currentMerchant,
    currency,
    dispatch,
  ]);

  const handleNext = () => {
    if (!err && sum > 0) {
      let newSkipped = skipped;
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      if (merchantDetail.merchant_id !== currentMerchant.merchant_id) {
        dispatch(viewMerchant(currentMerchant.merchant_id));
      }
    } else {
      setErr("Введите сумму");
    }
  };
  function sendRequest() {
    setLoading(true);
    dispatch(
      cashOut(
        {
          merchant_id: currentMerchant.merchant_id,
          currency: currency.name,
          sum,
        },
        function (error) {
          setLoading(false);
          if (Boolean(error)) {
            dispatch(
              setAlert({ open: true, severity: "error", message: error })
            );
          } else {
            let newSkipped = skipped;
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
          }
        }
      )
    );
  }
  return (
    <>
      {Boolean(merchantsFiltered) ? (
        <div className='flex_box'>
          <section style={{ width: md ? "100%" : "50%" }}>
            <div
              className='title'
              style={{ fontSize: 25, marginTop: 36, textAlign: "center" }}
            >
              Вывод средств
            </div>
            <Stepper
              activeStep={activeStep}
              style={{ backgroundColor: "transparent" }}
            >
              {steps.map((label, index) => {
                return (
                  <Step
                    key={label}
                    s
                    style={{ padding: md ? "0px 20px" : "0px 8px" }}
                  >
                    <CustomLabel
                      StepIconComponent={(props) => StepIcon(props, index + 1)}
                    >
                      {label}
                    </CustomLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 2 ? (
              <Success text='Ваша заявка на вывод средств успешно оформлена. Выплата происходит в течении 3х рабочих дней после проверки заявки службой безопасности.' />
            ) : (
              <div className='flex_box'>
                <form>
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
                    disabled={activeStep > 0}
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
                    style={{ width: 334 }}
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

                  <Typography
                    variant='body2'
                    style={{ margin: "15px 0px 5px" }}
                  >
                    Валюта
                  </Typography>
                  {Boolean(currentBalance) && (
                    <ThemeInput
                      name='username'
                      select
                      disabled={activeStep > 0}
                      variant='outlined'
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ width: 334 }}
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
                  <Typography
                    variant='body2'
                    style={{ margin: "15px 0px 5px" }}
                  >
                    {`Введите сумму (${currency.name})`}
                  </Typography>
                  <ThemeInput
                    placeholder='Cумма'
                    name='btcamount'
                    type='number'
                    variant='outlined'
                    error={Boolean(err)}
                    helperText={err}
                    disabled={activeStep > 0}
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
                    style={{ width: 334 }}
                  />
                  {activeStep === 1 &&
                  merchantDetail.merchant_id === currentMerchant.merchant_id
                    ? requisites.map(
                        (obj) =>
                          merchantDetail.requisite[obj.key] && (
                            <>
                              <Typography
                                variant='body2'
                                style={{ margin: "15px 0px 5px" }}
                              >
                                {obj.text}
                              </Typography>
                              <ThemeInput
                                placeholder={merchantDetail.requisite[obj.key]}
                                name={obj.key}
                                type='text'
                                variant='outlined'
                                disabled
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                      {loading && <CircularProgress />}
                                    </InputAdornment>
                                  ),
                                }}
                                style={{ width: 334 }}
                              />
                            </>
                          )
                      )
                    : activeStep === 1 && (
                        <div className='flex_box'>
                          <CircularProgress color='primary' />
                        </div>
                      )}
                  <br />
                  <div
                    className='flex_box'
                    style={{
                      marginTop: 30,
                      justifyContent:
                        activeStep > 0 ? "space-between" : "center",
                    }}
                  >
                    {activeStep > 0 && (
                      <Button
                        className={classes.customBtn}
                        onClick={() =>
                          setActiveStep((prevActiveStep) => prevActiveStep - 1)
                        }
                        variant='outlined'
                      >
                        Назад
                      </Button>
                    )}
                    <GoldButton
                      style={{
                        width: "40%",
                        minHeight: 50,
                      }}
                      onClick={activeStep > 0 ? sendRequest : handleNext}
                    >
                      {activeStep > 0 ? "Потвердить" : "Далее"}
                    </GoldButton>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className='flex_box'>
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <img src={goust} alt='' />
            <Typography variant='h3' style={{ color: "#3E414E" }}>
              Пока здесь пусто
            </Typography>
            <NavLink
              to='/dashboard/create-project'
              style={{ textDecoration: "none" }}
            >
              <GoldButton style={{ marginTop: 50 }}>Начать работу</GoldButton>
            </NavLink>
          </div>
        </div>
      )}
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

export const StepIcon = (props, content) => {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {content}
    </div>
  );
};
export const CustomLabel = withStyles({
  active: {
    "&$active": { color: "#ff9900" },
  },
  completed: {
    "&$completed": { color: "#ff9900" },
  },
  label: { fontSize: 16, color: "#fff" },
})(StepLabel);
