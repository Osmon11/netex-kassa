import {
  Grid,
  makeStyles,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ThemeInput } from "components/Auth/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Inputs } from "./Inputs";
import success from "../../assets/success.svg";
import fail from "../../assets/fail.svg";
import warning from "../../assets/warning.svg";
import pending from "../../assets/pending.svg";
import visa from "../../assets/visa.png";
import master from "../../assets/master.png";
import paypal from "../../assets/paypal.png";

export function OperationsHistory() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const projects = [
    { name: "Все" },
    ...useSelector((store) => store.merchants.merchants),
  ];
  const [project, setProject] = React.useState(projects[0].name);
  const status = {
    success: <img src={success} style={{ width: 24 }} alt='' />,
    fail: <img src={fail} style={{ width: 24 }} alt='' />,
    warning: <img src={warning} style={{ width: 24 }} alt='' />,
    pending: <img src={pending} style={{ width: 24 }} alt='' />,
  };
  const PS = {
    creditCard: (
      <div className='flex_box'>
        <img src={visa} alt='' />
        <img src={master} alt='' />
      </div>
    ),
    electron: (
      <div className='flex_box'>
        <img src={paypal} alt='' />
      </div>
    ),
  };
  const statusKey = ["Все", "Платеж", "Вывод"];

  return (
    <Grid container style={{ paddingRight: md ? 30 : 90 }}>
      <Grid item xs={12} container spacing={6}>
        <Grid item xs={2}>
          <ThemeInput
            margin='dense'
            name='username'
            select
            variant='outlined'
            value='Все'
            fullWidth
          >
            {statusKey.map((value) => (
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
        </Grid>
        <Grid item xs={4}>
          <div className='flex_box' style={{ justifyContent: "space-between" }}>
            <ThemeInput
              name='date_from'
              type='date'
              variant='outlined'
              margin='dense'
            />
            <div style={{ margin: "0 10px" }}>-</div>
            <ThemeInput
              name='date_to'
              type='date'
              variant='outlined'
              margin='dense'
            />
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <div className='flex_box' style={{ justifyContent: "flex-end" }}>
            <ThemeInput
              margin='dense'
              name='username'
              select
              variant='outlined'
              value={project}
              onChange={(e) => setProject(e.target.value)}
              fullWidth
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
        <Grid item xs={3}>
          <Typography variant='body2'>Дата</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2'>Приход</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Расход
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            ПС
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' style={{ textAlign: "center" }}>
            Статус
          </Typography>
        </Grid>
      </Grid>
      {data.map((obj) => (
        <Grid
          item
          xs={12}
          container
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
            padding: "25px 15px",
          }}
          key={obj.date}
        >
          <Grid item xs={2}>
            <Typography variant='body2'>{obj.operation}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='body2'>{obj.date}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2'>{obj.sum}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='body2' style={{ textAlign: "center" }}>
              {obj.consumption}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {obj.ps === "creditCard" ? PS.creditCard : PS.electron}
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            {status[obj.status]}
          </Grid>
        </Grid>
      ))}
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
});

const data = [
  {
    date: "2021-01-13 18:37:46",
    operation: "Платеж",
    sum: "0.000025172 USD",
    consumption: "------------",
    ps: "creditCard",
    status: "success",
  },
  {
    date: "2021-01-07 10:21:51",
    operation: "Платеж",
    sum: "0.008500000 USD",
    consumption: "------------",
    ps: "paypal",
    status: "fail",
  },
];
