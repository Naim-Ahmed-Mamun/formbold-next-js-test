import { toast } from "react-toastify";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_VALIDATION_FAILED,
  SIGN_IN,
  SHOW_SIGN_IN_MODAL,
  CLOSE_SIGN_IN_MODAL,
  SHOW_SIGN_UP_MODAL,
  CLOSE_SIGN_UP_MODAL,
  GET_USER_REQUIRED_DATA,
  GET_USER_REQUIRED_DATA_SUCCESS,
  GET_USER_REQUIRED_DATA_FAILURE,
  MAKE_USER_LOGGED_IN,
  MAKE_USER_LOGGED_IN_SUCCESS,
  MAKE_USER_LOGGED_IN_FAILURE,
} from "../actions/SigninActions";

const initialState = {
  showSignInModal: false,
  showSignUpModal: false,
  validationError: [],
  signInLoader: false,
  requestSuccess: false,
};

export default function signIn(state = initialState, action) {
  switch (action.type) {
    case SHOW_SIGN_IN_MODAL:
      return { ...state, showSignInModal: true, validationError: [], requestSuccess: false };
    case CLOSE_SIGN_IN_MODAL:
      return { ...state, showSignInModal: false, validationError: [], requestSuccess: false };
    case SHOW_SIGN_UP_MODAL:
      return { ...state, showSignUpModal: true, requestSuccess: false };
    case CLOSE_SIGN_UP_MODAL:
      return { ...state, showSignUpModal: false, requestSuccess: false };
    case SIGN_IN:
      return {
        ...state,
        signInLoader: true,
        requestSuccess: false,
      };
    case GET_USER_REQUIRED_DATA:
      return {
        ...state,
        signInLoader: true,
        requestSuccess: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signInLoader: false,
        requestSuccess: true,
      };
    case MAKE_USER_LOGGED_IN_SUCCESS:
      return {
        ...state,
        signInLoader: false,
        requestSuccess: true,
      };
    case GET_USER_REQUIRED_DATA_SUCCESS:
      return {
        ...state,
        signInLoader: false,
        requestSuccess: true,
      };
    case SIGN_IN_FAILURE:
      toast.error(action.message);
      return { ...state, signInLoader: false, validationError: [], requestSuccess: false };
    case MAKE_USER_LOGGED_IN_FAILURE:
      toast.error(action.message);
      return { ...state, signInLoader: false, validationError: [], requestSuccess: false };
    case GET_USER_REQUIRED_DATA_FAILURE:
      return { ...state, signInLoader: false, validationError: [], requestSuccess: false };
    case SIGN_IN_VALIDATION_FAILED:
      toast.error(action.message);
      return { ...state, signInLoader: false, validationError: action.errors, requestSuccess: false };
    default:
      return state;
  }
}
