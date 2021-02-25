import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { GoldButton } from "shared/Buttons/buttons";
import "./style.css";

export function RatesBody() {
  return (
    <Container>
      <Grid container spacing={6} style={{ margin: "0 50px" }}>
        <p
          className='main_title'
          style={{ marginBottom: 0, marginTop: 100, width: "100%" }}
        >
          Доступные тарифы
        </p>
        <p
          className='title'
          style={{
            fontSize: 25,
            textAlign: "center",
            width: "100%",
            marginBottom: 100,
          }}
        >
          Выберите подходящий вам тариф
        </p>
        <Grid item md={6}>
          <Paper
            style={{
              background: "#2A2B31",
              borderRadius: 4,
              padding: "30px 30px 60px",
            }}
            elevation={0}
          >
            <p
              className='title'
              style={{ textAlign: "center", marginBottom: 15 }}
            >
              Базовый
            </p>
            <Typography
              variant='h3'
              style={{ color: "#FF9900", textAlign: "center" }}
            >
              0.5%
            </Typography>
            <Typography variant='body1' style={{ textAlign: "center" }}>
              за транзакцию
            </Typography>
            <Divider
              style={{
                backgroundColor: "#fff",
                opacity: 0.2,
                margin: "30px 0",
              }}
            />
            <ul
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <li className='rates_list_item'>
                <Typography variant='body1'>Безлимитные инвойсы</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Все валюты</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Вывод без комиссии</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Бесплатная поддержка</Typography>
              </li>
            </ul>
            <GoldButton
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
                minWidth: 300,
                marginTop: 80,
              }}
            >
              Начать
            </GoldButton>
          </Paper>
        </Grid>

        <Grid item md={6}>
          <Paper
            style={{
              background: "#2A2B31",
              borderRadius: 4,
              padding: "30px 30px 60px",
            }}
            elevation={0}
          >
            <p
              className='title'
              style={{ textAlign: "center", marginBottom: 15 }}
            >
              Безлимитный
            </p>
            <Typography
              variant='h3'
              style={{ color: "#FF9900", textAlign: "center" }}
            >
              2000%
            </Typography>
            <Typography variant='body1' style={{ textAlign: "center" }}>
              за месяц
            </Typography>
            <Divider
              style={{
                backgroundColor: "#fff",
                opacity: 0.2,
                margin: "30px 0",
              }}
            />
            <ul
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <li className='rates_list_item'>
                <Typography variant='body1'>Безлимитные инвойсы</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Все валюты</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Вывод без комиссии</Typography>
              </li>
              <li className='rates_list_item'>
                <Typography variant='body1'>Бесплатная поддержка</Typography>
              </li>
            </ul>
            <GoldButton
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
                minWidth: 300,
                marginTop: 80,
              }}
            >
              Начать
            </GoldButton>
          </Paper>
        </Grid>

        <Grid item md={6}>
          <p className='subtitle'>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga
          </p>
        </Grid>

        <Grid item md={6}>
          <p className='subtitle'>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga
          </p>
        </Grid>
      </Grid>
    </Container>
  );
}
