import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination, ToggleButtonGroup } from "@material-ui/lab";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { GoldButton } from "shared/Buttons/buttons";
import { GoldToggleButton } from "shared/Buttons/buttons";
import { changeAvatar, getActionLogs } from "store/reducer";
import { changePassword } from "store/actions/sign";
import { ValidatedInput, Inputs } from "./Inputs";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setBackdrop } from "store/actionCreators";

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

export function formatBytes(a, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
}

export function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.reducer);
  const { firstname, lastname, email } = state.profileInfo;
  const [tab, setTab] = useState("Профиль");
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    dispatch(setBackdrop(true));
    dispatch(getActionLogs(value));
    setPage(value);
  };

  useEffect(() => {
    if (!state.actionLogs) {
      dispatch(getActionLogs(1));
    }
  }, [state.actionLogs, dispatch]);

  function changePasswordHandler(fields) {
    dispatch(setBackdrop(true));
    dispatch(changePassword(fields));
  }

  function profileSubmitHandler(fields) {
    if (!Boolean(state.filesToUpload.avatar)) {
      dispatch(
        setAlert({
          open: true,
          severity: "warning",
          message: "Вы не выбрали файл!",
        })
      );
    } else {
      // dispatch(setBackdrop(true));
      let data = new FormData();
      console.log(formatBytes(state.filesToUpload.avatar.size));
      data.append("photo", state.filesToUpload.avatar);
      dispatch(changeAvatar(data));
    }
  }
  return (
    <>
      <div>
        <p
          className='title'
          style={{ fontSize: 25, margin: 0, textAlign: "center" }}
        >
          {`${firstname} ${lastname}`}
        </p>
        <p className='subtitle' style={{ margin: 0, textAlign: "center" }}>
          {email}
        </p>
      </div>
      <div className='flex_box'>
        <ToggleButtonGroup
          exclusive
          value={tab}
          style={{ width: "100%", margin: "33px 0" }}
          onChange={(_, tab) => setTab(tab)}
        >
          <GoldToggleButton className={classes.toggleBtn} value='Профиль'>
            Профиль
          </GoldToggleButton>
          <GoldToggleButton className={classes.toggleBtn} value='Журнал входа'>
            Журнал действий
          </GoldToggleButton>
          <GoldToggleButton className={classes.toggleBtn} value='Пароль'>
            Пароль
          </GoldToggleButton>
          {/* <GoldToggleButton className={classes.toggleBtn} value="Кошельки">
              Кошельки
            </GoldToggleButton> */}
        </ToggleButtonGroup>
      </div>
      <div className='flex_box'>
        {tab === "Профиль" && (
          <div style={{ width: "50%" }}>
            <Formik
              initialValues={{ username: "", email: "", avatar: "" }}
              onSubmit={profileSubmitHandler}
            >
              <Form>
                <Typography variant='body2' style={{ marginTop: 10 }}>
                  Имя
                </Typography>
                <ValidatedInput
                  disabled
                  value={`${firstname} ${lastname}`}
                  name='username'
                  type='text'
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    marginTop: 8,
                  }}
                />
                <Typography variant='body2' style={{ marginTop: 10 }}>
                  Почта
                </Typography>
                <ValidatedInput
                  disabled
                  value={email}
                  name='email'
                  type='email'
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    marginTop: 8,
                  }}
                />
                <Typography variant='body2' style={{ marginTop: 10 }}>
                  Аватар
                </Typography>
                <Inputs
                  placeholder='Загрузить изображение'
                  name='avatar'
                  upload
                  withoutLabel
                  style={{ width: "100%", marginBottom: 20, marginTop: 8 }}
                />
                <br />
                <div className='flex_box'>
                  <GoldButton
                    type='submit'
                    size='large'
                    style={{
                      marginBottom: 64,
                      marginTop: "10px",
                      fontSize: 16,
                      width: "50%",
                      minHeight: "56px",
                    }}
                  >
                    Сменить аватар
                  </GoldButton>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
      {tab === "Журнал входа" && (
        <Grid container>
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
            <Grid item xs={2}>
              <Typography variant='body2' style={{ fontWeight: 500 }}>
                IP
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body2' style={{ fontWeight: 500 }}>
                Тип действий
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body2' style={{ fontWeight: 500 }}>
                Браузер
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body2' style={{ fontWeight: 500 }}>
                Дата
              </Typography>
            </Grid>
          </Grid>
          {state.actionLogs ? (
            state.actionLogs.map((obj, i) => (
              <Grid
                item
                xs={12}
                container
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  padding: "25px 15px",
                }}
                key={obj.ip + obj.date + i}
              >
                <Grid item xs={2}>
                  <Typography variant='body2'>{obj.ip}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body2'>{obj.action}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body2'>{obj.browser}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body2'>{obj.date}</Typography>
                </Grid>
              </Grid>
            ))
          ) : (
            <div className='flex_box'>
              <CircularProgress />
            </div>
          )}
          <div
            className='flex_box'
            style={{ width: "100%", padding: "25px 0px" }}
          >
            <Pagination
              count={10}
              page={page}
              onChange={handleChange}
              classes={{ ul: classes.ul }}
              variant='outlined'
              color='primary'
            />
          </div>
        </Grid>
      )}
      {tab === "Пароль" && (
        <div className='flex_box'>
          <div style={{ width: "50%" }}>
            <Formik
              initialValues={passwordInitialValues}
              validationSchema={validateChangePassword}
              onSubmit={changePasswordHandler}
            >
              <Form>
                <Typography variant='body2' style={{ marginTop: 15 }}>
                  Текущий пароль
                </Typography>
                <ValidatedInput
                  autoComplete='off'
                  placeholder='Введите текущий пароль'
                  name='old-password'
                  style={{ width: "100%", marginTop: "8px" }}
                />
                <Typography variant='body2' style={{ marginTop: 15 }}>
                  Новый пароль
                </Typography>
                <ValidatedInput
                  autoComplete='off'
                  placeholder='Введите новый пароль'
                  name='new-password'
                  style={{ width: "100%", marginTop: "8px" }}
                />
                <Typography variant='body2' style={{ marginTop: 15 }}>
                  Повторите пароль
                </Typography>
                <ValidatedInput
                  autoComplete='off'
                  placeholder='Повторите новый пароль'
                  name='confirm-password'
                  style={{ width: "100%", marginTop: "8px" }}
                />
                <br />
                <div className='flex_box'>
                  <GoldButton
                    type='submit'
                    size='large'
                    style={{
                      marginBottom: 64,
                      marginTop: "40px",
                      fontSize: 16,
                      width: "50%",
                      minHeight: "56px",
                    }}
                  >
                    Сменить пароль
                  </GoldButton>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
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
  ul: {
    "& li .MuiPaginationItem-root": {
      color: "#fff",
      borderColor: "#fff",
    },
    "& li .MuiPaginationItem-root.Mui-selected": {
      color: "#ff9900",
      borderColor: "#ff9900",
    },
  },
}));
