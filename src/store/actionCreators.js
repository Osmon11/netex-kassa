export const SET_USER = "SET_USER";
export const SET_DOCUMENTATION_TAB = "SET_DOCUMENTATION_TAB";

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
