export const SET_USER = 'SET_USER'
export const SET_DOCUMENTATION_TAB = 'SET_DOCUMENTATION_TAB'
export const SET_DATA = 'SET_DATA'
export const SET_ALERT = 'SET_ALERT'
export const SET_AUTH_DIALOG = 'SET_AUTH_DIALOG'

export function setUser(payload) {
  return {
    payload,
    type: SET_USER,
  }
}

export function setTab(payload) {
  return {
    payload,
    type: SET_DOCUMENTATION_TAB,
  }
}

export function setData(payload) {
  return {
    payload,
    type: SET_DATA,
  }
}

export function setAuthDialog(payload) {
  return {
    payload,
    type: SET_AUTH_DIALOG,
  }
}

export function setAlert(payload) {
  return {
    payload,
    type: SET_ALERT,
  }
}
