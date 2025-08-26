import { toast } from "react-toastify";
import {
  GET_USER_ACTIVATION,
  GET_USER_ACTIVATION_FAILURE,
  GET_USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION,
  USER_ACTIVATION_FAILURE,
  USER_ACTIVATION_SUCCESS,
} from "../actions/userActivation";

const initialState = {
  loading: false,
  data: undefined,
};

export default function userActivation(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ACTIVATION:
      return {
        ...state,
        loading: true,
      };
    case USER_ACTIVATION:
      return {
        ...state,
        loading: true,
      };
    case USER_ACTIVATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_ACTIVATION_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_ACTIVATION_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        data: action?.data,
      };
    case GET_USER_ACTIVATION_FAILURE:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
