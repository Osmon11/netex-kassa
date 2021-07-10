import axios from "axios";
import cookie from "cookie_js";
import { setUser, setData, setAlert, setBackdrop } from "../actionCreators";

const baseURL = "https://api.netex-kassa.com/";

const headers = { "Content-Type": "application/x-www-form-urlencoded" };
export const AppAxios = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

export const login = (data, callback) => (dispatch) => {
  AppAxios.post("/auth/login", data)
    .then((res) => {
      if (Boolean(res)) {
        AppAxios.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        dispatch(setData({ token: `Bearer ${res.data.token}` }));
        cookie.set("user", `true`, {
          expires: new Date(res.data.expires * 1000).toUTCString(),
        });
        cookie.set("token", `Bearer ${res.data.token}`, {
          expires: new Date(res.data.expires * 1000).toUTCString(),
        });

        dispatch(setUser(Boolean(res.data?.response)));
        callback({ message: "Logged in", severity: "success", open: true });
      } else
        callback({
          message: "Вы уже авторизованы :(",
          severity: "error",
          open: true,
        });
    })
    .catch(({ response }) => {
      callback({
        message: response.data.messages,
        severity: "error",
        open: true,
      });
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

export const accountActivation = (fields, callback) => (dispatch) => {
  AppAxios.post("/auth/activation", fields)
    .then((res) => {
      callback(res.data.response);
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

export const resendActivationCode = (email, callback) => (dispatch) => {
  AppAxios.post("/auth/activation/resend", email)
    .then((res) => {
      callback(res.data.message);
    })
    .catch(({ response }) => {
      callback(response.data.messages, response.data.next_send);
    });
};

export const restorePassword = (phone, callback) => (dispatch) => {
  AppAxios.post("/auth/forgot", phone)
    .then((res) => {
      if (Boolean(res.data.response)) {
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: res.data.messages,
          })
        );
        callback();
      }
    })
    .catch(({ response }) => {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
      callback();
    });
};

export const changePassword = (fields) => (dispatch) => {
  AppAxios.post("/profile/password", fields)
    .then((res) => {
      if (Boolean(res.data.response)) {
        setTimeout(() => {
          dispatch(setBackdrop(false));
        }, 5000);
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: res.data.messages,
          })
        );
      }
    })
    .catch(({ response }) => {
      dispatch(setBackdrop(false));
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: response.data.messages,
        })
      );
    });
};
