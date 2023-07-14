import { SET_ERROR, SET_LOADING, SET_MY_CONFIG } from "../actionTypes";

const initialState = {
  isLoading: [],
  error: false,
  errorMessage: "",
  myConfig: [],
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        errorMessage: action.payload.errorMessage,
      };
    case SET_MY_CONFIG:
      return {
        ...state,
        myConfig: action.payload,
      };
    default:
      return state;
  }
};
