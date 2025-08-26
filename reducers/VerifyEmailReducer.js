import { toast } from "react-toastify";
import {
  RESEND_VERIFY_EMAIL,
  RESEND_VERIFY_EMAIL_FAILURE,
  RESEND_VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
} from "../actions/VerifyEmailActions";

const initialState = {
  loading: false,
  requestSuccess: false,
};

export default function verifyEmail(state = initialState, action) {
  switch (action.type) {
    case VERIFY_EMAIL:
      return {
        ...state,
        loading: true,
        requestSuccess: false,
      };
    case VERIFY_EMAIL_SUCCESS:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: true,
      };
    case VERIFY_EMAIL_FAILURE:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: false,
      };
    case RESEND_VERIFY_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case RESEND_VERIFY_EMAIL_SUCCESS:
      toast.success(action?.data?.message);
      return {
        ...state,
        loading: false,
      };
    case RESEND_VERIFY_EMAIL_FAILURE:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
