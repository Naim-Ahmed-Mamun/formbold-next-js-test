import { toast } from "react-toastify";
import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_VALIDATION_FAILED, RESET_REGISTER_VALIDATION_ERROR } from "../actions/SignUpActions";
import Cookies from "js-cookie";

const initialState = {
  register: false,
  loading: false,
  validationError: [],
};

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: true,
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("access_token");
      Cookies.remove("access_token");
      toast.error(action.message);
      return { ...state, register: undefined, validationError: [] };

    case REGISTER_VALIDATION_FAILED:
      toast.error(action.message);
      return {
        ...state,
        loading: false,
        validationError: action.errors,
      };
    case RESET_REGISTER_VALIDATION_ERROR:
      return {
        ...state,
        loading: false,
        validationError: [],
      };
    default:
      return state;
  }
}
