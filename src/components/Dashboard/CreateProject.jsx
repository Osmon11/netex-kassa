import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import checkIcon from "assets/check.png";
import { NavLink } from "react-router-dom";
import { GoldButton } from "shared/Buttons/buttons";
import { VerticalStepper } from "./VerticalStepper";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ValidatedInput } from "./Inputs";
import { useDispatch, useSelector } from "react-redux";
import { addMerchant, getMerchants } from "store/reducer";
import { setAlert } from "store/actionCreators";

const initialValues = {
  name: "Netex UZ",
  domain: "netex.uz",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Поле должно быть заполнена"),
  domain: Yup.string().required("Поле должно быть заполнена"),
});

export function CreateProject() {
  const classes = useStyles();
  const [isSuccess, setSuccess] = useState(false);
  const [isSecondStep, setSecondStep] = useState(false);
  const [newMerchant, setNewMerchant] = useState(null);
  const dispatch = useDispatch();

  function submitHandler(fields) {
    setSecondStep((isSecondStep) => !isSecondStep);
    setNewMerchant(fields);
  }
  function callbackHandler(fields) {
    dispatch(
      addMerchant({ ...newMerchant, ...fields }, (error) => {
        if (Boolean(error)) {
          dispatch(setAlert({ open: true, severity: "error", message: error }));
        } else {
          setSuccess(true);
          dispatch(getMerchants());
        }
      })
    );
  }
  return (
    <>
      {isSuccess ? (
        <Success />
      ) : isSecondStep ? (
        <VerticalStepper
          callback={callbackHandler}
          handlePrev={() => setSecondStep((isSecondStep) => !isSecondStep)}
        />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          <Form>
            <section
              style={{ width: "100%", paddingLeft: "10%", paddingTop: 142 }}
            >
              <Paper
                style={{
                  width: "50%",
                  padding: "53px 81px",
                  backgroundColor: "#2A2B31",
                }}
              >
                <p
                  className='title'
                  style={{
                    textAlign: "center",
                    marginTop: 0,
                    marginBottom: 50,
                  }}
                >
                  Создать новый проект
                </p>
                <Typography variant='body2' style={{ marginTop: 15 }}>
                  Название проекта
                </Typography>
                <ValidatedInput
                  name='name'
                  placeholder='Введите название проекта'
                  style={{ marginBottom: 10 }}
                  fullWidth
                />
                <Typography variant='body2' style={{ marginTop: 15 }}>
                  URL
                </Typography>
                <ValidatedInput
                  name='domain'
                  placeholder='Введите URL'
                  style={{ marginBottom: 10 }}
                  fullWidth
                />
                <div
                  className='flex_box'
                  style={{ justifyContent: "space-between", marginTop: 45 }}
                >
                  <NavLink
                    to='/dashboard'
                    style={{ textDecoration: "none", width: "40%" }}
                  >
                    <Button className={classes.customBtn} variant='outlined'>
                      Отмена
                    </Button>
                  </NavLink>
                  <GoldButton
                    style={{ minHeight: 50, width: "40%", fontSize: 16 }}
                    type='submit'
                  >
                    Далее
                  </GoldButton>
                </div>
              </Paper>
            </section>
          </Form>
        </Formik>
      )}
    </>
  );
}

function Success() {
  return (
    <div className='flex_vertical'>
      <img src={checkIcon} alt='' />
      <p className='title' style={{ marginTop: 10 }}>
        Успешно!
      </p>
      <p className='subtitle' style={{ textAlign: "center", marginTop: 40 }}>
        Ваш проект был успешно создан, для дальнейшем работы ваш проект должен
        пройти модерацию. Ожидайте проверку, ответ мы вышли Вам на почту в
        течении 72 часов
      </p>
      <NavLink
        to='/dashboard'
        style={{ textDecoration: "none", width: "100%", textAlign: "center" }}
      >
        <GoldButton style={{ minHeight: 50, marginTop: 30, width: "40%" }}>
          Закрыть
        </GoldButton>
      </NavLink>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  customBtn: {
    width: "100%",
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
