import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";
import "./style.css";
import bg1 from "assets/main-bg1.png";
import appBg from "assets/app-bg1.png";
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
import { GoldButton } from "shared/Buttons/buttons";

export function MainBody() {
  const classes = useStyles();
  const b1 = useRef();
  const b2 = useRef();
  const b3 = useRef();
  const bitcoins = [b1.current, b2.current, b3.current];

  return (
    <div className="main_page">
      <section style={{ position: "relative", minHeight: 750 }}>
        <Container>
          <div
            className="flex_vertical"
            style={{ width: "100%", color: "#fff", padding: "140px 5%" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Typography>
            <Typography
              variant="body1"
              style={{ textAlign: "center", margin: "30px 0" }}
            >
              Принимайте и отправляйте криптовалюту с нашим API без каких любо
              усилий.
            </Typography>
            <div className="flex_box">
              <GoldButton style={{ minWidth: 270 }}>Начать работу</GoldButton>
              <Button className={classes.customButton} variant="outlined">
                API
              </Button>
            </div>
          </div>
        </Container>
        <img className="bg_image" src={bg1} alt="" />
      </section>

      <section>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h3" style={{ marginTop: 64 }}>
                <Typography
                  variant="h3"
                  style={{ color: "#FF9900" }}
                  component="span"
                >
                  Правильное
                </Typography>{" "}
                решение для бизнеса
              </Typography>
              <Typography
                variant="body1"
                style={{ margin: "44px 0 30px 50px" }}
              >
                Делайте то в чем вы хороши, что бы это ни было. Мы предоставляем
                надежное решение для крипто-платежей которое расширит
                возможностей вашего бизнеса. Будьте уверены в своей
                конфиденциальности благодаря передовым технологиям и
                профессиональной команде.
              </Typography>
              <Typography variant="body1" style={{ margin: "0 0 44px 50px" }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </Typography>
              <GoldButton style={{ minWidth: 270 }}>Начать работу</GoldButton>
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
              <Grid item mg={7}>
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
                    style={{ width: 213, height: 343, marginBottom: 10 }}
                  ></Paper>
                  <Paper
                    className={classes.customPaper}
                    style={{ width: 313, height: 175 }}
                  ></Paper>
                </div>
              </Grid>
              <Grid item md={5}>
                <Paper
                  className={classes.customPaper}
                  style={{ width: 213, height: 343, marginBottom: 10 }}
                ></Paper>
                <Paper
                  className={classes.customPaper}
                  style={{ width: 213, height: 257 }}
                ></Paper>
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
            style={{ paddingTop: 150 }}
          >
            Наши{" "}
            <Typography
              variant="h3"
              style={{ color: "#FF9900" }}
              component="span"
            >
              преимущества
            </Typography>
          </Typography>
          <Grid container spacing={6} style={{ padding: "64px 0" }}>
            {advantages.map((obj) => (
              <Grid item md={4} key={obj.subtitle}>
                <div
                  className="flex_vertical"
                  style={{ alignItems: "flex-start" }}
                >
                  <img src={obj.img} alt="" />
                  <Typography
                    variant="subtitle2"
                    style={{ margin: "20px 0 15px 0" }}
                  >
                    {obj.subtitle}
                  </Typography>
                  <Typography variant="body2">{obj.text}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
        <img className="bg_image" src={appBg} alt="" />
      </section>

      <section>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h3" style={{ margin: "96px 0 64px 0" }}>
                <Typography
                  variant="h3"
                  style={{ color: "#FF9900" }}
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
                <Typography variant="body1">
                  Готовы начать? Присоединяйтесь к тысячам разработчиков которые
                  используют biwse.com. Нет ничего проще. Прочите API
                  документацию и убедитесь сами.
                </Typography>
              </Paper>
              <Paper className={classes.bitcoinPaper}>
                <Typography variant="body1">
                  Используйте топовые криптовалюты Начни сегодня использовать
                  топовые криптовалюты на своем сайте и получи первую неделю
                  Бесплатно!
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6} style={{ position: "relative" }}>
              <img className="main_bitcoin" src={mainBitcoin} alt="" />
              <img className="notebook" src={notebook} alt="" />
              <img
                className="bitcoin bitcoin1"
                ref={b1}
                src={bitcoin1}
                data-speed={1}
                alt=""
              />
              <img
                className="bitcoin bitcoin2"
                ref={b2}
                src={bitcoin2}
                data-speed={5}
                alt=""
              />
              <img
                className="bitcoin bitcoin3"
                ref={b3}
                src={bitcoin3}
                data-speed={3}
                alt=""
              />
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
    minHeight: 55,
    minWidth: 170,
    marginLeft: 20,
    color: "#fff",
  },
  sectionTitle: {
    textAlign: "center",
  },
  customPaper: {
    position: "relative",
    boxShadow: "0px 0px 18px 0px #FFFFFF",
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
