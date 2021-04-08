import { setUser, SET_USER } from "./actionCreators";
import { initialState } from "./initialState";

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}

export const login = (data, callback) => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
  })
    .then((res) =>
      res.json().then((data) => {
        dispatch(setUser(data?.response));
        callback("Logged in");
      })
    )
    .catch((error) => console.log(error));
};

export const logout = () => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/logout")
    .then((res) => (res.ok ? dispatch(setUser({})) : ""))
    .catch((error) => console.log(error));
};

export const singup = (data, callback) => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/registration", {
    method: "post",
    body: JSON.stringify(data),
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
        callback();
      })
    )
    .catch((error) => console.log(error));
};

export const accountActivation = (fields) => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/activation/activation", {
    method: "post",
    body: JSON.stringify(fields),
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    )
    .catch((error) => console.log(error));
};

export const resendActivationCode = (phone, callback) => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/activation/resend", {
    method: "post",
    body: JSON.stringify(phone),
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
        callback(data.message);
      })
    )
    .catch((error) => console.log(error));
};

export const restorePassword = (phone) => (dispatch) => {
  fetch("http://crypto.media-center.kg/auth/activation/forgot", {
    method: "post",
    body: JSON.stringify(phone),
    headers: [["Content-Type", "application/x-www-form-urlencoded"]],
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    )
    .catch((error) => console.log(error));
};
