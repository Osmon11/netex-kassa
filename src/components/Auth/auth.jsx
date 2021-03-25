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

export function Auth({ open, handleClose, login, setLogin }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="auth-dialog">
      <DialogContent
        style={{
          backgroundColor: "#2A2B31",
          padding: "55px 80px 20px",
        }}
      >
        {login ? <SingIn sm={sm} /> : <SingUp sm={sm} />}

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

function SingIn({ sm }) {
  const [fogetPassword, setPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const validate = Yup.object({
    email: Yup.string().required("Поле должно быть заполнена"),
    password: Yup.number()
      .min(8, "Пароль должен быть не меньше 8")
      .required("Поле должно быть заполнена"),
  });

  useEffect(() => {
    if (localStorage.password && localStorage.email) {
      setValues({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      });
    }
  }, [setValues]);

  function submitHandler(e) {
    console.log(e);
  }
  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={values}
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
            {fogetPassword ? "Восстановление пароля" : "Вход"}
          </p>
        ) : null}
        <Typography variant="body2" style={{ marginTop: 15 }}>
          Ваша почта
        </Typography>
        <InputComponent placeholder="Введите почту" name="email" type="email" />
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
  );
}

function SingUp({ sm }) {
  const validate = Yup.object({
    username: Yup.string().required("Поле должно быть заполнена"),
    email: Yup.string().required("Поле должно быть заполнена"),
    password: Yup.number()
      .min(8, "Пароль должен быть не меньше 8")
      .required("Поле должно быть заполнена"),
    confirmPassword: Yup.number()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Поле должно быть заполнена"),
  });

  function submitHandler(e) {
    console.log(e);
  }
  return (
    <Formik
      onSubmit={submitHandler}
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
          name="username"
          type="text"
        />
        <Typography variant="body2" style={{ marginTop: 15 }}>
          Почта
        </Typography>
        <InputComponent placeholder="Введите почту" name="email" type="email" />
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
          name="confirmPassword"
          type="password"
        />
        <GoldButton style={{ ...btnStyle }} type={"submit"}>
          Зарегистрироваться
        </GoldButton>
      </Form>
    </Formik>
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
