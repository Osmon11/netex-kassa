import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import "./style.css";
import advantage1 from "assets/advantages1-icon.webp";
import advantage2 from "assets/advantages2-icon.webp";
import advantage3 from "assets/advantages3-icon.webp";
import advantage4 from "assets/advantages4-icon.webp";
import advantage5 from "assets/advantages5-icon.webp";
import advantage6 from "assets/advantages6-icon.webp";
import notebook from "assets/note-book.webp";
import mainBitcoin from "assets/bitcoin-main.webp";
import bitcoin1 from "assets/bitcoin-1.webp";
import bitcoin2 from "assets/bitcoin-2.webp";
import bitcoin3 from "assets/bitcoin-3.webp";
import part1 from "assets/part1.webp";
import part2 from "assets/part2.webp";
import part3 from "assets/part3.webp";
import part4 from "assets/part4.webp";
import { GoldButton } from "shared/Buttons/buttons";
import { ParallaxMousemove } from "components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setTab } from "store/actionCreators";

export function MainBody() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className='main_page'>
      <section style={{ position: "relative", minHeight: "90vh" }}>
        <Container>
          <div
            className='flex_vertical'
            style={{ width: "100%", color: "#fff", padding: "180px 5%" }}
          >
            <Typography variant='h3' className={classes.sectionTitle}>
              Скажи «ДА» КРИПТОПЛАТЕЖАМ!
            </Typography>
            <Typography
              variant='body1'
              style={{
                textAlign: "center",
                margin: "30px 0",
                fontSize: xs ? 14 : 20,
              }}
            >
              Принимать оплату криптовалютами на веб-сайтах или мобильных
              приложениях стало доступно.
            </Typography>
            <div className='flex_box section-1' style={{ width: 400 }}>
              <GoldButton
                style={{
                  minWidth: "50%",
                  minHeight: 60,
                  marginRight: "20px",
                }}
                onClick={() => history.push("/documentation")}
              >
                Начать работу
              </GoldButton>
              <Button
                className={classes.customButton}
                variant='outlined'
                onClick={() => {
                  dispatch(setTab({ value: "API клиенты", index: 2 }));
                  history.push("/documentation");
                }}
              >
                API
              </Button>
            </div>
          </div>
        </Container>
        <div className='bg_image' />
      </section>

      <section>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography
                variant='h3'
                style={{ marginTop: 64, fontSize: xs ? 35 : 50 }}
              >
                <Typography
                  variant='h3'
                  style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
                  component='span'
                >
                  Правильное
                </Typography>{" "}
                решение для бизнеса
              </Typography>
              <Typography
                variant='body1'
                style={{
                  margin: "44px 0 30px",
                  marginLeft: sm ? 0 : 50,
                  fontSize: xs ? 14 : 20,
                }}
              >
                Делайте то в чем вы хороши, что бы это ни было. Мы предоставляем
                надежное решение для крипто-платежей которое расширит
                возможностей вашего бизнеса. Будьте уверены в своей
                конфиденциальности благодаря передовым технологиям и
                профессиональной команде.
              </Typography>
              <Typography
                variant='body1'
                style={{
                  margin: "0 0 44px",
                  marginLeft: sm ? 0 : 50,
                  fontSize: xs ? 14 : 20,
                }}
              >
                Увеличь продажи, расширь свое дело и будь в тренде! Выведи свою
                компанию на новый уровень вместе с Netex-kassa.
              </Typography>
              <GoldButton
                className='section-2__btn'
                style={{ minWidth: 270, minHeight: 60 }}
                onClick={() => history.push("/documentation")}
              >
                Начать работу
              </GoldButton>
            </Grid>

            <Grid
              item
              md={6}
              container
              spacing={2}
              style={{
                paddingTop: 50,
              }}
            >
              <Grid item xs={7}>
                <div
                  className='flex_vertical'
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <Paper
                    className={classes.customPaper}
                    style={{
                      width: xs ? 100 : 213,
                      height: xs ? 200 : 343,
                      marginBottom: 20,
                    }}
                  >
                    <img
                      src={part1}
                      alt=''
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                  <Paper
                    className={classes.customPaper}
                    style={{
                      width: xs ? 156 : 313,
                      height: xs ? 105 : 175,
                    }}
                  >
                    <img
                      src={part2}
                      alt=''
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div
                  className='flex_vertical'
                  style={{
                    alignItems: "start",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <Paper
                    className={classes.customPaper}
                    style={{
                      width: xs ? 115 : 213,
                      height: xs ? 200 : 343,
                      marginBottom: 20,
                    }}
                  >
                    <img
                      src={part3}
                      alt=''
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                  <Paper
                    className={classes.customPaper}
                    style={{
                      width: xs ? 115 : 213,
                      height: xs ? 155 : 257,
                    }}
                  >
                    <img
                      src={part4}
                      alt=''
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section style={{ position: "relative" }}>
        <Container>
          <Typography
            variant='h3'
            className={classes.sectionTitle}
            style={{ paddingTop: 200, fontSize: xs ? 35 : 50 }}
          >
            Наши{" "}
            <Typography
              variant='h3'
              style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
              component='span'
            >
              преимущества
            </Typography>
          </Typography>
          <Grid container spacing={xs ? 4 : 6} style={{ padding: "64px 0" }}>
            {advantages.map((obj) => (
              <Grid item md={4} key={obj.subtitle}>
                <div
                  className='flex_box'
                  style={{
                    alignItems: "flex-start",
                    flexDirection: sm || xs ? "row" : "column",
                  }}
                >
                  <img
                    src={obj.img}
                    style={{ height: xs ? 90 : "auto" }}
                    alt=''
                  />
                  <div style={{ marginLeft: sm || xs ? 20 : 0 }}>
                    <Typography
                      variant={sm || xs ? "body2" : "subtitle2"}
                      style={{
                        marginTop: sm || xs ? 0 : 20,
                        marginBottom: 15,
                        textTransform: "uppercase",
                      }}
                    >
                      {obj.subtitle}
                    </Typography>
                    <Typography
                      variant='body2'
                      style={{ fontSize: xs ? 12 : 16 }}
                    >
                      {obj.text}
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
        <div className='bg2_image' />
      </section>

      <section style={{ overflow: "hidden", paddingBottom: 100 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography
                variant='h3'
                style={{ margin: "96px 0 64px 0", fontSize: xs ? 35 : 50 }}
              >
                <Typography
                  variant='h3'
                  style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
                  component='span'
                >
                  Недостающий фрагмент
                </Typography>
                <br />в Вашем бизнесе
              </Typography>
              <Paper
                className={classes.bitcoinPaper}
                style={{ marginBottom: 40 }}
              >
                <Typography variant='body1' style={{ fontSize: xs ? 14 : 20 }}>
                  Netex-kassa – лучшее решение для вашего бизнеса! Это сервис
                  предоставляющий криптовалютный кошелек, с помощью которого вы
                  с легкостью сможете принимать платежи топовыми криптовалютами.
                </Typography>
              </Paper>
              <Paper className={classes.bitcoinPaper}>
                <Typography variant='body1' style={{ fontSize: xs ? 14 : 20 }}>
                  Принимайте платежи быстро и безопасно через стильный, удобный
                  интерфейс и мощный API. Интегрируйте систему оплаты вместе с
                  Netex-kassa!
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} style={{ position: "relative" }}>
              {sm ? (
                <>
                  <img className='notebook' src={notebook} alt='' />
                  <img className='main_bitcoin' src={mainBitcoin} alt='' />
                  <img className='bitcoin bitcoin1' src={bitcoin1} alt='' />
                  <img className='bitcoin bitcoin2' src={bitcoin2} alt='' />
                  <img className='bitcoin bitcoin3' src={bitcoin3} alt='' />
                </>
              ) : (
                <ParallaxMousemove
                  containerStyle={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Notebook image */}
                  <ParallaxMousemove.Layer
                    layerStyle={{
                      position: "absolute",
                      bottom: -40,
                      left: "-20%",
                    }}
                    config={{
                      xFactor: 0.1,
                      yFactor: 0.1,
                      springSettings: {
                        stiffness: 50,
                        damping: 30,
                      },
                    }}
                  >
                    <img src={notebook} alt='' />
                  </ParallaxMousemove.Layer>
                  {/* Bitcoin large */}
                  <ParallaxMousemove.Layer
                    layerStyle={{
                      position: "absolute",
                      top: 20,
                      left: "-25%",
                      zIndex: -1,
                    }}
                    config={{
                      xFactor: 0.2,
                      yFactor: 0.1,
                      springSettings: {
                        stiffness: 50,
                        damping: 30,
                      },
                    }}
                  >
                    <img src={mainBitcoin} alt='' />
                  </ParallaxMousemove.Layer>
                  {/* Bitcoin1 image */}
                  <ParallaxMousemove.Layer
                    layerStyle={{
                      position: "absolute",
                      bottom: 60,
                      left: "-11%",
                    }}
                    config={{
                      xFactor: 0.3,
                      yFactor: 0.3,
                      springSettings: {
                        stiffness: 50,
                        damping: 30,
                      },
                    }}
                  >
                    <img src={bitcoin1} alt='' />
                  </ParallaxMousemove.Layer>
                  {/* Bitcoin2 image */}
                  <ParallaxMousemove.Layer
                    layerStyle={{
                      position: "absolute",
                      bottom: 160,
                      left: "20%",
                    }}
                    config={{
                      xFactor: 0.2,
                      yFactor: 0.2,
                      springSettings: {
                        stiffness: 50,
                        damping: 30,
                      },
                    }}
                  >
                    <img src={bitcoin2} alt='' />
                  </ParallaxMousemove.Layer>
                  {/* Bitcoin3 image */}
                  <ParallaxMousemove.Layer
                    layerStyle={{
                      position: "absolute",
                      right: "10%",
                      top: "42%",
                    }}
                    config={{
                      xFactor: -0.1,
                      yFactor: -0.1,
                      springSettings: {
                        stiffness: 50,
                        damping: 30,
                      },
                    }}
                  >
                    <img src={bitcoin3} alt='' />
                  </ParallaxMousemove.Layer>
                </ParallaxMousemove>
              )}
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  customButton: {
    border: "3px solid #FFFFFF",
    fontSize: 20,
    fontWeight: "normal",
    minHeight: 60,
    minWidth: "50%",
    color: "#fff",
  },
  sectionTitle: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  customPaper: {
    borderRadius: 17,
    filter: "drop-shadow(0px 0px 32px rgba(255, 255, 255, 0.15))",
  },
  bitcoinPaper: {
    padding: "60px 80px",
    background: " linear-gradient(270deg, #2A2B31 0%, #18191D 82.47%)",
  },
}));

const advantages = [
  {
    img: advantage1,
    subtitle: "Простое подключение",
    text: "API документация написана довольно просто и понятно.",
  },
  {
    img: advantage2,
    subtitle: "Оплата ТОП-20 криптовалютами",
    text: "Ведите работу только с проверенными временем криптовалютами.",
  },
  {
    img: advantage3,
    subtitle: "Служба поддержки 24/7 ",
    text: "При возникновении вопросов мы не оставляем вас один на один с нерешаемой задачей.",
  },
  {
    img: advantage4,
    subtitle: "Выгодная тарификация",
    text: "Выбор подходящего тарифного плана для вашего бизнеса.",
  },
  {
    img: advantage5,
    subtitle: "Выгодные условия ",
    text: "Скидки для владельцев крупного и среднего бизнеса.",
  },
  {
    img: advantage6,
    subtitle: "Безопасность",
    text: "Криптошифрование и высокий уровень безопасности, которые надежно хранят ваши данные.",
  },
];
