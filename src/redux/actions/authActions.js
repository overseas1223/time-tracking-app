import { apis } from "../../apis";
import { i18n } from "../../i18n";
import { storage } from "../../utils/storage";
import {
  LOGIN_FALIED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_ROLES,
  SET_USERNAME,
} from "../actionTypes";
import { store } from "../store";

export const login = async (data, showSnackbar) => {
  try {
    const {
      data: { access_token, roles, username },
    } = await apis.login(data);
    storage.setItem("access_token", access_token);
    store.dispatch({ type: LOGIN_SUCCESS, payload: {} });
    store.dispatch({ type: SET_ROLES, payload: roles });
    store.dispatch({ type: SET_USERNAME, payload: username });
    showSnackbar({
      type: "open",
      message: i18n.t("youAreLoggedInSuccessfully"),
      snackbarType: "success",
    });
  } catch (error) {
    store.dispatch({ type: LOGIN_FALIED });
    showSnackbar({
      type: "open",
      message: i18n.t("somethingWentWrong"),
      snackbarType: "error",
    });
  }
};

export const logout = async () => {
  try {
    await storage.removeItem("token");
    store.dispatch({ type: LOGOUT });
  } catch (error) {}
};
