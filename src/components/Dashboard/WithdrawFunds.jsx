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
import { cashOut } from "store/reducer";
import { setAlert } from "store/actionCreators";

export function WithdrawFunds() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { merchants, balance } = useSelector((store) => store.reducer);
  const [currentMerchant, setCurrentMerchant] = React.useState(merchants[0]);
  const [currentBalance, setCurrentBalance] = React.useState(
    balance.filter(
      (item) =>
        parseInt(item.merchant_id) === parseInt(currentMerchant.merchant_id)
    )[0]
  );
  const [currency, setCurrency] = React.useState(currentBalance.currencies[0]);
  const [sum, setSum] = React.useState(0);
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const steps = ["Создать", "Потвердить", "Успешно"];

  React.useEffect(() => {
    if (!Boolean(currentMerchant)) {
      setCurrentMerchant(merchants[0]);
    }
    if (!Boolean(currentBalance)) {
      setCurrentBalance(balance[0]);
    }
  }, [merchants, sum]);

  const handleNext = () => {
    if (!err && sum > 0) {
      let newSkipped = skipped;
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
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
      {merchants ? (
        <div className='flex_box'>
          <section style={{ width: "50%" }}>
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
                  <Step key={label}>
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
              <Success text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel necessitatibus nihil excepturi! Rem fugit commodi esse saepe distinctio consequatur eius suscipit adipisci, placeat sit quaerat molestias ipsam quisquam reiciendis impedit pariatur similique tempore dignissimos quod ipsum nostrum. Nam modi amet iusto, temporibus excepturi facilis neque commodi dolores eos veritatis aliquam.' />
            ) : (
              <div className='flex_box'>
                <form>
                  <Typography variant='body2' style={{ marginTop: 15 }}>
                    Проект
                  </Typography>
                  <div
                    className='flex_box'
                    style={{ justifyContent: "flex-start", marginBottom: 20 }}
                  >
                    <ThemeInput
                      name='username'
                      select
                      disabled={activeStep > 0}
                      variant='outlined'
                      value={currentMerchant}
                      onChange={(e) => setCurrentMerchant(e.target.value)}
                      style={{ width: 334 }}
                    >
                      {merchants.map((merchant) => (
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
                      style={{ color: "#FF9900", marginLeft: 15 }}
                    >
                      {`${currency.balance} ${currency.name}`}
                    </Typography>
                  </div>
                  <Typography variant='body2' style={{ marginTop: 15 }}>
                    Валюта
                  </Typography>
                  <ThemeInput
                    name='username'
                    select
                    disabled={activeStep > 0}
                    variant='outlined'
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{ width: 334 }}
                  >
                    {Boolean(currentBalance) &&
                      currentBalance.currencies.map((c) => (
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
                  <Typography variant='body2' style={{ marginTop: 15 }}>
                    Введите сумму (USD)
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
                      if (e.target.value > currency.balance) {
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
                        marginRight: 50,
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
