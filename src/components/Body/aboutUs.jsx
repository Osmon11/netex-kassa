import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import "./style.css";
import flag from "assets/flag.png";
import planet from "assets/planet.png";
import bitcoin1 from "assets/bitcoin-1.png";
import bitcoin2 from "assets/bitcoin-2.png";
import bitcoin3 from "assets/bitcoin-3.png";
import cripto1 from "assets/cripto-coin1.png";
import cripto2 from "assets/cripto-coin2.png";
import cripto3 from "assets/cripto-coin3.png";
import cripto4 from "assets/cripto-coin4.png";
import cripto5 from "assets/cripto-coin5.png";
import { ParallaxMousemove } from "components";
import { GoldButton } from "shared/Buttons/buttons";
import { useDispatch } from "react-redux";
import { setAuthDialog } from "store/actionCreators";

export function AboutUsBody() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();

  return (
    <section
      style={{
        paddingTop: sm ? 50 : 100,
        overflow: "hidden",
        paddingBottom: 100,
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={5}>
            <p className="main_title" style={{ textAlign: "start" }}>
              О нас
            </p>
            <Typography variant="body1" style={{ fontSize: xs ? 14 : 20 }}>
              Наша команда разработчиков работает с криптовалютами в области
              финансовых технологий с 2012 года и за эти годы мы прошли долгий
              путь развития с множеством довольных клиентов.
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: 20, fontSize: xs ? 14 : 20 }}
            >
              Главная задача команды biwse.com — дать нашим клиентам достойный
              сервис за адекватную цену с максимальным уровнем анонимности и
              шифрованием личных данных.
            </Typography>
            {!sm ? (
              <>
                <p
                  className="main_title"
                  style={{ textAlign: "start", marginTop: 150 }}
                >
                  Технологии
                </p>
                <div className="flex_box" style={{ alignItems: "flex-start" }}>
                  <img
                    src={flag}
                    alt=""
                    style={{ marginTop: 10, marginRight: 15 }}
                  />
                  <Typography variant="body1">
                    Наш сервис развиваться и мы всегда держимся новых трендов.
                    Мы готовим проект Biwse Card, и если Вы хотите получить
                    карту свяжитесь со службой поддержки и вашу заявку внесут в
                    список ожидания.
                  </Typography>
                </div>
                <div className="flex_box" style={{ alignItems: "flex-start" }}>
                  <img
                    src={flag}
                    alt=""
                    style={{ marginTop: 25, marginRight: 15 }}
                  />
                  <Typography variant="body1" style={{ marginTop: 20 }}>
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness.
                  </Typography>
                </div>
              </>
            ) : null}
          </Grid>

          <Grid item md={7} style={{ position: "relative" }}>
            {sm ? (
              <>
                <img className="planet" src={planet} alt="" />
                <img
                  className="bitcoin about_us_bitcoin1"
                  src={bitcoin1}
                  alt=""
                />
                <img
                  className="bitcoin about_us_bitcoin2"
                  src={bitcoin2}
                  alt=""
                />
                <img
                  className="bitcoin about_us_bitcoin3"
                  src={bitcoin3}
                  alt=""
                />
              </>
            ) : (
              <ParallaxMousemove
                containerStyle={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Planet image */}
                <ParallaxMousemove.Layer
                  layerStyle={{
                    position: "absolute",
                    top: -100,
                    left: 0,
                  }}
                  config={{
                    xFactor: 0.1,
                    yFactor: 0.1,
                    springSettings: {
                      stiffness: 20,
                      damping: 30,
                    },
                  }}
                >
                  <img src={planet} alt="" />
                </ParallaxMousemove.Layer>
                {/* Bitcoin1 image */}
                <ParallaxMousemove.Layer
                  layerStyle={{
                    position: "absolute",
                    top: 100,
                    left: "15%",
                  }}
                  config={{
                    xFactor: 0.15,
                    yFactor: 0.15,
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
                    right: "-10%",
                    top: "30%",
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
                  <img src={bitcoin2} alt="" />
                </ParallaxMousemove.Layer>
                {/* Bitcoin3 image */}
                <ParallaxMousemove.Layer
                  layerStyle={{
                    position: "absolute",
                    left: "35%",
                    top: "60%",
                    zIndex: -1,
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
                  <img src={bitcoin3} alt="" />
                </ParallaxMousemove.Layer>
              </ParallaxMousemove>
            )}
          </Grid>

          {sm ? (
            <Grid item xs={12}>
              <p className="main_title" style={{ textAlign: "start" }}>
                Технологии
              </p>
              <div className="flex_box" style={{ alignItems: "flex-start" }}>
                <img
                  src={flag}
                  alt=""
                  style={{
                    marginTop: 10,
                    marginRight: 15,
                    width: xs ? 25 : 46,
                  }}
                />
                <Typography variant="body1" style={{ fontSize: xs ? 14 : 20 }}>
                  Наш сервис развиваться и мы всегда держимся новых трендов. Мы
                  готовим проект Biwse Card, и если Вы хотите получить карту
                  свяжитесь со службой поддержки и вашу заявку внесут в список
                  ожидания.
                </Typography>
              </div>
              <div className="flex_box" style={{ alignItems: "flex-start" }}>
                <img
                  src={flag}
                  alt=""
                  style={{
                    marginTop: 25,
                    marginRight: 15,
                    width: xs ? 25 : 46,
                  }}
                />
                <Typography
                  variant="body1"
                  style={{ marginTop: 20, fontSize: xs ? 14 : 20 }}
                >
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness.
                </Typography>
              </div>
            </Grid>
          ) : null}

          <Grid item md={12}>
            <Typography
              variant="h3"
              style={{
                padding: "0 20%",
                marginTop: 100,
                textAlign: "center",
                fontSize: xs ? 30 : 50,
              }}
            >
              Больше чем 200 компаний уже работают с нами
            </Typography>
            <p
              className="title"
              style={{ fontSize: xs ? 20 : 25, textAlign: "center" }}
            >
              Мы поддерживаем самые популярные криптовалюты
            </p>
            <div
              className="flex_box"
              style={{ width: "100%", margin: "60px 0" }}
            >
              <img
                className="cripto_brend"
                src={cripto1}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=""
              />
              <img
                className="cripto_brend"
                src={cripto2}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=""
              />
              <img
                className="cripto_brend"
                src={cripto3}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=""
              />
              <img
                className="cripto_brend"
                src={cripto4}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=""
              />
              <img className="cripto_brend" src={cripto5} alt="" />
            </div>
            <GoldButton
              onClick={() =>
                dispatch(setAuthDialog({ open: true, login: false }))
              }
              style={{
                minWidth: 300,
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Присоединиться к нам
            </GoldButton>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
