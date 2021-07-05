import { AppAxios } from "./actions/sign";
import cookie from "cookie_js";
import {
  setData,
  SET_DOCUMENTATION_TAB,
  SET_USER,
  SET_DATA,
  SET_AUTH_DIALOG,
  SET_ALERT,
  setAlert,
  setBalance,
  SET_BALANCE,
  SET_STATISTICS,
  setMerchantStatistics,
  SET_BACKDROP,
  setBackdrop,
  SET_FILETOUPLOAD,
} from "./actionCreators";
import { initialState } from "./initialState";
import { getProfile } from "./actions/profile";

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FILETOUPLOAD:
      return {
        ...state,
        filesToUpload: {
          ...state.filesToUpload,
          ...payload,
        },
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_BACKDROP:
      return {
        ...state,
        openBackdrop: payload,
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
    case SET_BALANCE:
      return {
        ...state,
        balance: payload,
      };
    case SET_STATISTICS:
      let statistics = state.statistics;
      statistics[payload.merchant_id] = payload.data;
      return {
        ...state,
        statistics,
      };
    case SET_ALERT:
      return { ...state, alert: payload };
    default:
      return state;
  }
}

export const baseURL = "https://api.netex-kassa.com";

const somethingWentWrong = (endpoint) => {
  console.log(`О нет, что-то пошло не так:
  проверьте запрос на ${endpoint}`);
};

export async function creatRequest(endpoint, data, errorCallback) {
  let token = await cookie.get("token");
  console.log(AppAxios.defaults.headers.Authorization);
  if (!Boolean(AppAxios.defaults.headers.Authorization)) {
    console.log(token);
    AppAxios.defaults.headers.Authorization = token;
  }
  return data
    ? AppAxios.post(endpoint, data).catch(({ response }) =>
        errorCallback(response.data.messages)
      )
    : AppAxios.get(endpoint).catch(({ response }) =>
        !!errorCallback
          ? errorCallback(response.data.messages)
          : somethingWentWrong(endpoint)
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
  creatRequest("/account/add", data, callback)
    .then((res) => {
      if (res) {
        callback();
      }
    })
    .catch(() => callback());
};

export const editMerchant = (data, id, callback) => (dispatch) => {
  creatRequest(`/account/edit/${id}`, JSON.stringify(data), callback).then(
    (res) => {}
  );
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
    dispatch(
      setData({
        actionLogs: array,
        actionLogsPages: Math.round(res.data.action_total / 10),
      })
    );
    dispatch(setBackdrop(false));
  });
};

export const getMerchants = () => (dispatch) => {
  creatRequest("/account/list").then((res) => {
    if (Boolean(res)) {
      dispatch(setData({ merchants: res.data.list }));
    }
  });
};

export const confirmMerchant = (confirm_file_id, callback) => (dispatch) => {
  creatRequest(`/account/confirm/${confirm_file_id}`, undefined, callback).then(
    (res) => {
      console.log(Boolean(res.data.response), res.data);
      if (Boolean(res.data.response)) {
        callback(undefined);
      }
    }
  );
};

export const deleteMerchant = (merchant_id, callback) => (dispatch) => {
  creatRequest(`/account/remove/${merchant_id}`, undefined, callback).then(
    (res) => {
      if (Boolean(res.data.response)) {
        dispatch(setBackdrop(false));
        dispatch(getMerchants());
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: "Успешно удалено!",
          })
        );
        callback(undefined, res.data.response);
      }
    }
  );
};

export const getHistoryList = (errorHandler, options) => (dispatch) => {
  creatRequest("/operations/list", JSON.stringify(options), errorHandler).then(
    (res) => {
      if (Boolean(res)) {
        dispatch(
          setData({
            historyList: res.data.list ? getArrFromObj(res.data.list) : false,
          })
        );
        dispatch(setBackdrop(false));
      }
    }
  );
};

export const getStatusList = (errorHandler) => (dispatch) => {
  creatRequest("/operations/options/status", undefined, errorHandler).then(
    (res) => {
      if (Boolean(res)) {
        dispatch(
          setData({ statusList: getArrFromObj(res.data.list, "withValue") })
        );
      }
    }
  );
};

export const getTypeList = (errorHandler) => (dispatch) => {
  creatRequest("/operations/options/type", undefined, errorHandler).then(
    (res) => {
      if (Boolean(res)) {
        dispatch(
          setData({ typeList: getArrFromObj(res.data.list, "withValue") })
        );
      }
    }
  );
};

export const getToken = (merchant_id, errorHandler, callback) => (dispatch) => {
  creatRequest(
    `/account/get-api-token/${merchant_id}`,
    undefined,
    errorHandler
  ).then((res) => {
    if (Boolean(res)) {
      callback(res.data);
    }
  });
};

export const cashOut = (data, callback) => (dispatch) => {
  creatRequest("/cashout/send-request", JSON.stringify(data), callback).then(
    (res) => {
      if (Boolean(res)) {
        callback();
        console.log(res.data);
      }
    }
  );
};

export const getBalance = () => (dispatch) => {
  creatRequest("/balance/get", undefined).then((res) => {
    if (Boolean(res)) {
      let balance = res.data.balance;
      let newData = [];
      for (let m in balance) {
        let obj = {};
        let currencies = [];
        for (let c in balance[m]) {
          let currency = balance[m][c];
          currency.name = c;
          currencies.push(currency);
        }
        obj.merchant_id = m;
        obj.currencies = currencies;
        newData.push(obj);
      }
      dispatch(setBalance(newData));
    }
  });
};

export const getMerchantBalance =
  (merchant, currency, callback) => (dispatch) => {
    creatRequest(`/balance/get/${merchant}/${currency}`, undefined).then(
      (res) => {
        if (Boolean(res)) {
          dispatch(setData({ balance: res.data.balance }));
        }
      }
    );
  };

export const getMerchantStatistics = (merchant, data) => (dispatch) => {
  creatRequest(`/account/statistics/${merchant}/`, JSON.stringify(data)).then(
    (res) => {
      if (Boolean(res)) {
        dispatch(
          setMerchantStatistics({
            merchant_id: merchant,
            data: {
              ...res.data.statistics,
              chart: parseChartData(res.data.statistics.chart),
            },
          })
        );
      }
    }
  );
};

export const getCurrencies = () => (dispatch) => {
  creatRequest("/currencies").then((res) =>
    dispatch(setData({ currencies: getArrFromObj(res.data.list) }))
  );
};

export const changeAvatar = (avatar) => (dispatch) => {
  creatRequest("/profile/personal/edit", avatar).then((res) => {
    if (Boolean(res)) {
      dispatch(setBackdrop(false));
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          message: res.data.messages,
        })
      );
      dispatch(getProfile());
    }
  });
};

function getArrFromObj(obj, withValue) {
  let arr = [];
  for (let key in obj) {
    if (withValue) {
      arr.push({ value: key, name: obj[key].name });
    } else {
      arr.push(obj[key]);
    }
  }
  return arr;
}

function parseChartData(chart) {
  let labels = [];
  let paymentData = [];
  let cashoutData = [];
  Object.keys(chart).forEach((date) => {
    let dateArr = new Date(date).toDateString().split(" ");
    labels.push(`${dateArr[2]} ${dateArr[1]}`);
  });
  for (let obj in chart) {
    paymentData.push(chart[obj].payment);
    cashoutData.push(chart[obj].cashout);
  }
  return { labels, paymentData, cashoutData };
}
