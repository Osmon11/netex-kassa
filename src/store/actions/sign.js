import { setUser, setData, setAlert } from "../actionCreators";
import { AppAxios, AppAxios2 } from "../../axios/axios";

export const login = (data, callback) => (dispatch) => {
  AppAxios.post("/auth/login", data)
    .then((res) => {
      if (Boolean(res)) {
        AppAxios.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${res.data.token}`;
            dispatch(setData({ token: `Bearer ${res.data.token}` }));
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        dispatch(setUser(Boolean(res.data?.response)));
        callback({ message: "Logged in", severity: "success", open: true });
      } else
        callback({
          message: "Вы уже авторизованы :(",
          severity: "error",
          open: true,
        });
    })
    .catch((e) => {
      if (e.message === "Request failed with status code 401") {
        callback({
          message: "Неверный пароль",
          severity: "error",
          open: true,
        });
      } else {
        callback({
          message: "Что то пошло не так, повторите снова",
          severity: "error",
          open: true,
        });
      }
    });
};

export const logout = (callback) => (dispatch) => {
  AppAxios.post("/auth/logout").then((res) => {
    callback();
    dispatch(setUser(false));
  });
};

export const singup = (data, callback) => (dispatch) => {
  console.log(data);
  AppAxios.post("/auth/registration", data)
    .then((res) => {
      callback(res.data);
    })
    .catch(({ response }) => {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
    });
};

export const accountActivation = (fields) => (dispatch) => {
  AppAxios.post("/auth/activation", fields)
    .then((res) => {
      console.log(res.data);
    })
    .catch(({ response }) => {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
    });
};

export const resendActivationCode = (phone, callback) => (dispatch) => {
  AppAxios.post("/auth/activation/resend", phone)
    .then((res) => {
      console.log(res.data);
      callback(res.data.message);
    })
    .catch(({ response }) => {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
    });
};

export const restorePassword = (phone) => (dispatch) => {
  AppAxios.post("/auth/activation/forgot", phone)
    .then((res) => {
      console.log(res.data);
    })
    .catch(({ response }) => {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
    });
};

export const changePassword = (fields, callback) => (dispatch) => {
  AppAxios.post("/profile/password", fields).then((res) => {
    callback();
  });
};