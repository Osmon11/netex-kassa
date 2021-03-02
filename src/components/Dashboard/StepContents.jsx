import {
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { CustomSwitch } from "shared/Buttons/buttons";
import { GoldButton } from "shared/Buttons/buttons";
import { Inputs } from "./Inputs";

export function SecondStep({ handleNext }) {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = React.useState(1);
  const countries = ["Russia", "China", "USA"];

  function prevStep() {
    setTab(tab - 1);
    window.scrollTo(0, 300);
  }
  function nextStep() {
    setTab(tab + 1);
    window.scrollTo(0, 300);
  }
  return (
    <div className={classes.stepContainer}>
      <ToggleButtonGroup
        exclusive
        value={tab}
        style={{ minWidth: xs ? "100%" : 454, maxHeight: 50, marginBottom: 33 }}
        onChange={(_, tab) => setTab(tab)}
      >
        <GoldToggleButton className={classes.toggleBtn} value={1}>
          Шаг 1
        </GoldToggleButton>
        <GoldToggleButton className={classes.toggleBtn} value={2}>
          Шаг 2
        </GoldToggleButton>
        <GoldToggleButton className={classes.toggleBtn} value={3}>
          Шаг 3
        </GoldToggleButton>
      </ToggleButtonGroup>

      {tab === 1 && (
        <>
          <Inputs
            label="Страна регистрации вашей компании"
            items={countries}
            name="country"
            select
          />
          <Inputs
            label="Город регистрации вашей компании"
            name="cityname"
            placeholder="Введите свой город"
          />

          <div
            className="flex_box"
            style={{ justifyContent: "flex-start", marginTop: 20 }}
          >
            <CustomSwitch />
            <Typography variant="body2" style={{ marginLeft: 20 }}>
              Ознакомлен и согласен с{" "}
              <span
                style={{ color: "#ff9900", borderBottom: "1px dashed #ff9900" }}
              >
                тарифом
              </span>
            </Typography>
          </div>
          <div
            className="flex_box"
            style={{ justifyContent: "flex-start", marginTop: 20 }}
          >
            <CustomSwitch />
            <Typography variant="body2" style={{ marginLeft: 20 }}>
              Согласен на сбор персональных данных и с{" "}
              <span
                style={{ color: "#ff9900", borderBottom: "1px dashed #ff9900" }}
              >
                договором присоединения
              </span>
            </Typography>
          </div>

          <div
            className="flex_box"
            style={{
              justifyContent: "space-between",
              width: "50%",
              marginTop: 40,
            }}
          >
            <Button
              className={classes.customBtn}
              onClick={() => setTab(tab - 1)}
              variant="outlined"
            >
              Отмена
            </Button>
            <GoldButton
              style={{ width: "40%" }}
              onClick={() => setTab(tab + 1)}
            >
              Далее
            </GoldButton>
          </div>
        </>
      )}

      {tab === 2 && (
        <>
          <p
            className="subtitle"
            style={{ textTransform: "uppercase", color: "#ff9900" }}
          >
            Общие сведения о вашей компании
          </p>
          <Inputs
            label="Тип организации"
            items={countries}
            name="organizationType"
            select
          />
          <Inputs
            label="Юридиеское название организации"
            name="organization"
            placeholder="Введите название организации"
          />
          <Inputs
            label="Вид деятельности"
            items={countries}
            name="kindOfActivity"
            select
          />
          <Inputs
            label="Скан копия свидетельства о государственной регистрации"
            name="certificate"
            upload
          />
          <Inputs label="Скан копия устава" name="charter" upload />
          <Inputs
            label="Скан решения о создании компании"
            name="decisions"
            upload
          />
          <Inputs
            label="Дата регистрации компании"
            name="dateOfRegistration"
            placeholder="Введите дату регистрации"
            date
          />
          <p
            className="subtitle"
            style={{
              textTransform: "uppercase",
              color: "#ff9900",
              marginTop: 30,
            }}
          >
            Реквизиты
          </p>
          <Inputs label="ИНН" name="INN" placeholder="Введите ИНН" />
          <Inputs label="ОКПО" name="OKPO" placeholder="Введите ОКПО" />
          <Inputs
            label="Наименование банка"
            name="nameOfTheBank"
            placeholder="Введите наименование банка"
          />
          <Inputs label="БИК" name="BIK" placeholder="Введите БИК" />
          <Inputs
            label="Расчетный счет"
            name="checkingAccount"
            placeholder="Введите счет"
          />
          <Inputs label="IBAN" name="IBAN" placeholder="Введите IBAN" />
          <div
            className="flex_box"
            style={{ justifyContent: "flex-start", marginTop: 20 }}
          >
            <CustomSwitch />
            <Typography variant="body2" style={{ marginLeft: 20 }}>
              Организация является плательщиком НДС
            </Typography>
          </div>
          <p
            className="subtitle"
            style={{
              textTransform: "uppercase",
              color: "#ff9900",
              marginTop: 50,
            }}
          >
            Юридический адрес
          </p>
          <Inputs label="Индекс" name="index" placeholder="Введите индекс" />
          <Inputs label="Адрес" name="adress" placeholder="Введите aдрес" />
          <div
            className="flex_box"
            style={{ justifyContent: "flex-start", marginTop: 20 }}
          >
            <CustomSwitch />
            <Typography variant="body2" style={{ marginLeft: 20 }}>
              Фактический адрес не совпадает с юридическим
            </Typography>
          </div>
          <div
            className="flex_box"
            style={{
              justifyContent: "space-between",
              width: "50%",
              marginTop: 40,
            }}
          >
            <Button
              className={classes.customBtn}
              onClick={prevStep}
              variant="outlined"
            >
              Отмена
            </Button>
            <GoldButton style={{ width: "40%" }} onClick={nextStep}>
              Далее
            </GoldButton>
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  stepContainer: {
    borderLeft: "2px solid #ff9900",
    padding: "0 50px",
    marginTop: 33,
    marginLeft: 60,
  },
  toggleBtn: {
    width: "33.33%",
    textTransform: "none",
    color: "#000",
    backgroundColor: "#f5f5f5",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "&:hover": {
      color: "#FF9900",
      backgroundColor: "#fff",
    },
  },
  customBtn: {
    width: "40%",
    minHeight: 50,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      color: "#fff",
      borderColor: "#fff",
    },
  },
}));
