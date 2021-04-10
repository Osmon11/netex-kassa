export const SET_USER = "SET_USER";

export function setUser(payload) {
  return {
    payload,
    type: SET_USER,
  };
}
