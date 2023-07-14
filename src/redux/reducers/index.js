import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { hourRegsReducer } from "./hourRegsReducer";
import { commonReducer } from "./commonReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  hours: hourRegsReducer,
  common: commonReducer,
});
