import {
  AppBar,
  Container,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import Logo from "../Logo/logo";
import menuIcon from "assets/menu-icon.png";
import closeIcon from "assets/close-icon.png";
import phoneIcon from "assets/phone-grey.png";
import mailIcon from "assets/mail-grey.png";
import whatsApp from "assets/whatsApp-light-icon.png";
import telegram from "assets/telegram-light-icon.png";
import viber from "assets/viber-light-icon.png";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared";
import { Auth } from "components/Auth/auth";
import { useSelector } from "react-redux";

export function Header() {
  const user = useSelector((store) => store.reducer.user);
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialog, setDialog] = useState({ open: false, login: true });

  function MobileMenu() {
    return (
      <ThemeDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        anchor='right'
      >
        <div
          className='flex_box'
          style={{
            width: "100%",
            justifyContent: "space-between",
            margin: "14px 0 50px",
          }}
        >
          <span className='menu_text'>Menu</span>
          <div
            className='circle_button flex_box'
            onClick={() => setDrawer(false)}
          >
            <img src={closeIcon} alt='' />
          </div>
        </div>

        <div style={{ marginRight: 70 }}>
          <Typography
            variant='subtitle2'
            style={{ color: "#5F5F5F", marginBottom: 20 }}
          >
            СВяжитесь с нами
          </Typography>
          <Typography
            variant='body2'
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <img src={phoneIcon} alt='' style={{ marginRight: 20 }} />
            <a
              style={{ textDecoration: "none", color: "#fff" }}
              href='tel:+996703601111'
            >
              +996 (703) 601 111
            </a>
          </Typography>
          <Typography
            variant='body2'
            style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
          >
            <img src={mailIcon} alt='' style={{ marginRight: 20 }} />
            <a
              style={{ textDecoration: "none", color: "#fff" }}
              href='mailto:info@netex-kassa.com'
            >
              info@netex-kassa.com
            </a>
          </Typography>
          <div
            className='flex_box'
            style={{ justifyContent: "space-between", maxWidth: 200 }}
          >
            <Paper style={{ ...iconStyle }} elevation={3}>
              <img src={whatsApp} alt='' />
            </Paper>
            <Paper style={{ ...iconStyle }} elevation={3}>
              <img src={telegram} alt='' />
            </Paper>
            <Paper style={{ ...iconStyle }} elevation={3}>
              <img src={viber} alt='' />
            </Paper>
          </div>
          <Divider
            style={{
              backgroundColor: "#fff",
              opacity: 0.2,
              margin: "50px 0",
            }}
          />
          <Typography
            variant='subtitle2'
            style={{ color: "#5F5F5F", marginBottom: 20 }}
          >
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
            {!user ? (
              <span
                onClick={() => setDialog({ open: true, login: true })}
                className='nav_link'
              >
                Вход в личный кабинет
              </span>
            ) : (
              <NavLink to='/dashboard' className='nav_link'>
                Профиль
              </NavLink>
            )}
          </Typography>
        </div>
      </ThemeDrawer>
    );
  }
  return (
    <AppBar
      position='static'
      style={{
        backgroundColor: "#18191D",
        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <Container>
        <Toolbar style={{ padding: "10px 0" }}>
          <div
            className='flex_box'
            style={{
              justifyContent: "space-between",
              width: "100%",
              maxHeight: sm ? 85 : 65,
            }}
          >
            <span
              className='flex_box'
              style={{ flexDirection: sm ? "column" : "row" }}
            >
              <NavLink to='/' className='nav_link'>
                <Logo />
              </NavLink>
            </span>

            {sm ? (
              <IconButton onClick={() => setDrawer(true)}>
                <img src={menuIcon} alt='' />
              </IconButton>
            ) : (
              <>
                <div
                  className='flex_box'
                  style={{ justifyContent: "space-between", width: 485 }}
                >
                  <NavLink exact to='/' className='nav_link'>
                    Главная
                  </NavLink>
                  <NavLink to='/about-us' className='nav_link'>
                    О нас
                  </NavLink>
                  <NavLink to='/documentation' className='nav_link'>
                    Документация
                  </NavLink>
                  <NavLink to='/rates' className='nav_link'>
                    Тарифы
                  </NavLink>
                </div>

                <span className='flex_box'>
                  {!user ? (
                    <>
                      <GoldButton
                        style={{ minWidth: 90, minHeight: 40 }}
                        onClick={() => setDialog({ open: true, login: true })}
                        variant='outlined'
                      >
                        Вход
                      </GoldButton>
                      <p
                        className='nav_link'
                        style={{ marginLeft: 20 }}
                        onClick={() => setDialog({ open: true, login: false })}
                      >
                        Регистрация
                      </p>
                    </>
                  ) : (
                    <NavLink to='/dashboard' className='nav_link'>
                      <GoldButton
                        style={{ minWidth: 90, minHeight: 40 }}
                        // variant="outlined"
                      >
                        Профиль
                      </GoldButton>
                    </NavLink>
                  )}
                </span>
              </>
            )}
          </div>
        </Toolbar>
      </Container>

      <MobileMenu />
      <Auth
        open={dialog.open}
        login={dialog.login}
        setLogin={(login) => setDialog({ open: true, login })}
        handleClose={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </AppBar>
  );
}

const ThemeDrawer = withStyles({
  paper: {
    background: "linear-gradient(90deg, #1A1B1F 0%, #2A2B31 100%), #2A2B31",
    padding: "36px 24px ",
  },
})(Drawer);
const iconStyle = { padding: 12, width: 44, height: 44 };
