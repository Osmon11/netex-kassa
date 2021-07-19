import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import "./style.css";
import flag from "assets/flag.png";
import planet from "assets/planet.webp";
import bitcoin1 from "assets/bitcoin-1.webp";
import bitcoin2 from "assets/bitcoin-2.webp";
import bitcoin3 from "assets/bitcoin-3.webp";
import cripto1 from "assets/cripto-coin1.webp";
import cripto2 from "assets/cripto-coin2.webp";
import cripto3 from "assets/cripto-coin3.webp";
import cripto4 from "assets/cripto-coin4.webp";
import cripto5 from "assets/cripto-coin5.webp";
import { ParallaxMousemove } from "components";
import { GoldButton } from "shared/Buttons/buttons";
import { Auth } from "components/Auth/auth";

export function AboutUsBody() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [dialog, setDialog] = useState({ open: false, login: true });

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
            <p className='main_title' style={{ textAlign: "start" }}>
              О нас
            </p>
            <Typography variant='body1' style={{ fontSize: xs ? 14 : 20 }}>
              Netex Kassa компания которая имеет многолетний опыт работы с
              криптовалютами. Наша цель заключается в предоставлении
              качественной услуги за адекватную цену. Мы гарантируем своим
              клиентам анонимность и шифрование данных.
            </Typography>
            <Typography
              variant='body1'
              style={{ marginTop: 20, fontSize: xs ? 14 : 20 }}
            >
              Работая с нами вы останетесь довольными.
            </Typography>
            {!sm ? (
              <>
                <p
                  className='main_title'
                  style={{ textAlign: "start", marginTop: 150 }}
                >
                  Технологии
                </p>
                <div className='flex_box' style={{ alignItems: "flex-start" }}>
                  <img
                    src={flag}
                    alt=''
                    style={{ marginTop: 10, marginRight: 15 }}
                  />
                  <Typography variant='body1'>
                    Наш сервис развиваться и мы всегда держимся новых трендов.
                    Мы готовим проект Netex Card, и если Вы хотите получить
                    карту свяжитесь со службой поддержки и вашу заявку внесут в
                    список ожидания.
                  </Typography>
                </div>
              </>
            ) : null}
          </Grid>

          <Grid item md={7} style={{ position: "relative" }}>
            {sm ? (
              <>
                <img className='planet' src={planet} alt='' />
                <img
                  className='bitcoin about_us_bitcoin1'
                  src={bitcoin1}
                  alt=''
                />
                <img
                  className='bitcoin about_us_bitcoin2'
                  src={bitcoin2}
                  alt=''
                />
                <img
                  className='bitcoin about_us_bitcoin3'
                  src={bitcoin3}
                  alt=''
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
                  <img src={planet} alt='' />
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
                  <img src={bitcoin1} alt='' />
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
                  <img src={bitcoin2} alt='' />
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
                  <img src={bitcoin3} alt='' />
                </ParallaxMousemove.Layer>
              </ParallaxMousemove>
            )}
          </Grid>

          {sm ? (
            <Grid item xs={12}>
              <p className='main_title' style={{ textAlign: "start" }}>
                Технологии
              </p>
              <div className='flex_box' style={{ alignItems: "flex-start" }}>
                <img
                  src={flag}
                  alt=''
                  style={{
                    marginTop: 10,
                    marginRight: 15,
                    width: xs ? 25 : 46,
                  }}
                />
                <Typography variant='body1' style={{ fontSize: xs ? 14 : 20 }}>
                  Наш сервис развиваться и мы всегда держимся новых трендов. Мы
                  готовим проект Biwse Card, и если Вы хотите получить карту
                  свяжитесь со службой поддержки и вашу заявку внесут в список
                  ожидания.
                </Typography>
              </div>
            </Grid>
          ) : null}

          <Grid item md={12}>
            <Typography
              variant='h3'
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
              className='title'
              style={{ fontSize: xs ? 20 : 25, textAlign: "center" }}
            >
              Мы поддерживаем самые популярные криптовалюты
            </p>
            <div
              className='flex_box'
              style={{ width: "100%", margin: "60px 0" }}
            >
              <img
                className='cripto_brend'
                src={cripto1}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=''
              />
              <img
                className='cripto_brend'
                src={cripto2}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=''
              />
              <img
                className='cripto_brend'
                src={cripto3}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=''
              />
              <img
                className='cripto_brend'
                src={cripto4}
                style={{ marginRight: xs ? 15 : 30 }}
                alt=''
              />
              <img className='cripto_brend' src={cripto5} alt='' />
            </div>
            <GoldButton
              onClick={() => setDialog({ open: true, login: false })}
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

      <Auth
        open={dialog.open}
        login={dialog.login}
        setLogin={(login) => setDialog({ open: true, login })}
        handleClose={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </section>
  );
}
