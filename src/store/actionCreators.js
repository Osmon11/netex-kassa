export const SET_USER = "SET_USER";
export const SET_DOCUMENTATION_TAB = "SET_DOCUMENTATION_TAB";
export const SET_DATA = "SET_DATA";
export const SET_ALERT = "SET_ALERT";
export const SET_BALANCE = "SET_BALANCE";
export const SET_STATISTICS = "SET_STATISTICS";
export const SET_BACKDROP = "SET_BACKDROP";
export const SET_FILETOUPLOAD = "SET_FILETOUPLOAD";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_OPERATION_DETAIL = "SET_OPERATION_DETAIL";
export const SET_MERCHANT_DETAIL = "SET_MERCHANT_DETAIL";

export function setMerchantDetail(payload) {
  return {
    payload,
    type: SET_MERCHANT_DETAIL,
  };
}

export function setOperationDetail(payload) {
  return {
    payload,
    type: SET_OPERATION_DETAIL,
  };
}

export function setCurrency(payload) {
  return {
    payload,
    type: SET_CURRENCY,
  };
}

export function setFileToUpload(payload) {
  return {
    payload,
    type: SET_FILETOUPLOAD,
  };
}

export function setBackdrop(payload) {
  return {
    payload,
    type: SET_BACKDROP,
  };
}

export function setMerchantStatistics(payload) {
  return {
    payload,
    type: SET_STATISTICS,
  };
}

export function setBalance(payload) {
  return {
    payload,
    type: SET_BALANCE,
  };
}

export function setUser(payload) {
  return {
    payload,
    type: SET_USER,
  };
}

export function setTab(payload) {
  return {
    payload,
    type: SET_DOCUMENTATION_TAB,
  };
}

export function setData(payload) {
  return {
    payload,
    type: SET_DATA,
  };
}

export function setAlert(payload) {
  return {
    payload,
    type: SET_ALERT,
  };
}
