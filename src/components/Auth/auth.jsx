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
import React, { useState } from "react";
import { GoldButton } from "shared/Buttons/buttons";

export function Auth({ open, handleClose, login, setLogin }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='auth-dialog'>
      <DialogContent
        style={{
          backgroundColor: "#2A2B31",
          padding: "55px 80px 20px",
        }}
      >
        {login ? <SingIn sm={sm} /> : <SingUp sm={sm} />}

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

function SingIn({ sm }) {
  const [fogetPassword, setPassword] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
  }
  return (
    <>
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
      <form onSubmit={submitHandler}>
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Ваша почта
        </Typography>
        <ThemeInput
          margin='dense'
          placeholder='Введите почту'
          name='email'
          type='email'
          variant='outlined'
          fullWidth
        />
        {!fogetPassword ? (
          <>
            <Typography variant='body2' style={{ marginTop: 15 }}>
              Пароль
            </Typography>
            <ThemeInput
              margin='dense'
              placeholder='Введите пароль'
              name='password'
              type='password'
              variant='outlined'
              fullWidth
            />
            <div
              className='flex_box'
              style={{ justifyContent: "space-between" }}
            >
              <span className='flex_box'>
                <Checkbox name='rememberMe' style={{ color: "#fff" }} />
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
          {fogetPassword ? "Отправить на почту" : "Войти"}
        </GoldButton>
      </form>
    </>
  );
}

function SingUp({ sm }) {
  function submitHandler(e) {
    e.preventDefault();
  }
  return (
    <>
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
      <form onSubmit={submitHandler}>
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Имя
        </Typography>
        <ThemeInput
          margin='dense'
          placeholder='Введите Ваше имя'
          name='username'
          type='text'
          variant='outlined'
          fullWidth
        />
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Почта
        </Typography>
        <ThemeInput
          margin='dense'
          placeholder='Введите почту'
          name='email'
          type='email'
          variant='outlined'
          fullWidth
        />
        <Typography variant='body2' style={{ marginTop: 15 }}>
          Пароль
        </Typography>
        <ThemeInput
          margin='dense'
          placeholder='Введите пароль'
          name='password'
          type='password'
          variant='outlined'
          fullWidth
        />
        <ThemeInput
          margin='dense'
          placeholder='Повторите пароль'
          name='password2'
          type='password'
          variant='outlined'
          fullWidth
        />
        <GoldButton style={{ ...btnStyle }} type={"submit"}>
          Зарегистрироваться
        </GoldButton>
      </form>
    </>
  );
}

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
