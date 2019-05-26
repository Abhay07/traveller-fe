import { SET_INFO_ALERT, SET_ALERT_MSG, SET_ALERT_VISIBILITY } from './../../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case SET_ALERT_MSG:
    console.log({
      ...state,
      alertMsg:action.payload.msg,
      isInfoAlert:Boolean(action.payload.isInfoAlert),
      alertVisibility:true
    })
    return {
      ...state,
      alertMsg:action.payload.msg,
      isInfoAlert:Boolean(action.payload.isInfoAlert),
      alertVisibility:true
    }
    case SET_ALERT_VISIBILITY:
    const {alertVisibility} = state;
    return {
      ...state,
      alertVisibility:!alertVisibility
    }
    default:
      return state;
  }
}