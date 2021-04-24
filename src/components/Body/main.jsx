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
import advantage1 from "assets/advantages1-icon.png";
import advantage2 from "assets/advantages2-icon.png";
import advantage3 from "assets/advantages3-icon.png";
import advantage4 from "assets/advantages4-icon.png";
import advantage5 from "assets/advantages5-icon.png";
import advantage6 from "assets/advantages6-icon.png";
import notebook from "assets/note-book.png";
import mainBitcoin from "assets/bitcoin-main.png";
import bitcoin1 from "assets/bitcoin-1.png";
import bitcoin2 from "assets/bitcoin-2.png";
import bitcoin3 from "assets/bitcoin-3.png";
import part1 from "assets/part1.png";
import part2 from "assets/part2.png";
import part3 from "assets/part3.png";
import part4 from "assets/part4.png";
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
    <div className="main_page">
      <section style={{ position: "relative", minHeight: "90vh" }}>
        <Container>
          <div
            className="flex_vertical"
            style={{ width: "100%", color: "#fff", padding: "180px 5%" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Typography>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                margin: "30px 0",
                fontSize: xs ? 14 : 20,
              }}
            >
              Принимайте и отправляйте криптовалюту с нашим API без каких любо
              усилий.
            </Typography>
            <div className="flex_box">
              <GoldButton
                style={{ minWidth: sm ? 164 : 270, minHeight: 60 }}
                onClick={() => history.push("/documentation")}
              >
                Начать работу
              </GoldButton>
              <Button
                className={classes.customButton}
                variant="outlined"
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
        <div className="bg_image" />
      </section>

      <section>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography
                variant="h3"
                style={{ marginTop: 64, fontSize: xs ? 35 : 50 }}
              >
                <Typography
                  variant="h3"
                  style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
                  component="span"
                >
                  Правильное
                </Typography>{" "}
                решение для бизнеса
              </Typography>
              <Typography
                variant="body1"
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
                variant="body1"
                style={{
                  margin: "0 0 44px",
                  marginLeft: sm ? 0 : 50,
                  fontSize: xs ? 14 : 20,
                }}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </Typography>
              <GoldButton
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
                  className="flex_vertical"
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
                      alt=""
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
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div
                  className="flex_vertical"
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
                      alt=""
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
                      alt=""
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
            variant="h3"
            className={classes.sectionTitle}
            style={{ paddingTop: 200, fontSize: xs ? 35 : 50 }}
          >
            Наши{" "}
            <Typography
              variant="h3"
              style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
              component="span"
            >
              преимущества
            </Typography>
          </Typography>
          <Grid container spacing={xs ? 4 : 6} style={{ padding: "64px 0" }}>
            {advantages.map((obj) => (
              <Grid item md={4} key={obj.subtitle}>
                <div
                  className="flex_box"
                  style={{
                    alignItems: "flex-start",
                    flexDirection: sm || xs ? "row" : "column",
                  }}
                >
                  <img
                    src={obj.img}
                    style={{ height: xs ? 90 : "auto" }}
                    alt=""
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
                      variant="body2"
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
        <div className="bg2_image" />
      </section>

      <section style={{ overflow: "hidden", paddingBottom: 100 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography
                variant="h3"
                style={{ margin: "96px 0 64px 0", fontSize: xs ? 35 : 50 }}
              >
                <Typography
                  variant="h3"
                  style={{ color: "#FF9900", fontSize: xs ? 35 : 50 }}
                  component="span"
                >
                  Недостающий фрагмент
                </Typography>
                <br />в Вашем бизнесе
              </Typography>
              <Paper
                className={classes.bitcoinPaper}
                style={{ marginBottom: 40 }}
              >
                <Typography variant="body1" style={{ fontSize: xs ? 14 : 20 }}>
                  Готовы начать? Присоединяйтесь к тысячам разработчиков которые
                  используют biwse.com. Нет ничего проще. Прочите API
                  документацию и убедитесь сами.
                </Typography>
              </Paper>
              <Paper className={classes.bitcoinPaper}>
                <Typography variant="body1" style={{ fontSize: xs ? 14 : 20 }}>
                  Используйте топовые криптовалюты Начни сегодня использовать
                  топовые криптовалюты на своем сайте и получи первую неделю
                  Бесплатно!
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} style={{ position: "relative" }}>
              {sm ? (
                <>
                  <img className="notebook" src={notebook} alt="" />
                  <img className="main_bitcoin" src={mainBitcoin} alt="" />
                  <img className="bitcoin bitcoin1" src={bitcoin1} alt="" />
                  <img className="bitcoin bitcoin2" src={bitcoin2} alt="" />
                  <img className="bitcoin bitcoin3" src={bitcoin3} alt="" />
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
                    <img src={notebook} alt="" />
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
                    <img src={mainBitcoin} alt="" />
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
                    <img src={bitcoin1} alt="" />
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
                    <img src={bitcoin2} alt="" />
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
                    <img src={bitcoin3} alt="" />
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
    minWidth: 170,
    marginLeft: 20,
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      minWidth: 164,
    },
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
    subtitle: "Популярные криптовалюты",
    text:
      "Принимайте и отправляйте деньги в самых востребованных криптовалютах. Незачем путать клиента в множестве никому не нужных трешкоинах.",
  },
  {
    img: advantage2,
    subtitle: "Тарифные планы",
    text:
      "Разнообразие тарифных планов дает возможность бизнесу выбрать именно тот план, который подходит именно Вам.",
  },
  {
    img: advantage3,
    subtitle: "Оффшорная зона и Криптошифрование",
    text:
      "Наши сервера находятся в офшорных зонах и обеспечивают высокий уровень безопасности, а Криптошифорование надежно хранит ваши данные.",
  },
  {
    img: advantage4,
    subtitle: "Скидки и персональный подход",
    text:
      "Если Вы крупный бизнес или средний бизнес свяжитесь с нами, и мы обеспечим Вам наилучший сервис по очень привлекательной цене.",
  },
  {
    img: advantage5,
    subtitle: "Мастер ключи",
    text:
      "Предоставляем возможность импорта мастер-ключа что существенно повышает безопасность ваших средств.",
  },
  {
    img: advantage6,
    subtitle: "Быстрая интеграция",
    text:
      "API Документация проста и понятна, а Техническая Поддержка поможет Вам где бы вы не находились в любое время суток.",
  },
];
