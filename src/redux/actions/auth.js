import { storage } from "../../utils/storage";
import { LOGOUT } from "../actionTypes";
import { store } from "../store";

export const logout = async () => {
  try {
    await storage.removeItem("token");
    store.dispatch({ type: LOGOUT });
  } catch (error) {}
};
