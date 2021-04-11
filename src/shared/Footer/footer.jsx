import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import logo from "assets/logo.png";
import phoneIcon from "assets/phone-grey.png";
import mailIcon from "assets/mail-grey.png";
import whatsApp from "assets/whatsApp-light-icon.png";
import telegram from "assets/telegram-light-icon.png";
import viber from "assets/viber-light-icon.png";
import { NavLink } from "react-router-dom";
import { Auth } from "components/Auth/auth";

export function Footer() {
  const classes = useStyles();
  const [dialog, setDialog] = useState({ open: false, login: true });
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClose() {
    setDialog({ ...dialog, open: false });
  }
  return (
    <Container>
      <Grid container spacing={2} style={{ margin: "130px 0" }}>
        <Grid
          item
          sm={12}
          md={4}
          style={{ textAlign: sm ? "center" : "start" }}
        >
          {!sm ? (
            <Typography variant='subtitle2' className={classes.tpSubtitle}>
              О компании
            </Typography>
          ) : null}
          <NavLink to='/'>
            <img src={logo} style={{ height: 66 }} alt='' />
          </NavLink>
          <Typography variant='body2' style={{ margin: "24px 0" }}>
            Advanced - команда разработчиков
            <br /> работает с криптовалютами в<br /> области финансовых
            технологий
          </Typography>
        </Grid>

        {!sm ? (
          <>
            <Grid item md={4}>
              <Typography variant='subtitle2' className={classes.tpSubtitle}>
                Навигация по сайту
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/' className='nav_link'>
                  Главная
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/documentation' className='nav_link'>
                  Документация
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/about-us' className='nav_link'>
                  О компании
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/rates' className='nav_link'>
                  Тарифы
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <span
                  onClick={() => setDialog({ open: true, login: true })}
                  className='nav_link'
                >
                  Вход в личный кабинет
                </span>
              </Typography>
              <span
                className='body_3 nav_link'
                style={{ textDecoration: "underline" }}
              >
                Политика конфиденциальности
              </span>
            </Grid>

            <Grid item md={4}>
              <Typography variant='subtitle2' className={classes.tpSubtitle}>
                СВяжитесь с нами
              </Typography>
              <Typography
                variant='body2'
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <img src={phoneIcon} alt='' style={{ marginRight: 10 }} />
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  href='tel:+7(123)123456789'
                >
                  +7 (123) 123 456 789
                </a>
              </Typography>
              <Typography
                variant='body2'
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <img src={mailIcon} alt='' style={{ marginRight: 10 }} />
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  href='mailto:Info@andancer.com'
                >
                  Info@andancer.com
                </a>
              </Typography>
              <div
                className='flex_box'
                style={{ justifyContent: "space-between", maxWidth: 200 }}
              >
                <a href='https://google.com'>
                  <Paper className={classes.iconPaper} elevation={3}>
                    <img src={whatsApp} alt='' />
                  </Paper>
                </a>
                <a href='https://google.com'>
                  <Paper className={classes.iconPaper} elevation={3}>
                    <img src={telegram} alt='' />
                  </Paper>
                </a>
                <a href='https://google.com'>
                  <Paper className={classes.iconPaper} elevation={3}>
                    <img src={viber} alt='' />
                  </Paper>
                </a>
              </div>
            </Grid>
          </>
        ) : null}
      </Grid>

      <Auth
        open={dialog.open}
        login={dialog.login}
        setLogin={(login) => setDialog({ open: true, login })}
        handleClose={handleClose}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  tpSubtitle: {
    color: "#5F5F5F",
    marginBottom: 45,
  },
  iconPaper: {
    padding: 12,
    width: 44,
    height: 44,
    "&:hover": {
      backgroundColor: "inherit",
      border: "1px solid #fff",
    },
  },
}));
