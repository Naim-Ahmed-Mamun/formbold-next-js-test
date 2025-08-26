import { toast } from "react-toastify";
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST_FAILURE, RESET_PASSWORD_REQUEST_SUCCESS, RESET_PASSWORD_REQUEST_VALIDATION_ERROR } from "../actions/ResetPassword";

const initialState = {
  loading: false,
  requestSuccess: false,
  validationError: undefined,
  showModal: false,
};

export default function resetPassword(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        requestSuccess: false,
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: true,
      };
    case RESET_PASSWORD_REQUEST_FAILURE:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: false,
      };
    case RESET_PASSWORD_REQUEST_VALIDATION_ERROR:
      toast.warning(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: false,
        validationError: action.errors,
      };
    default:
      return state;
  }
}
