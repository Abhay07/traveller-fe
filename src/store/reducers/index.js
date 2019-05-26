import { combineReducers } from "redux";
import user from "./user";
import usersList from "./usersList";
import { alert } from "./alert";

export default combineReducers({ user, usersList, alert });
