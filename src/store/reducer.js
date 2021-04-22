import axios from "axios";
import {
  setUser,
  setData,
  SET_DOCUMENTATION_TAB,
  SET_USER,
  SET_DATA,
  SET_AUTH_DIALOG,
  SET_ALERT,
} from "./actionCreators";
import { initialState } from "./initialState";

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_DOCUMENTATION_TAB:
      return {
        ...state,
        currentDocumentationTab: payload,
      };
    case SET_AUTH_DIALOG:
      return {
        ...state,
        authdialog: payload,
      };
    case SET_DATA:
      return {
        ...state,
        ...payload,
      };
    case SET_ALERT:
      return { ...state, alert: payload };
    default:
      return state;
  }
}

const baseURL = "https://api.netex-kassa.com/";
const headers = { "Content-Type": "application/x-www-form-urlencoded" };
const AppAxios = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

function creatRequest(endpoint, data, errorCallback) {
  return data
    ? AppAxios.post(endpoint, JSON.stringify(data)).catch(({ response }) =>
        errorCallback(response.data.messages)
      )
    : AppAxios.get(endpoint).catch(({ response }) =>
        errorCallback(response.data.messages)
      );
}

export const login = (data, callback) => (dispatch) => {
  creatRequest("/auth/login", data).then((res) => {
    if (Boolean(res)) {
      AppAxios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${res.data.token}`;
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
  });
};

export const logout = (callback) => (dispatch) => {
  creatRequest("/auth/logout").then((res) => {
    callback();
    dispatch(setUser(Boolean(res.data.response)));
  });
};

export const singup = (data, callback) => (dispatch) => {
  creatRequest("/auth/registration", data).then((res) => {
    callback(res.data);
  });
};

export const accountActivation = (fields) => (dispatch) => {
  creatRequest("/auth/activation/activation", fields).then((res) => {
    console.log(res.data);
  });
};

export const resendActivationCode = (phone, callback) => (dispatch) => {
  creatRequest("/auth/activation/resend", phone).then((res) => {
    console.log(res.data);
    callback(res.data.message);
  });
};

export const restorePassword = (phone) => (dispatch) => {
  creatRequest("/auth/activation/forgot", phone).then((res) => {
    console.log(res.data);
  });
};

export const getTariffPlans = () => (dispatch) => {
  creatRequest("/tariff-plans").then((res) => {
    dispatch(setData({ tariffPlans: res.data.plans }));
  });
};

export const getCountries = () => (dispatch) => {
  creatRequest("/countries").then((res) => {
    dispatch(setData({ countries: res.data.countries }));
  });
};

export const getOrganizations = () => (dispatch) => {
  creatRequest("/organization-types").then((res) => {
    dispatch(setData({ organizationTypes: res.data.list }));
  });
};

export const getActivityTypes = () => (dispatch) => {
  creatRequest("/activity-types").then((res) => {
    dispatch(setData({ activityTypes: res.data.list }));
  });
};

export const getMerchants = () => (dispatch) => {
  creatRequest("/account/list").then((res) => {
    dispatch(setData({ merchants: res.data.list }));
  });
};

export const addMerchant = (data, callback) => (dispatch) => {
  creatRequest("/account/add", data, callback).then((res) => {
    if (Boolean(res)) {
      callback();
    }
  });
};

export const editMerchant = (data, id, callback) => (dispatch) => {
  creatRequest(`/account/edit/${id}`, data).then((res) => {
    callback();
    console.log(res.data);
  });
};

export const viewMerchant = (id, callback) => (dispatch) => {
  creatRequest(`/account/view/${id}`).then((res) => {
    callback(res.data);
  });
};

export const getProfile = () => (dispatch) => {
  creatRequest("/profile/personal").then((res) => {
    dispatch(setData({ profileInfo: res.data.profile }));
  });
};

export const getActionLogs = (page) => (dispatch) => {
  creatRequest(`/profile/action-log/${page}`).then((res) => {
    const array = [];
    for (let key in res.data.action) {
      array.push(res.data.action[key]);
    }
    dispatch(setData({ actionLogs: array }));
  });
};

export const changePassword = (fields, callback) => (dispatch) => {
  creatRequest("/profile/password", fields).then((res) => {
    callback();
  });
};

export const getConfirmFile = (confirm_file_id) => (dispatch) => {
  creatRequest(`/account/get-confirm-file/${confirm_file_id}`).then((res) => {
    console.log(res);
  });
};

export const confirmMerchant = (confirm_file_id, callback) => (dispatch) => {
  creatRequest(`/account/confirm/${confirm_file_id}`, undefined, callback).then(
    (res) => {
      console.log(res);
    }
  );
};
