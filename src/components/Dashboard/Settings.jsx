import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { ThemeInput } from "components/Auth/auth";
import React, { useRef, useState } from "react";
import { GoldButton } from "shared/Buttons/buttons";
import { GoldToggleButton } from "shared/Buttons/buttons";

export function Settings() {
  const classes = useStyles();
  const [tab, setTab] = useState("Профиль");
  const avatar = useRef();

  return (
    <>
      <p className='title' style={{ fontSize: 25 }}>
        Азим Дженалиев
      </p>
      <p className='subtitle'>azimdzhenaliev@gmail.com</p>
      <Grid container>
        <Grid item xs={6}>
          <ToggleButtonGroup
            exclusive
            value={tab}
            style={{ width: "100%", margin: "33px 0" }}
            onChange={(_, tab) => setTab(tab)}
          >
            <GoldToggleButton className={classes.toggleBtn} value='Профиль'>
              Профиль
            </GoldToggleButton>
            <GoldToggleButton
              className={classes.toggleBtn}
              value='Журнал входа'
            >
              Журнал входа
            </GoldToggleButton>
            <GoldToggleButton className={classes.toggleBtn} value='Кошельки'>
              Кошельки
            </GoldToggleButton>
          </ToggleButtonGroup>
          {tab === "Профиль" ? (
            <form style={{ paddingRight: "15%" }}>
              <Typography variant='body2' style={{ marginTop: 15 }}>
                Имя
              </Typography>
              <ThemeInput
                margin='dense'
                placeholder='Введите Ваше имя'
                name='username'
                type='text'
                variant='outlined'
                style={{ marginBottom: 20 }}
                fullWidth
              />
              <Typography variant='body2' style={{ marginTop: 15 }}>
                Почта
              </Typography>
              <ThemeInput
                margin='dense'
                placeholder='Введите почту'
                name='email'
                type='email'
                variant='outlined'
                style={{ marginBottom: 20 }}
                fullWidth
              />
              <Typography variant='body2' style={{ marginTop: 15 }}>
                Аватар
              </Typography>
              <ThemeInput
                margin='dense'
                placeholder='Загрузить изображение'
                name='avatar'
                type='text'
                variant='outlined'
                onClick={() => avatar.current.click()}
                style={{ marginBottom: 20 }}
                disabled
                fullWidth
              />
              <Typography variant='body2' style={{ marginTop: 15 }}>
                Смена пароля
              </Typography>
              <ThemeInput
                margin='dense'
                placeholder='Введите текущий пароль'
                name='currentpw'
                type='password'
                variant='outlined'
                fullWidth
              />
              <ThemeInput
                margin='dense'
                placeholder='Введите новый пароль'
                name='newpw'
                type='password'
                variant='outlined'
                fullWidth
              />
              <ThemeInput
                margin='dense'
                placeholder='Повторите новый пароль'
                name='repeatnewpw'
                type='password'
                variant='outlined'
                fullWidth
              />
              <GoldButton
                type='submit'
                style={{
                  marginTop: 20,
                  fontSize: 16,
                }}
              >
                Сменить пароль
              </GoldButton>
            </form>
          ) : null}

          {tab === "Журнал входа" ? (
            <>
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
                <Grid item xs={3}>
                  <Typography variant='body2'>IP</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>Браузер</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body2'>Дата</Typography>
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
                  key={obj.ip + obj.date}
                >
                  <Grid item xs={3}>
                    <Typography variant='body2'>{obj.ip}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2'>{obj.browser}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='body2'>{obj.date}</Typography>
                  </Grid>
                </Grid>
              ))}
            </>
          ) : null}
        </Grid>
      </Grid>
      <input type='file' ref={avatar} style={{ display: "none" }} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  toggleBtn: {
    width: "33.33%",
    textTransform: "none",
    color: "#686868",
    backgroundColor: "#f5f5f5",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "&:hover": {
      color: "#FF9900",
      backgroundColor: "#fff",
    },
  },
}));

const data = [
  {
    ip: "46.251.209.18	",
    browser:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
    date: "2021-01-13 18:37:46",
  },
  {
    ip: "185.66.252.145",
    browser:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
    date: "2021-01-07 10:21:51",
  },
];
