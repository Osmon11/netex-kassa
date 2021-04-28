import {
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
import { useSelector } from "react-redux";
import { GoldButton } from "shared/Buttons/buttons";
import { Success } from "./CreateProject";

export function WithdrawFunds() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const projects = useSelector((store) => store.merchants.merchants);
  const [project, setProject] = React.useState(projects[0].name);
  const steps = ["Создать", "Потвердить", "Успешно"];

  const handleNext = () => {
    let newSkipped = skipped;
    console.log(activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  return (
    <div className="flex_box">
      <section style={{ width: "50%" }}>
        <div
          className="title"
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
          <Success text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel necessitatibus nihil excepturi! Rem fugit commodi esse saepe distinctio consequatur eius suscipit adipisci, placeat sit quaerat molestias ipsam quisquam reiciendis impedit pariatur similique tempore dignissimos quod ipsum nostrum. Nam modi amet iusto, temporibus excepturi facilis neque commodi dolores eos veritatis aliquam." />
        ) : (
          <div className="flex_box">
            <form>
              <Typography variant="body2" style={{ marginTop: 15 }}>
                Проект
              </Typography>
              <div
                className="flex_box"
                style={{ justifyContent: "flex-start", marginBottom: 20 }}
              >
                <ThemeInput
                  margin="dense"
                  name="username"
                  select
                  disabled={activeStep > 0}
                  variant="outlined"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  style={{ width: 334 }}
                >
                  {projects.map((merchant) => (
                    <MenuItem
                      key={merchant.name}
                      value={merchant.name}
                      className={classes.menuItem}
                      classes={{ selected: classes.selected }}
                    >
                      {merchant.name}
                    </MenuItem>
                  ))}
                </ThemeInput>
                <Typography
                  variant="body2"
                  style={{ color: "#FF9900", marginLeft: 15 }}
                >
                  100 USD
                </Typography>
              </div>
              {/* <Typography variant="body2" style={{ marginTop: 15 }}>
          Выберите кошелек
        </Typography>
        <ThemeInput
          margin="dense"
          name="username"
          select
          variant="outlined"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          style={{ marginBottom: 20, width: 334 }}
        >
          {wallets.map((value) => (
            <MenuItem
              key={value}
              value={value}
              className={classes.menuItem}
              classes={{ selected: classes.selected }}
            >
              {value}
            </MenuItem>
          ))}
        </ThemeInput>
        <Typography variant="body2" style={{ marginTop: 15 }}>
          Адрес
        </Typography>
        <ThemeInput
          margin="dense"
          placeholder="Введите адрес"
          name="adress"
          type="text"
          variant="outlined"
          style={{ width: 334 }}
        /> */}
              <Typography variant="body2">Введите сумму (USD)</Typography>
              <ThemeInput
                margin="dense"
                placeholder="Cумма"
                name="btcamount"
                type="number"
                variant="outlined"
                disabled={activeStep > 0}
                style={{ width: 334 }}
              />
              <br />
              <div className="flex_box">
                <GoldButton
                  style={{
                    width: "50%",
                    minHeight: 50,
                    marginTop: 30,
                    marginRight: 50,
                  }}
                  onClick={handleNext}
                >
                  {activeStep > 0 ? "Потвердить" : "Далее"}
                </GoldButton>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
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
