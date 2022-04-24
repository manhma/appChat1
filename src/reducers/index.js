import { combineReducers } from "redux";
import chatDataReducer from "./chatData";
import checkAuthReducer from "./checkAuth";
import roomDataReducer from "./roomSelectedData";
import todoReducer from "./todo";

const rootReducer = combineReducers({
  todo: todoReducer,
  checkAuth: checkAuthReducer,
  chatData: chatDataReducer,
  roomData: roomDataReducer,
});
export default rootReducer;
