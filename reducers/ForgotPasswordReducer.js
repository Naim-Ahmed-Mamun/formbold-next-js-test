import { toast } from "react-toastify";
import {
  CLOSE_FORGOT_PASS_MODAL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_FAILURE,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  SHOW_FORGOT_PASS_MODAL,
  RESET_FORGOT_PASSWORD_REQUEST_SUCCESS,
} from "../actions/ForgotPassword";

const initialState = {
  loading: false,
  requestSuccess: false,
  validationError: undefined,
  showModal: false,
};

export default function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORGOT_PASS_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case CLOSE_FORGOT_PASS_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        requestSuccess: false,
      };
    case RESET_FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        requestSuccess: false,
      };
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: true,
      };
    case FORGOT_PASSWORD_REQUEST_FAILURE:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: false,
      };
    default:
      return state;
  }
}
