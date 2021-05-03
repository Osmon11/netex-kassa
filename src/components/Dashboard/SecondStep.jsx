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
import { setAlert, setData } from "store/actionCreators";
import { NavLink } from "react-router-dom";

const validateFirstTab = Yup.object({
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
  const newMerchant = data.addMerchant;
  const dispatch = useDispatch();
  const [checkBoxes, setCheckbox] = React.useState({
    rates: false,
    contract: false,
  });

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
    }
    if (!data.organizationTypes) {
      dispatch(
        getOrganizations((error) => {
          if (Boolean(error)) {
            dispatch(
              setAlert({ open: true, severity: "error", message: error })
            );
          }
        })
      );
    }
    if (!data.activityTypes) {
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
  }, [dispatch, data.countries, data.organizationTypes, data.activityTypes]);

  function submitFirstTab(fields) {
    console.log(fields);
    if (checkBoxes.contract && checkBoxes.rates) {
      dispatch(setData({ addMerchant: { ...newMerchant, ...fields } }));
      nextStep();
    } else {
      dispatch(
        setAlert({ open: true, severity: "error", message: "Отметьте флажок" })
      );
    }
  }
  function submitSecondTab(fields) {
    setPending(true);
    dispatch(setData({ addMerchant: { ...newMerchant, ...fields } }));
    callback();
    setTimeout(() => {
      setPending(false);
    }, 3000);
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
      <div className='flex_box'>
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
          initialValues={{
            country: newMerchant.country,
            city: newMerchant.city,
          }}
          validationSchema={validateFirstTab}
          onSubmit={submitFirstTab}
        >
          <Form>
            {data.countries ? (
              <Inputs
                label='Страна регистрации вашей компании'
                value={newMerchant.country}
                handleChange={(e) => {
                  dispatch(
                    setData({
                      addMerchant: { ...newMerchant, country: e.target.value },
                    })
                  );
                }}
                items={data.countries}
                name='country'
                select
              />
            ) : (
              <Loader />
            )}
            <Inputs
              label='Город регистрации вашей компании'
              name='city'
              placeholder='Введите свой город'
            />

            <div
              className='flex_box'
              style={{ justifyContent: "flex-start", marginTop: 20 }}
            >
              <CustomSwitch
                checked={checkBoxes.rates}
                onChange={(e) =>
                  setCheckbox({ ...checkBoxes, rates: e.target.checked })
                }
              />
              <Typography variant='body2' style={{ marginLeft: 20 }}>
                Ознакомлен и согласен с{" "}
                <NavLink
                  to='/rates'
                  style={{
                    color: "#ff9900",
                    borderBottom: "1px dashed #ff9900",
                    textDecoration: "none",
                  }}
                >
                  тарифом
                </NavLink>
              </Typography>
            </div>
            <div
              className='flex_box'
              style={{ justifyContent: "flex-start", marginTop: 20 }}
            >
              <CustomSwitch
                checked={checkBoxes.contract}
                onChange={(e) =>
                  setCheckbox({ ...checkBoxes, contract: e.target.checked })
                }
              />
              <Typography variant='body2' style={{ marginLeft: 20 }}>
                Согласен на сбор персональных данных и с{" "}
                <a
                  href='http://odigital.app'
                  style={{
                    color: "#ff9900",
                    borderBottom: "1px dashed #ff9900",
                    textDecoration: "none",
                  }}
                >
                  договором присоединения
                </a>
              </Typography>
            </div>

            <div
              className='flex_box'
              style={{
                justifyContent: "space-between",
                width: "50%",
                marginTop: 40,
              }}
            >
              <Button
                className={classes.customBtn}
                onClick={handlePrev}
                variant='outlined'
              >
                Назад
              </Button>
              <GoldButton style={{ width: "40%" }} type='submit'>
                Далее
              </GoldButton>
            </div>
          </Form>
        </Formik>
      )}

      {tab === 2 && (
        <Formik
          initialValues={{
            organization_type: newMerchant.organization_type,
            legal_name: newMerchant.legal_name,
            activity_type: newMerchant.activity_type,
            company_reg_date: newMerchant.company_reg_date,
            inn: newMerchant.inn,
            okpo: newMerchant.okpo,
            bik: newMerchant.bik,
            bank_name: newMerchant.bank_name,
            checking_account: newMerchant.checking_account,
            iban: newMerchant.iban,
            decisions: newMerchant.decisions,
            certificate: newMerchant.certificate,
            upload_file: newMerchant.upload_file,
          }}
          validationSchema={validateSecondTab}
          onSubmit={submitSecondTab}
        >
          <Form>
            <p
              className='subtitle'
              style={{ textTransform: "uppercase", color: "#ff9900" }}
            >
              Общие сведения о вашей компании
            </p>
            {data.organizationTypes ? (
              <Inputs
                label='Тип организации'
                value={newMerchant.organization_type}
                items={data.organizationTypes}
                handleChange={(e) => {
                  dispatch(
                    setData({
                      addMerchant: {
                        ...newMerchant,
                        organization_type: e.target.value,
                      },
                    })
                  );
                }}
                name='organization_type'
                select
              />
            ) : (
              <Loader />
            )}
            <Inputs
              label='Юридиеское название организации'
              name='legal_name'
              placeholder='Введите название организации'
              value={newMerchant.legal_name}
            />
            {data.activityTypes ? (
              <Inputs
                label='Вид деятельности'
                items={data.activityTypes}
                value={newMerchant.activity_type}
                handleChange={(e) => {
                  dispatch(
                    setData({
                      addMerchant: {
                        ...newMerchant,
                        activity_type: e.target.value,
                      },
                    })
                  );
                }}
                name='activity_type'
                select
              />
            ) : (
              <Loader />
            )}
            <Inputs
              label='Скан копия свидетельства о государственной регистрации'
              name='certificate'
              value={newMerchant.certificate}
              upload
            />
            <Inputs
              label='Скан копия устава'
              name='charter'
              value={newMerchant.charter}
              upload
            />
            <Inputs
              label='Скан решения о создании компании'
              name='decisions'
              value={newMerchant.decisions}
              upload
            />
            <Inputs
              label='Дата регистрации компании'
              name='company_reg_date'
              placeholder='Введите в формате dd-mm-yyyy'
              value={newMerchant.company_reg_date}
              date
            />
            <p
              className='subtitle'
              style={{
                textTransform: "uppercase",
                color: "#ff9900",
                marginTop: 30,
              }}
            >
              Реквизиты
            </p>
            <Inputs
              label='ИНН'
              name='inn'
              placeholder='Введите ИНН'
              value={newMerchant.inn}
            />
            <Inputs
              label='ОКПО'
              name='okpo'
              placeholder='Введите ОКПО'
              value={newMerchant.okpo}
            />
            <Inputs
              label='Наименование банка'
              name='bank_name'
              placeholder='Введите наименование банка'
              value={newMerchant.bank_name}
            />
            <Inputs
              label='БИК'
              name='bik'
              placeholder='Введите БИК'
              value={newMerchant.bik}
            />
            <Inputs
              label='Расчетный счет'
              name='checking_account'
              placeholder='Введите счет'
              value={newMerchant.checking_account}
            />
            <Inputs
              label='IBAN'
              name='iban'
              placeholder='Введите IBAN'
              value={newMerchant.iban}
            />
            <div
              className='flex_box'
              style={{ justifyContent: "flex-start", marginTop: 20 }}
            >
              <CustomSwitch />
              <Typography variant='body2' style={{ marginLeft: 20 }}>
                Организация является плательщиком НДС
              </Typography>
            </div>
            <p
              className='subtitle'
              style={{
                textTransform: "uppercase",
                color: "#ff9900",
                marginTop: 50,
              }}
            >
              Юридический адрес
            </p>
            <Inputs
              label='Индекс'
              name='index'
              placeholder='Введите индекс'
              value={newMerchant.index}
            />
            <Inputs
              label='Адрес'
              name='adress'
              placeholder='Введите aдрес'
              value={newMerchant.adress}
            />
            <div
              className='flex_box'
              style={{ justifyContent: "flex-start", marginTop: 20 }}
            >
              <CustomSwitch />
              <Typography variant='body2' style={{ marginLeft: 20 }}>
                Фактический адрес не совпадает с юридическим
              </Typography>
            </div>
            <div
              className='flex_box'
              style={{
                justifyContent: "space-between",
                width: "50%",
                marginTop: 40,
              }}
            >
              <Button
                className={classes.customBtn}
                onClick={prevStep}
                variant='outlined'
              >
                Отмена
              </Button>
              <GoldButton
                style={{ width: "40%" }}
                type='submit'
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
