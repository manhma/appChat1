import { combineReducers } from "redux";
import chatDataReducer from "./chatData";
import checkAuthReducer from "./checkAuth";
import roomDataReducer from "./roomSelectedData";

const rootReducer = combineReducers({
  checkAuth: checkAuthReducer,
  chatData: chatDataReducer,
  roomData: roomDataReducer,
});
export default rootReducer;
