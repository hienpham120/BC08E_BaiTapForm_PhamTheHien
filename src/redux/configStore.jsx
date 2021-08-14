import { combineReducers, createStore } from "redux";
import { BaiTapFormReducer } from "./reducers/BaiTapFormReducer";
const rootReducer = combineReducers({
  BaiTapFormReducer,
});
export const store = createStore(rootReducer);
