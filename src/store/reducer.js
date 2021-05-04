import { AppAxios } from "../axios/axios";
import {
  setData,
  SET_DOCUMENTATION_TAB,
  SET_USER,
  SET_DATA,
  SET_AUTH_DIALOG,
  SET_ALERT,
  setAlert,
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

export const baseURL = "https://api.netex-kassa.com";

export function creatRequest(endpoint, data, errorCallback) {
  return data
    ? AppAxios.post(endpoint, JSON.stringify(data)).catch(({ response }) =>
        errorCallback(response.data.messages)
      )
    : AppAxios.get(endpoint).catch(({ response }) =>
        errorCallback(response.data.messages)
      );
}

export const getTariffPlans = () => (dispatch) => {
  creatRequest("/tariff-plans").then((res) => {
    dispatch(setData({ tariffPlans: res.data.plans }));
  });
};

export const getCountries = (callback) => (dispatch) => {
  creatRequest("/countries", undefined, callback).then((res) => {
    if (res.status === 200) {
      dispatch(setData({ countries: res.data.countries }));
    }
  });
};

export const getOrganizations = (callback) => (dispatch) => {
  creatRequest("/organization-types", undefined, callback).then((res) => {
    if (res) {
      dispatch(setData({ organizationTypes: res.data.list }));
    }
  });
};

export const getActivityTypes = (callback) => (dispatch) => {
  creatRequest("/activity-types", undefined, callback).then((res) => {
    if (res) {
      dispatch(setData({ activityTypes: res.data.list }));
    }
  });
};

export const addMerchant = (data, callback) => (dispatch) => {
  creatRequest("/account/add", data, callback).then((res) => {
    if (res) {
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
  creatRequest(`/account/view/${id}`, undefined, (error) => {
    if (error) {
      setAlert({ open: true, severity: "error", message: error });
    }
  }).then((res) => {
    if (res) {
      callback(res.data);
    }
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

export const getMerchants = () => (dispatch) => {
  creatRequest("/account/list").then((res) => {
    dispatch(setData({ merchants: res.data.list }));
  });
};

export const confirmMerchant = (confirm_file_id, callback) => (dispatch) => {
  creatRequest(`/account/confirm/${confirm_file_id}`, undefined, callback).then(
    (res) => {
      console.log(res);
    }
  );
};
