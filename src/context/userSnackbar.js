import React, { useReducer, createContext, useContext } from "react";

const initialState = {
  type: "close",
  open: false,
  snackbarType: "info",
};

function reducer(state, action) {
  switch (action.type) {
    case "close":
      return {
        ...initialState,
      };
    case "open":
      return {
        ...state,
        open: true,
        snackbarType: action.snackbarType,
        message: action.message,
      };
    default:
      throw new Error(`unknown action from state: ${JSON.stringify(action)}`);
  }
}

export const SnackbarContext = createContext({});

export function SnackbarProvider({ children }) {
  const [showSnackbar, dispatch] = useReducer(reducer, initialState);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, dispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export default function useSnackbar() {
  return useContext(SnackbarContext);
}
