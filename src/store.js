import { createStore } from "redux";
import rootReducer from "./reducers";

// src/store.js
const store = createStore(rootReducer);
export default store;
