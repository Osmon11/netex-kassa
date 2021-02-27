import {
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
import { GoldButton } from "shared/Buttons/buttons";

export function WithdrawFunds() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [project, setProject] = React.useState("Netex.kg");
  const [amount, setAmount] = React.useState(0);
  const [wallet, setWallet] = React.useState("Bitcoin");
  const steps = ["Создать", "Потвердить", "Успешно"];
  const projects = ["Netex.kg", "Bironex", "Интернет магазин Kivano"];
  const wallets = ["Bitcoin", "Qiwi"];

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  return (
    <section style={{ width: "50%" }}>
      <div className='title' style={{ fontSize: 25 }}>
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

      <form>
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Проекты
        </Typography>
        <ThemeInput
          margin='dense'
          name='username'
          select
          variant='outlined'
          value={project}
          onChange={(e) => setProject(e.target.current)}
          style={{ marginBottom: 20, width: 334 }}
        >
          {projects.map((value) => (
            <MenuItem key={value} value={value} className={classes.menuItem}>
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Выберите кошелек
        </Typography>
        <ThemeInput
          margin='dense'
          name='username'
          select
          variant='outlined'
          value={wallet}
          onChange={(e) => setWallet(e.target.current)}
          style={{ marginBottom: 20, width: 334 }}
          fullWidth
        >
          {wallets.map((value) => (
            <MenuItem key={value} value={value} className={classes.menuItem}>
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Адрес
        </Typography>
        <ThemeInput
          margin='dense'
          placeholder='Введите адрес'
          name='adress'
          type='text'
          variant='outlined'
          style={{ width: 334 }}
        />
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Введите сумму (BTC)
        </Typography>
        <div
          className='flex_box'
          style={{ justifyContent: "space-between", width: 334 }}
        >
          <ThemeInput
            margin='dense'
            placeholder='Введите адрес'
            name='btcamount'
            type='number'
            variant='outlined'
            onChange={(e) => setAmount(e.target.value * 50000)}
            style={{ width: "45%" }}
          />
          <span style={{ padding: 5 }}>-</span>
          <ThemeInput
            id='standard-adornment-amount'
            margin='dense'
            value={amount}
            name='dollars'
            type='text'
            variant='outlined'
            style={{ width: "45%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
            disabled
          />
        </div>
        <GoldButton
          style={{ width: "50%", minHeight: 50, marginTop: 30 }}
          onClick={handleNext}
        >
          Далее
        </GoldButton>
      </form>
    </section>
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
});

const StepIcon = (props, content) => {
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
const CustomLabel = withStyles({
  active: {
    "&$active": { color: "#ff9900" },
  },
  completed: {
    "&$completed": { color: "#ff9900" },
  },
  label: { fontSize: 16, color: "#fff" },
})(StepLabel);
