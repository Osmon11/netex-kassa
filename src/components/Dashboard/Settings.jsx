import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { GoldButton } from "shared/Buttons/buttons";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { changePassword, getActionLogs } from "store/reducer";
import { ValidatedInput } from "./Inputs";
import { useDispatch, useSelector } from "react-redux";

const passwordInitialValues = {
  "old-password": "",
  "new-password": "",
  "confirm-password": "",
};

const validateChangePassword = Yup.object({
  "old-password": Yup.string()
    .min(
      8,
      "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов."
    )
    .matches(
      /(?=.*[a-z])(?=.*\d)/,
      "Введённый пароль должен быть буквенно-цифровой"
    )
    .required("Введите старый пароль"),
  "new-password": Yup.string()
    .min(
      8,
      "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов."
    )
    .max(128, "Слишком длинный пароль, максимум 128 символов")
    .matches(
      /(?=.*[a-z])(?=.*\d)/,
      "Введённый пароль должен быть буквенно-цифровой"
    )
    .required("Поля должно быть заполнена"),
  "confirm-password": Yup.string()
    .oneOf([Yup.ref("new-password"), null], "Пароли должны совпадать")
    .required("Поля должно быть заполнена"),
});

export function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);
  const { firstname, lastname, email } = state.profileInfo;
  const [tab, setTab] = useState("Профиль");
  const avatar = useRef();

  useEffect(() => {
    if (!state.actionLogs) {
      dispatch(getActionLogs(1));
    }
  }, [state, dispatch]);

  function changePasswordHandler(fields) {
    dispatch(changePassword(fields));
  }
  return (
    <>
      <p className="title" style={{ fontSize: 25 }}>
        {`${firstname} ${lastname}`}
      </p>
      <p className="subtitle">{email}</p>
      <Grid container>
        <Grid item xs={6} sm={12} md={8} lg={6}>
          <ToggleButtonGroup
            exclusive
            value={tab}
            style={{ width: "100%", margin: "33px 0" }}
            onChange={(_, tab) => setTab(tab)}
          >
            <GoldToggleButton className={classes.toggleBtn} value="Профиль">
              Профиль
            </GoldToggleButton>
            <GoldToggleButton
              className={classes.toggleBtn}
              value="Журнал входа"
            >
              Журнал входа
            </GoldToggleButton>
            {/* <GoldToggleButton className={classes.toggleBtn} value="Кошельки">
              Кошельки
            </GoldToggleButton> */}
          </ToggleButtonGroup>
          {tab === "Профиль" && (
            <>
              <Formik>
                <Form>
                  <Typography variant="body2" style={{ marginTop: 15 }}>
                    Имя
                  </Typography>
                  <ValidatedInput
                    disabled
                    margin="normal"
                    placeholder="Введите Ваше имя"
                    name="username"
                    type="text"
                    style={{ marginBottom: 20 }}
                    fullWidth
                  />
                  <Typography variant="body2" style={{ marginTop: 15 }}>
                    Почта
                  </Typography>
                  <ValidatedInput
                    disabled
                    margin="normal"
                    placeholder="Введите почту"
                    name="email"
                    type="email"
                    style={{ marginBottom: 20 }}
                    fullWidth
                  />
                  <Typography variant="body2" style={{ marginTop: 15 }}>
                    Аватар
                  </Typography>
                  <ValidatedInput
                    disabled
                    margin="normal"
                    placeholder="Загрузить изображение"
                    name="avatar"
                    type="text"
                    onClick={() => avatar.current.click()}
                    style={{ marginBottom: 20 }}
                    fullWidth
                  />
                </Form>
              </Formik>
              <Formik
                initialValues={passwordInitialValues}
                validationSchema={validateChangePassword}
                onSubmit={changePasswordHandler}
              >
                <Form>
                  <Typography variant="body2" style={{ marginTop: 15 }}>
                    Смена пароля
                  </Typography>
                  <ValidatedInput
                    placeholder="Введите текущий пароль"
                    name="old-password"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <ValidatedInput
                    placeholder="Введите новый пароль"
                    name="new-password"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <ValidatedInput
                    placeholder="Повторите новый пароль"
                    name="confirm-password"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <GoldButton
                    type="submit"
                    style={{
                      marginBottom: 64,
                      fontSize: 16,
                    }}
                  >
                    Сменить пароль
                  </GoldButton>
                </Form>
              </Formik>
            </>
          )}

          {tab === "Журнал входа" && (
            <>
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
                  <Typography variant="body2">IP</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">Браузер</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">Страна</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">Дата</Typography>
                </Grid>
              </Grid>
              {state.actionLogs ? (
                state.actionLogs.map((obj) => (
                  <Grid
                    item
                    xs={12}
                    container
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                      padding: "25px 15px",
                    }}
                    key={obj.ip + obj.date}
                  >
                    <Grid item xs={3}>
                      <Typography variant="body2">{obj.ip}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">{obj.browser}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">{obj.country}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2">{obj.date}</Typography>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <div className="flex_box">
                  <CircularProgress />
                </div>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <input type="file" ref={avatar} style={{ display: "none" }} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  toggleBtn: {
    width: "33.33%",
    textTransform: "none",
    color: "#686868",
    backgroundColor: "#f5f5f5",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    "&:hover": {
      color: "#FF9900",
      backgroundColor: "#fff",
    },
  },
}));
