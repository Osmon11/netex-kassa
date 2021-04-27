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
import closeIcon from "../../assets/close-icon.png";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  accountActivation,
  login,
  resendActivationCode,
  restorePassword,
  singup,
} from "store/actions/sign";
import { setAlert } from "store/actionCreators";
import { ValidatedInput } from "components/Dashboard/Inputs";

export function Auth({ open, handleClose, login, setLogin }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  function alertHandler(options) {
    dispatch(setAlert(options));
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-dialog"
      className="dialog"
    >
      <DialogContent
        className="auth-container"
        style={{
          backgroundColor: "#2A2B31",
          padding: "55px 80px 20px",
        }}
      >
        {login ? (
          <SingIn sm={sm} setAlert={alertHandler} handleClose={handleClose} />
        ) : (
          <SingUp sm={sm} setAlert={alertHandler} />
        )}

        <div className="flex_box" style={{ margin: "20px 0" }}>
          <Typography
            variant="body2"
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

function SingIn({ sm, setAlert, handleClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fogetPassword, setPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [values, setValues] = useState({
    phone: "0504543444",
    password: "123",
  });
  const validate = Yup.object({
    phone: Yup.string()
      .max(12, "Убедитесь, что это значение содержит не более 12 символов.")
      .required("Поля должно быть заполнена"),
    password: Yup.string()
      // .min(8, "Пароль должен быть не меньше 8")
      .required("Поле должно быть заполнена"),
  });

  // useEffect(() => {
  //   if (localStorage.password && localStorage.phone) {
  //     setValues({
  //       phone: localStorage.getItem("phone"),
  //       password: localStorage.getItem("password"),
  //     });
  //   }
  // }, [setValues]);

  function submitHandler(fields) {
    if (fogetPassword) {
      return dispatch(restorePassword(fields.phone));
    }
    dispatch(
      login(fields, (alert) => {
        setAlert(alert);
        if (alert.severity === "success") {
          handleClose();
          history.push("/dashboard");
        }
      })
    );
  }
  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={values}
        validationSchema={validate}
      >
        <Form className="auth-form">
          {sm ? (
            <p
              className="title"
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
          <Typography variant="body2" style={{ marginTop: 15 }}>
            Телефон
          </Typography>
          <InputComponent
            placeholder="Введите номер"
            name="phone"
            type="number"
          />
          {!fogetPassword ? (
            <>
              <Typography variant="body2" style={{ marginTop: 15 }}>
                Пароль
              </Typography>
              <InputComponent
                placeholder="Введите пароль"
                name="password"
                type="password"
              />
              <div
                className="flex_box"
                style={{ justifyContent: "space-between" }}
              >
                <span className="flex_box">
                  <Checkbox
                    name="rememberMe"
                    style={{ color: "#fff" }}
                    onClick={() => setRemember(true)}
                  />
                  <Typography variant="body2">Запомнить пароль</Typography>
                </span>

                <span
                  className="nav_link"
                  style={{ fontSize: 16 }}
                  onClick={() => setPassword(true)}
                >
                  Забыли пароль?
                </span>
              </div>
            </>
          ) : null}

          <GoldButton style={{ ...btnStyle }} type={"submit"}>
            {fogetPassword ? "Отправить на почту" : "Войти"}
          </GoldButton>
        </Form>
      </Formik>
    </>
  );
}

function SingUp({ sm, setAlert }) {
  const [enterCode, setCodeField] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [userPhone, setUserPhone] = useState("0709683738");
  const [timeleft, setTimeLeft] = useState(30);
  const dispatch = useDispatch();
  let seconds = Math.floor(timeleft % 60);
  const validate = Yup.object({
    firstname: Yup.string().required("Поле должно быть заполнена"),
    lastname: Yup.string().required("Поле должно быть заполнена"),
    email: Yup.string().required("Поле должно быть заполнена"),
    phone: Yup.string()
      .max(12, "Убедитесь, что это значение содержит не более 12 символов.")
      .required("Поля должно быть заполнена"),
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
  }, [timeleft, enterCode]);

  function submitHandler({ phone, ...fields }) {
    let phoneIsCorrect = phone[0] === "0" ? phone : "0" + phone;
    console.log(phoneIsCorrect);
    setUserPhone({ phone: phoneIsCorrect });
    dispatch(
      singup({ ...fields, phone: phoneIsCorrect }, (data) => {
        if (Boolean(data.messages)) {
          setAlert({ open: true, severity: "error", message: data.messages });
          return;
        }
        setCodeField(true);
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
          onSubmit={({ code }) =>
            dispatch(accountActivation({ phone: userPhone, code }))
          }
        >
          <Form>
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Введите полученный код сюда
            </Typography>
            <ValidatedInput
              placeholder="Код активации"
              name="code"
              type="number"
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
              onClick={() =>
                dispatch(
                  resendActivationCode(userPhone, (message) =>
                    setAlert({ ...alert, message })
                  )
                )
              }
              fullWidth
            >
              Отправить повторно {seconds > 0 && `через ${seconds}сек`}
            </GoldButton>
            <GoldButton
              type="submit"
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
            firstname: "askar",
            lastname: "begaliev",
            email: "askarrbegaliev@gmail.com",
            phone: "0709683738",
            password: "Askar0102",
            password_two: "Askar0102",
          }}
          validationSchema={validate}
        >
          <Form>
            {sm ? (
              <p
                className="title"
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
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Имя
            </Typography>
            <InputComponent
              placeholder="Введите Ваше имя"
              name="firstname"
              type="text"
            />
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Фамилия
            </Typography>
            <InputComponent
              placeholder="Введите Вашу фамилию"
              name="lastname"
              type="text"
            />
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Почта
            </Typography>
            <InputComponent
              placeholder="Введите email"
              name="email"
              type="email"
            />
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Телефон
            </Typography>
            <InputComponent
              placeholder="Введите номер"
              name="phone"
              type="number"
            />
            <Typography variant="body2" style={{ marginTop: 15 }}>
              Пароль
            </Typography>
            <InputComponent
              placeholder="Введите пароль"
              name="password"
              type="password"
            />
            <InputComponent
              placeholder="Повторите пароль"
              name="password_two"
              type="password"
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
      margin="dense"
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.error ? <ErrorMessage name={field.name} /> : ""}
      variant="outlined"
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
