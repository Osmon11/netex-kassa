import {
  Checkbox,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { GoldButton } from "shared/Buttons/buttons";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  accountActivation,
  login,
  resendActivationCode,
  restorePassword,
  singup,
} from "store/actions/sign";
import { setAlert, setBackdrop } from "store/actionCreators";
import { ValidatedInput } from "components/Dashboard/Inputs";

export function Auth({ open, handleClose, login, setLogin }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [enterCode, setCodeField] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [timeleft, setTimeLeft] = useState(90);

  function alertHandler(options) {
    dispatch(setAlert(options));
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='auth-dialog'
      className='dialog'
    >
      <DialogContent
        className='auth-container'
        style={{
          backgroundColor: "#2A2B31",
          padding: "55px 80px 20px",
        }}
      >
        {login ? (
          <SingIn
            sm={sm}
            setAlert={alertHandler}
            handleClose={handleClose}
            setLogin={setLogin}
            setCodeField={(value) => setCodeField(value)}
            setUserEmail={(value) => setUserEmail(value)}
            setTimeLeft={(value) => setTimeLeft(value)}
          />
        ) : (
          <SingUp
            sm={sm}
            setAlert={alertHandler}
            setLogin={setLogin}
            enterCode={enterCode}
            setCodeField={(value) => setCodeField(value)}
            userEmail={userEmail}
            setUserEmail={(value) => setUserEmail(value)}
            timeleft={timeleft}
            setTimeLeft={(value) => setTimeLeft(value)}
          />
        )}

        <div className='flex_box' style={{ margin: "20px 0" }}>
          <Typography
            variant='body2'
            style={{ width: "100%", textAlign: "center" }}
          >
            {login ? "У вас нет учетной записи?" : "У вас уже есть аккаунт?"}{" "}
            <span
              style={{ color: "#FF9900", cursor: "pointer", marginLeft: 10 }}
              onClick={() => setLogin(!login)}
            >
              {login ? "Зарегистрироваться" : "Войти"}
            </span>
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SingIn({
  sm,
  setAlert,
  handleClose,
  setLogin,
  setCodeField,
  setUserEmail,
  setTimeLeft,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fogetPassword, setPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [values, setValues] = useState({
    email: "osmonabdimannan@gmail.com",
    password: "qwqwqwW1",
  });
  const validate = Yup.object({
    email: Yup.string().email().required("Поля должно быть заполнена"),
    password: Yup.string()
      // .min(8, "Пароль должен быть не меньше 8")
      .required("Поле должно быть заполнена"),
  });

  function submitHandler(fields) {
    dispatch(setBackdrop(true));
    if (fogetPassword) {
      return dispatch(
        restorePassword(fields, () => {
          dispatch(setBackdrop(false));
          setLogin(true);
        })
      );
    }
    if (remember) {
      setValues({
        ...fields,
      });
    }
    dispatch(
      login(
        {
          ...fields,
        },
        (alert) => {
          dispatch(setBackdrop(false));
          setAlert(alert);
          if (alert.message === "Ваш аккаунт еще не активирован!") {
            dispatch(
              resendActivationCode(
                { email: fields.email },
                (message, next_send_time) => {
                  if (Boolean(next_send_time)) {
                    console.log(next_send_time);
                    setTimeLeft(parseInt(next_send_time));
                  }
                  if (Boolean(message)) {
                    setAlert({
                      open: true,
                      severity: Boolean(next_send_time) ? "error" : "success",
                      message,
                    });
                  }
                }
              )
            );
            setCodeField(true);
            setLogin(false);
            setUserEmail({ email: fields.email });
          }
          if (alert.severity === "success") {
            handleClose();
            history.push("/dashboard");
          }
        }
      )
    );
  }
  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={values}
        validationSchema={validate}
      >
        <Form className='auth-form'>
          {sm ? (
            <p
              className='title'
              style={{
                fontSize: 25,
                textAlign: "center",
                marginBottom: 40,
                marginTop: 0,
              }}
            >
              {fogetPassword ? "Восстановление пароля" : "Вход"}
            </p>
          ) : null}
          <Typography
            variant='body2'
            style={{ marginTop: 15, marginBottom: 8 }}
          >
            Почта
          </Typography>
          <InputComponent
            autoComplete='off'
            placeholder='Введите email'
            name='email'
            type='email'
          />
          {!fogetPassword ? (
            <>
              <Typography
                variant='body2'
                style={{ marginTop: 15, marginBottom: 8 }}
              >
                Пароль
              </Typography>
              <InputComponent
                autoComplete='off'
                placeholder='Введите пароль'
                name='password'
                type='password'
              />
              <div
                className='flex_box'
                style={{ justifyContent: "space-between" }}
              >
                <span className='flex_box'>
                  <Checkbox
                    name='rememberMe'
                    style={{ color: "#fff" }}
                    onClick={() => setRemember(true)}
                  />
                  <Typography variant='body2'>Запомнить пароль</Typography>
                </span>

                <span
                  className='nav_link'
                  style={{ fontSize: 16 }}
                  onClick={() => setPassword(true)}
                >
                  Забыли пароль?
                </span>
              </div>
            </>
          ) : null}

          <GoldButton style={{ ...btnStyle }} type={"submit"}>
            {fogetPassword ? "Отправить пароль" : "Войти"}
          </GoldButton>
        </Form>
      </Formik>
    </>
  );
}

function SingUp({
  sm,
  setAlert,
  setLogin,
  setCodeField,
  enterCode,
  userEmail,
  setUserEmail,
  timeleft,
  setTimeLeft,
}) {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  let minutes = Math.floor((timeleft % (60 * 60)) / 60);
  let seconds = Math.floor(timeleft % 60);
  const validate = Yup.object({
    firstname: Yup.string().required("Поле должно быть заполнена"),
    lastname: Yup.string().required("Поле должно быть заполнена"),
    email: Yup.string().required("Поле должно быть заполнена"),
    password: Yup.string()
      .min(8, "Пароль должен быть не меньше 8")
      .required("Поле должно быть заполнена"),
    password_two: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Поле должно быть заполнена"),
  });

  useEffect(() => {
    if (enterCode) {
      const timer =
        timeleft > 0
          ? setInterval(() => setTimeLeft(timeleft - 1), 1000)
          : setBtnDisabled(false);
      return () => clearInterval(timer);
    }
  }, [timeleft, enterCode, setTimeLeft]);

  function submitHandler(fields) {
    dispatch(setBackdrop(true));
    setUserEmail({ email: fields.email });
    dispatch(
      singup(fields, (data) => {
        dispatch(setBackdrop(false));
        if (Boolean(data.messages)) {
          setAlert({ open: true, severity: "error", message: data.messages });
          return;
        }
        setCodeField(true);
      })
    );
  }
  function codeSubmit({ code }) {
    dispatch(setBackdrop(true));
    dispatch(
      accountActivation({ ...userEmail, code }, (success) => {
        dispatch(setBackdrop(false));
        setAlert({
          open: true,
          severity: "success",
          message: "Ваш аккаунт был успешно активирован",
        });
        setLogin(true);
      })
    );
  }

  return (
    <>
      {enterCode ? (
        <Formik
          initialValues={{ code: "" }}
          validationSchema={Yup.object({
            code: Yup.number().required("Поле должно быть заполнена"),
          })}
          onSubmit={codeSubmit}
        >
          <Form>
            <Typography
              variant='body2'
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              Введите полученный код сюда
            </Typography>
            <ValidatedInput
              placeholder='Код активации'
              name='code'
              style={{ width: "100%", marginBottom: 0 }}
            />
            <GoldButton
              style={{
                minHeight: 50,
                minWidth: 195,
                fontSize: 16,
                marginTop: 20,
              }}
              disabled={btnDisabled}
              onClick={() => {
                dispatch(
                  resendActivationCode(userEmail, (message) =>
                    setAlert({ ...alert, message })
                  )
                );
                setBtnDisabled(true);
                setTimeLeft(90);
              }}
              fullWidth
            >
              {`Отправить повторно
              ${timeleft > 0 ? `через ${minutes}мин ${seconds}сек` : ""}`}
            </GoldButton>
            <GoldButton
              type='submit'
              style={{
                minHeight: 50,
                minWidth: 195,
                fontSize: 16,
                marginTop: 20,
              }}
              fullWidth
            >
              Подвердить
            </GoldButton>
          </Form>
        </Formik>
      ) : (
        <Formik
          onSubmit={submitHandler}
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_two: "",
          }}
          validationSchema={validate}
        >
          <Form>
            {sm ? (
              <p
                className='title'
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  marginBottom: 40,
                  marginTop: 0,
                }}
              >
                Регистрация
              </p>
            ) : null}
            <Typography
              variant='body2'
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              Имя
            </Typography>
            <InputComponent
              autoComplete='off'
              placeholder='Введите Ваше имя'
              name='firstname'
              type='text'
            />
            <Typography
              variant='body2'
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              Фамилия
            </Typography>
            <InputComponent
              autoComplete='off'
              placeholder='Введите Вашу фамилию'
              name='lastname'
              type='text'
            />
            <Typography
              variant='body2'
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              Почта
            </Typography>
            <InputComponent
              autoComplete='off'
              placeholder='Введите email'
              name='email'
              type='email'
            />
            <Typography
              variant='body2'
              style={{ marginTop: 15, marginBottom: 8 }}
            >
              Пароль
            </Typography>
            <InputComponent
              autoComplete='off'
              placeholder='Введите пароль'
              name='password'
              type='password'
              style={{ marginBottom: 16 }}
            />
            <InputComponent
              autoComplete='off'
              placeholder='Повторите пароль'
              name='password_two'
              type='password'
            />
            <GoldButton style={{ ...btnStyle }} type={"submit"}>
              Зарегистрироваться
            </GoldButton>
          </Form>
        </Formik>
      )}
    </>
  );
}

const InputComponent = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <ThemeInput
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.error ? <ErrorMessage name={field.name} /> : ""}
      variant='outlined'
      fullWidth
    />
  );
};

export const ThemeInput = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      fontWeight: 300,
      fontSize: 16,
      fontFamily: "Roboto",
      color: "#595959",
      border: "none",
      backgroundColor: "#F5F5F5",
    },
  },
})(TextField);

let btnStyle = {
  minHeight: 50,
  marginTop: 40,
  minWidth: 195,
  marginLeft: "50%",
  fontSize: 16,
  transform: "translateX(-50%)",
};
