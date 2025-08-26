import { toast } from "react-toastify";
import {
  GET_WEBHOOK_TOKENS,
  GET_WEBHOOK_TOKENS_SUCCESS,
  GET_WEBHOOK_TOKENS_FAILED,
  REVOKE_WEBHOOK_TOKEN,
  REVOKE_WEBHOOK_TOKEN_SUCCESS,
  REVOKE_WEBHOOK_TOKEN_FAILED,
  ADD_WEBHOOK_TOKEN,
  ADD_WEBHOOK_TOKEN_SUCCESS,
  ADD_WEBHOOK_TOKEN_FAILED,
  ADD_WEBHOOK_TOKEN_VALIDATION_FAILED,
  RESET_WEBHOOK_REQUEST_SUCCESS,
} from "../actions/Webhooks";

const initialState = {
  loading: false,
  requestSucess: false,
  pageLoading: false,
  tokens: [],
  validationError: [],
  requestSuccess: false,
};

export default function WebhookReducers(state = initialState, action) {
  switch (action.type) {
    case GET_WEBHOOK_TOKENS:
      return {
        ...state,
        loading: true,
        pageLoading: true,
        validationError: [],
      };
    case GET_WEBHOOK_TOKENS_SUCCESS:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        tokens: action?.data?.tokens ? action?.data?.tokens : [],
      };
    case GET_WEBHOOK_TOKENS_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case REVOKE_WEBHOOK_TOKEN:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case REVOKE_WEBHOOK_TOKEN_SUCCESS:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
        tokens: action?.data?.tokens ? action?.data?.tokens : [],
      };
    case REVOKE_WEBHOOK_TOKEN_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case ADD_WEBHOOK_TOKEN:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case ADD_WEBHOOK_TOKEN_SUCCESS:
      toast.success(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
        tokens: action?.data?.tokens ? action?.data?.tokens : [],
        validationError: [],
        requestSuccess: true,
      };
    case ADD_WEBHOOK_TOKEN_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case ADD_WEBHOOK_TOKEN_VALIDATION_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
        validationError: action?.errors ? action?.errors : [],
      };
    case RESET_WEBHOOK_REQUEST_SUCCESS:
      return {
        ...state,
        requestSuccess: false,
      };
    default:
      return state;
  }
}
