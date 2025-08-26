import { toast } from "react-toastify";
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_TIMEZONE,
  UPDATE_TIMEZONE_SUCCESS,
  UPDATE_TIMEZONE_FAILED,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  DELETE_LINKED_EMAIL,
  DELETE_LINKED_EMAIL_SUCCESS,
  DELETE_LINKED_EMAIL_FAILED,
  ADD_NEW_LINKED_EMAIL,
  ADD_NEW_LINKED_EMAIL_SUCCESS,
  ADD_NEW_LINKED_EMAIL_FAILED,
  ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED,
  RESET_LINKED_EMAIL_REQUEST_SUCCESS,
  DELETE_USER_ACCOUNT,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAILED,
} from "../actions/AccountSettings";

const initialState = {
  loading: false,
  requestSucess: false,
  pageLoading: false,
  passwordUpdate: {
    loading: false,
    requestSucess: false,
    pageLoading: false,
  },
  linkedEmails: {
    loading: false,
    requestSuccess: false,
    pageLoading: false,
    validationError: [],
  },
};

export default function accountSettings(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case DELETE_USER_ACCOUNT:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case DELETE_USER_ACCOUNT_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case DELETE_USER_ACCOUNT_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case GET_USER_PROFILE_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      // action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_TIMEZONE:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case UPDATE_TIMEZONE_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_TIMEZONE_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        passwordUpdate: {
          ...state.passwordUpdate,
          loading: true,
          // pageLoading: true,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        passwordUpdate: {
          ...state.passwordUpdate,
          loading: false,
          requestSucess: true,
          // pageLoading: false,
        },
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        passwordUpdate: {
          ...state.passwordUpdate,
          requestSucess: false,
        },
      };
    case UPDATE_PASSWORD_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        passwordUpdate: {
          ...state.passwordUpdate,
          loading: false,
          // pageLoading: false,
        },
      };
    case DELETE_LINKED_EMAIL:
      return {
        ...state,
        linkedEmails: {
          ...state.linkedEmails,
          loading: true,
        },
      };

    case DELETE_LINKED_EMAIL_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        linkedEmails: {
          loading: false,
        },
      };
    case DELETE_LINKED_EMAIL_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        linkedEmails: {
          ...state.linkedEmails,
          loading: false,
        },
      };
    case ADD_NEW_LINKED_EMAIL:
      return {
        ...state,
        linkedEmails: {
          ...state.linkedEmails,
          loading: true,
        },
      };
    case ADD_NEW_LINKED_EMAIL_SUCCESS:
      action?.data?.message && toast.success(action?.data?.message);
      return {
        ...state,
        linkedEmails: {
          ...state.linkedEmails,
          loading: false,
          requestSuccess: true,
        },
      };
    case ADD_NEW_LINKED_EMAIL_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        linkedEmails: {
          loading: false,
        },
      };
    case ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        linkedEmails: {
          loading: false,
          validationError: action.errors,
        },
      };
    case RESET_LINKED_EMAIL_REQUEST_SUCCESS:
      toast.error(action?.message);
      return {
        ...state,
        linkedEmails: {
          loading: false,
          requestSuccess: false,
          validationError: [],
        },
      };
    default:
      return state;
  }
}
