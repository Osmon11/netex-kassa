import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { CustomSwitch } from "shared/Buttons/buttons";
import { GoldButton } from "shared/Buttons/buttons";
import { Inputs } from "./Inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivityTypes,
  getCountries,
  getOrganizations,
} from "store/reducer";
import { setAlert } from "store/actionCreators";

const firstTabValues = {
  country: 1,
  city: "Tashkent",
};

const secondTabValues = {
  city: "Bishkek",
  country: 1,
  organization_type: 1,
  legal_name: "Netex UZ",
  activity_type: 6,
  company_reg_date: "12-04-2020",
  inn: "INN",
  okpo: "OKPO",
  bik: "BIK",
  bank_name: "Bank Name",
  checking_account: "Checking Account",
  iban: "iBan",
  decisions: "",
  certificate: "",
  upload_file: "",
};

const validateFirstTab = Yup.object({
  country: Yup.string().required("Поле должно быть заполнена"),
  city: Yup.string().required("Поле должно быть заполнена"),
});

const validateSecondTab = Yup.object({
  organization_type: Yup.string().required("Поле должно быть заполнена"),
  legal_name: Yup.string().required("Поле должно быть заполнена"),
  activity_type: Yup.string().required("Поле должно быть заполнена"),
  company_reg_date: Yup.string().required("Поле должно быть заполнена"),
  inn: Yup.string().required("Поле должно быть заполнена"),
  okpo: Yup.string().required("Поле должно быть заполнена"),
  bik: Yup.string().required("Поле должно быть заполнена"),
  bank_name: Yup.string().required("Поле должно быть заполнена"),
  checking_account: Yup.string().required("Поле должно быть заполнена"),
  iban: Yup.string().required("Поле должно быть заполнена"),
});

export function SecondStep({ handleNext, callback, handlePrev }) {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const [tab, setTab] = React.useState(1);
  const [isPending, setPending] = React.useState(false);
  const data = useSelector((store) => store.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.countries) {
      dispatch(
        getCountries((error) => {
          if (Boolean(error)) {
            dispatch(
              setAlert({ open: true, severity: "error", message: error })
            );
          }
        })
      );
      dispatch(
        getOrganizations((error) => {
          if (Boolean(error)) {
            dispatch(
              setAlert({ open: true, severity: "error", message: error })
            );
          }
        })
      );
      dispatch(
        getActivityTypes((error) => {
          if (Boolean(error)) {
            dispatch(
              setAlert({ open: true, severity: "error", message: error })
            );
          }
        })
      );
    }
  }, [dispatch, data]);

  function submitHandler(fields) {
    setPending(true);
    callback(fields);
    // setTimeout(() => {
    //   setPending(false);
    // }, 3000);
  }
  function prevStep() {
    setTab(tab - 1);
    window.scrollTo(0, 300);
  }
  function nextStep() {
    setTab(tab + 1);
    window.scrollTo(0, 300);
  }
  function Loader() {
    return (
      <div className="flex_box">
        <CircularProgress />
      </div>
    );
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
      </ToggleButtonGroup>

      {tab === 1 && (
        <Formik
          initialValues={firstTabValues}
          validationSchema={validateFirstTab}
          onSubmit={submitHandler}
        >
          <Form>
            {data.countries ? (
              <Inputs
                label="Страна регистрации вашей компании"
                items={data.countries}
                name="country"
                select
              />
            ) : (
              <Loader />
            )}
            <Inputs
              label="Город регистрации вашей компании"
              name="city"
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
                  style={{
                    color: "#ff9900",
                    borderBottom: "1px dashed #ff9900",
                  }}
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
                  style={{
                    color: "#ff9900",
                    borderBottom: "1px dashed #ff9900",
                  }}
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
                onClick={handlePrev}
                variant="outlined"
              >
                Назад
              </Button>
              <GoldButton style={{ width: "40%" }} onClick={nextStep}>
                Далее
              </GoldButton>
            </div>
          </Form>
        </Formik>
      )}

      {tab === 2 && (
        <Formik
          initialValues={secondTabValues}
          validationSchema={validateSecondTab}
          onSubmit={submitHandler}
        >
          <Form>
            <p
              className="subtitle"
              style={{ textTransform: "uppercase", color: "#ff9900" }}
            >
              Общие сведения о вашей компании
            </p>
            {data.organizationTypes ? (
              <Inputs
                label="Тип организации"
                items={data.organizationTypes}
                name="organization_type"
                select
              />
            ) : (
              <Loader />
            )}
            <Inputs
              label="Юридиеское название организации"
              name="legal_name"
              placeholder="Введите название организации"
            />
            {data.activityTypes ? (
              <Inputs
                label="Вид деятельности"
                items={data.activityTypes}
                name="activity_type"
                select
              />
            ) : (
              <Loader />
            )}
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
              name="company_reg_date"
              placeholder="Введите в формате dd-mm-yyyy"
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
            <Inputs label="ИНН" name="inn" placeholder="Введите ИНН" />
            <Inputs label="ОКПО" name="okpo" placeholder="Введите ОКПО" />
            <Inputs
              label="Наименование банка"
              name="bank_name"
              placeholder="Введите наименование банка"
            />
            <Inputs label="БИК" name="bik" placeholder="Введите БИК" />
            <Inputs
              label="Расчетный счет"
              name="checking_account"
              placeholder="Введите счет"
            />
            <Inputs label="IBAN" name="iban" placeholder="Введите IBAN" />
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
              <GoldButton
                style={{ width: "40%" }}
                type="submit"
                disabled={isPending}
              >
                Далее
              </GoldButton>
            </div>
          </Form>
        </Formik>
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
