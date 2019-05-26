import { SET_USER_LIST } from './../../constants';

export default function(state = {}, action) {
  switch (action.type) {
  	case SET_USER_LIST:
  	return {
  		...state,
  		list:action.payload
  	}
    default:
      return state;
  }
}
