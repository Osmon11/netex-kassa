import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import logo from "assets/logo.png";
import phoneIcon from "assets/phone-grey.png";
import mailIcon from "assets/mail-grey.png";
import whatsApp from "assets/whatsApp-light-icon.png";
import telegram from "assets/telegram-light-icon.png";
import viber from "assets/viber-light-icon.png";

export function Footer() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={2} style={{ margin: "130px 0" }}>
        <Grid item md={4}>
          <Typography variant="subtitle2" className={classes.tpSubtitle}>
            О компании
          </Typography>
          <img src={logo} style={{ height: 66 }} alt="" />
          <Typography variant="body2" style={{ margin: "24px 0" }}>
            Advanced - команда разработчиков работает с криптовалютами в области
            финансовых технологий
          </Typography>
          <span className="body_3" style={{ textDecoration: "underline" }}>
            Политика конфиденциальности
          </span>
        </Grid>

        <Grid item md={4}>
          <Typography variant="subtitle2" className={classes.tpSubtitle}>
            Навигация по сайту
          </Typography>
          <Typography variant="body2" className={classes.footerList}>
            Главная
          </Typography>
          <Typography variant="body2" className={classes.footerList}>
            Документация
          </Typography>
          <Typography variant="body2" className={classes.footerList}>
            О компании
          </Typography>
          <Typography variant="body2" className={classes.footerList}>
            Тарифы
          </Typography>
          <Typography variant="body2" className={classes.footerList}>
            Вход в личный кабинет
          </Typography>
        </Grid>

        <Grid item md={4}>
          <Typography variant="subtitle2" className={classes.tpSubtitle}>
            СВяжитесь с нами
          </Typography>
          <Typography
            variant="body2"
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <img src={phoneIcon} alt="" style={{ marginRight: 10 }} />е
          </Typography>
          <Typography
            variant="body2"
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <img src={mailIcon} alt="" style={{ marginRight: 10 }} />
            Info@andancer.com
          </Typography>
          <div
            className="flex_box"
            style={{ justifyContent: "space-between", maxWidth: 200 }}
          >
            <Paper className={classes.iconPaper} elevation={3}>
              <img src={whatsApp} alt="" />
            </Paper>
            <Paper className={classes.iconPaper} elevation={3}>
              <img src={telegram} alt="" />
            </Paper>
            <Paper className={classes.iconPaper} elevation={3}>
              <img src={viber} alt="" />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  tpSubtitle: {
    color: "#5F5F5F",
    marginBottom: 45,
  },
  footerList: {
    cursor: "pointer",
    marginBottom: 10,
    "&:hover": {
      color: "#FF9900",
    },
  },
  iconPaper: {
    padding: 12,
    width: 44,
    height: 44,
  },
}));
