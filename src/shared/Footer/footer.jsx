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
import Logo from "../Logo/logo";
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
      <Grid container style={{ margin: "130px 0 50px 0" }}>
        <Grid
          item
          xs={12}
          md={4}
          style={{ textAlign: sm ? "center" : "start" }}
        >
          {!sm && (
            <Typography variant='subtitle2' className={classes.tpSubtitle}>
              О компании
            </Typography>
          )}
          <Logo />
          <Typography variant='body2' style={{ margin: "24px 0" }}>
            Netex-kassa – Это сервис предоставляющий криптовалютный кошелек, с
            помощью которого вы с легкостью сможете принимать платежи топовыми
            криптовалютами.
          </Typography>
        </Grid>

        {!sm ? (
          <>
            <Grid item md={4} style={{ paddingLeft: 70 }}>
              <Typography variant='subtitle2' className={classes.tpSubtitle}>
                Навигация по сайту
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink exact to='/' className='nav_link'>
                  Главная
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/about-us' className='nav_link'>
                  О компании
                </NavLink>
              </Typography>
              <Typography variant='body2' style={{ marginBottom: 10 }}>
                <NavLink to='/documentation' className='nav_link'>
                  Документация
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
                  href='tel:+996703601111'
                >
                  +996 (703) 601 111
                </a>
              </Typography>
              <Typography
                variant='body2'
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img src={mailIcon} alt='' style={{ marginRight: 10 }} />
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  href='mailto:info@netex-kassa.com'
                >
                  info@netex-kassa.com
                </a>
              </Typography>
              <div
                className='flex_box'
                style={{ justifyContent: "space-between", maxWidth: 175 }}
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
      <p style={{ textAlign: "center", fontWeight: 300, color: "#fff" }}>
        2021 &copy; Netex. All rights reserved.
      </p>
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
