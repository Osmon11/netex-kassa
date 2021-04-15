import axios from "axios";
import {
  setUser,
  setData,
  SET_DOCUMENTATION_TAB,
  SET_USER,
  SET_DATA,
  ADD_MERCHANT,
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
    case SET_DATA:
      return {
        ...state,
        data: { ...state.data, ...payload },
      };
    case ADD_MERCHANT:
      return {
        ...state,
        addMerchant: { ...state.addMerchant, ...payload },
      };
    default:
      return state;
  }
}

const baseURL = "http://crypto.media-center.kg";
const headers = { "Content-Type": "application/x-www-form-urlencoded" };
const AppAxios = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

function creatRequest(endpoint, data) {
  return data
    ? AppAxios.post(endpoint, JSON.stringify(data)).catch((error) =>
        console.log(error)
      )
    : AppAxios.get(endpoint).catch((error) => console.log(error));
}

export const login = (data, callback) => (dispatch) => {
  creatRequest("/auth/login", data).then((res) => {
    dispatch(setUser(Boolean(res.data.response)));
    callback("Logged in");
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

export const getTariffPlans = (callback) => (dispatch) => {
  creatRequest("/tariff-plans").then((res) => {
    dispatch(setData({ tariffPlans: res.data }));
    callback();
  });
};

export const getCountries = (callback) => (dispatch) => {
  creatRequest("/countries").then((res) => {
    dispatch(setData({ countries: res.data }));
    callback();
  });
};

export const getOrganizations = (callback) => (dispatch) => {
  creatRequest("/organization-types").then((res) => {
    dispatch(setData({ organizations: res.data }));
    callback();
  });
};

export const getActivityTypes = (callback) => (dispatch) => {
  creatRequest("/activity-types").then((res) => {
    dispatch(setData({ activityTypes: res.data }));
    callback();
  });
};

export const getMerchants = () => (dispatch) => {
  creatRequest("/account/list").then((res) => {
    console.log(res);
    // dispatch(setData({ merchants: res.data.list }));
  });
};

export const addMerchant = (data, callback) => (dispatch) => {
  creatRequest("/auth/activation/forgot", data).then((res) => {
    callback();
    console.log(res.data);
  });
};

export const editMerchant = (data, id, callback) => (dispatch) => {
  creatRequest(`/account/edit/${id}`, data).then((res) => {
    callback();
    console.log(res.data);
  });
};

export const viewMerchant = (data, id, callback) => (dispatch) => {
  creatRequest(`/account/view/${id}`, data).then((res) => {
    callback(res.data);
    console.log(res.data);
  });
};

export const getProfile = () => (dispatch) => {
  creatRequest("/profile/personal").then((res) => {
    dispatch(setData({ profileInfo: res.data }));
  });
};

export const getActionLogs = (page) => (dispatch) => {
  creatRequest(`/profile/action-log/${page}`).then((res) => {
    dispatch(setData({ actionLogs: res.data }));
  });
};

export const changePassword = (fields, callback) => (dispatch) => {
  creatRequest("/profile/password", fields).then((res) => {
    callback();
  });
};
