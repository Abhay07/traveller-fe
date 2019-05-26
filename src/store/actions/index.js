import { SET_USER, SET_USER_LIST, SET_ALERT_MSG, SET_ALERT_VISIBILITY } from "./../../constants";


export const setUserList = userList => ({
  type: SET_USER_LIST,
  payload: userList
});

export const setCurrentUser = user => ({
  type: SET_USER,
  payload: user
});

export const toggleAlert = _ => ({
  type: SET_ALERT_VISIBILITY,
  payload: null
});

export const setAlertMsg = (msg, isInfoAlert) => ({
  type: SET_ALERT_MSG,
  payload: {msg,isInfoAlert}
});
