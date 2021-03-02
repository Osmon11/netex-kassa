import {
  Button,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { ThemeInput } from "components/Auth/auth";
import React, { useState } from "react";
import searchIcon from "assets/search-icon.png";
import copyIcon from "assets/copy-icon.png";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { GoldButton } from "shared/Buttons/buttons";

export function ProjectSettings({ match }) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = useState("Инфо");
  const projects = ["Netex.kg", "Bironex", "Интернет магазин Kivano"];

  return (
    <section>
      <div className='flex_box' style={{ justifyContent: "space-between" }}>
        <span className='title' style={{ fontSize: 25 }}>
          {projects[match.params.id[1]]}
        </span>
        <span className='subtitle'>Настройки проекта</span>
      </div>

      <ToggleButtonGroup
        exclusive
        value={tab}
        style={{ minWidth: xs ? "100%" : 350, maxHeight: 50, margin: "33px 0" }}
        onChange={(_, tab) => setTab(tab)}
      >
        <GoldToggleButton value='Инфо'>Инфо</GoldToggleButton>
        <GoldToggleButton value='Настройки'>Настройки</GoldToggleButton>
        <GoldToggleButton value='API'>API</GoldToggleButton>
      </ToggleButtonGroup>

      {tab === "Инфо" && (
        <>
          <p className='subtitle'>Всего: 0.008525172 BTC</p>
          <p className='subtitle'>Ожидание: 0.00000000 BTC</p>
          <div className='flex_box' style={{ justifyContent: "space-between" }}>
            <span className='subtitle'>История транзакций</span>
            <ThemeInput
              margin='dense'
              name='search'
              type='text'
              style={{ width: "40%" }}
              placeholder='Поиск по адресу или TX'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <img src={searchIcon} alt='search' />
                  </InputAdornment>
                ),
              }}
              variant='outlined'
            />
          </div>
          <Grid
            item
            xs={12}
            container
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              marginTop: 40,
              padding: 15,
            }}
          >
            <Grid item xs={3}>
              <Typography variant='body2'>Дата</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>Адрес</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body2'>Сумма</Typography>
            </Grid>
          </Grid>
          {data.map((obj) => (
            <Grid
              item
              xs={12}
              container
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                padding: "25px 15px",
              }}
              key={obj.adress + obj.date}
            >
              <Grid item xs={3}>
                <Typography variant='body2'>{obj.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body2'>{obj.adress}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body2'>{obj.sum}</Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}

      {tab === "Настройки" && (
        <>
          <p className='subtitle'>Удалить кошелек</p>
          <Typography variant='body2' style={{ width: "45%" }}>
            Перед удалением убедитесь, что вы выбрали правильный кошелек.
            Удаление приведет к потере данных и средств на кошельке.
          </Typography>
          <Button
            style={{
              borderColor: "#ff6f6f",
              color: "#ff6f6f",
              fontSize: 16,
              width: 175,
              height: 50,
              marginTop: 20,
            }}
            variant='outlined'
          >
            Удалить
          </Button>
        </>
      )}

      {tab === "API" && (
        <>
          <p className='subtitle'>Идентификатор приложения</p>
          <Typography variant='body2' style={{ lineHeight: "200%" }}>
            Используйте этот идентификатор для создания счета
          </Typography>
          <Typography variant='body2' style={{ lineHeight: "200%" }}>
            ID этого проекта:
            <span style={{ color: "#ff9900", marginLeft: 15 }}>1665870464</span>
          </Typography>

          <p className='subtitle' style={{ marginTop: 65 }}>
            API
          </p>
          <Typography variant='body2' style={{ lineHeight: "200%" }}>
            Access to payments through API
          </Typography>
          <Typography variant='body2' style={{ lineHeight: "200%" }}>
            Для работы с API вам необходимо получить ключ безопасности и токен.
          </Typography>
          <div className='flex_box' style={{ justifyContent: "space-between" }}>
            <span className='subtitle' style={{ fontSize: 16 }}>
              Ключ безопасности:
            </span>
            <ThemeInput
              margin='dense'
              name='key'
              type='text'
              style={{ width: "60%" }}
              value='GykVo9jwGElNwJkcY7V8drVEgGLU3oVE'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <img src={copyIcon} alt='content copy' />
                  </InputAdornment>
                ),
              }}
              variant='outlined'
              disabled
            />
          </div>
          <div className='flex_box' style={{ justifyContent: "space-between" }}>
            <span className='subtitle' style={{ fontSize: 16 }}>
              Скопируйте этот токен:
            </span>
            <ThemeInput
              margin='dense'
              name='token'
              type='text'
              style={{ width: "60%" }}
              value='phnBr6CPBuemFBPgzc2qN1zQEVbw4yp1Qf6OIHLwNRg55Ho39qFYMoUWjmDtY6ZC'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <img src={copyIcon} alt='content copy' />
                  </InputAdornment>
                ),
              }}
              variant='outlined'
              disabled
            />
          </div>
          <GoldButton
            style={{ fontSize: 16, minHeight: 50, width: 200, marginTop: 40 }}
          >
            Получить токен
          </GoldButton>
        </>
      )}
    </section>
  );
}

const data = [
  {
    date: "2021-01-13 18:37:46",
    adress: "https://my.biwse.com/app/1665870464/btc:46",
    sum: "0.000025172 BTC",
  },
  {
    date: "2021-01-07 10:21:51",
    adress: "https://my.biwse.com/app/1665870464/btc:46",
    sum: "0.008500000 BTC",
  },
];
