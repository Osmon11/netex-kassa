import { Container, Grid, Typography } from "@material-ui/core";
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

export function AboutUsBody() {
  return (
    <section
      style={{ paddingTop: 100, overflow: "hidden", paddingBottom: 100 }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={5}>
            <p className='main_title' style={{ textAlign: "start" }}>
              О нас
            </p>
            <Typography variant='body1'>
              Наша команда разработчиков работает с криптовалютами в области
              финансовых технологий с 2012 года и за эти годы мы прошли долгий
              путь развития с множеством довольных клиентов.
            </Typography>
            <Typography variant='body1' style={{ marginTop: 20 }}>
              Главная задача команды biwse.com — дать нашим клиентам достойный
              сервис за адекватную цену с максимальным уровнем анонимности и
              шифрованием личных данных.
            </Typography>
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
                Наш сервис развиваться и мы всегда держимся новых трендов. Мы
                готовим проект Biwse Card, и если Вы хотите получить карту
                свяжитесь со службой поддержки и вашу заявку внесут в список
                ожидания.
              </Typography>
            </div>
            <div className='flex_box' style={{ alignItems: "flex-start" }}>
              <img
                src={flag}
                alt=''
                style={{ marginTop: 25, marginRight: 15 }}
              />
              <Typography variant='body1' style={{ marginTop: 20 }}>
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness.
              </Typography>
            </div>
          </Grid>

          <Grid item md={7}>
            <ParallaxMousemove
              containerStyle={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
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
          </Grid>

          <Grid item md={12}>
            <Typography
              variant='h3'
              style={{ padding: "0 20%", marginTop: 100, textAlign: "center" }}
            >
              Больше чем 200 компаний уже работают с нами
            </Typography>
            <p className='title' style={{ fontSize: 25, textAlign: "center" }}>
              Мы поддерживаем самые популярные криптовалюты
            </p>
            <div
              className='flex_box'
              style={{ width: "100%", margin: "60px 0" }}
            >
              <img src={cripto1} style={{ marginRight: 30 }} alt='' />
              <img src={cripto2} style={{ marginRight: 30 }} alt='' />
              <img src={cripto3} style={{ marginRight: 30 }} alt='' />
              <img src={cripto4} style={{ marginRight: 30 }} alt='' />
              <img src={cripto5} alt='' />
            </div>
            <GoldButton
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
