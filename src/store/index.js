import { createStore } from "redux";
import rootReducer from "./reducers";
const initialState = {
  user:{
  	user:null
  },
  usersList:{
  	list:[]
  },
  alert:{
  	alertVisibility:false,
  	alertMsg:'',
  	isInfoAlert:false
  }
};
export default createStore(rootReducer, initialState);
