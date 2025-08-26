import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";
import { signOut } from "../actions";
import { unAuthorized } from "../utils/constants/apiStatus";
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
} from "../actions/Webhooks";

export function* getUserApiTokensDataAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api-tokens`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_WEBHOOK_TOKENS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_WEBHOOK_TOKENS_FAILED,
      message: data.message,
    });
  }
}

export function* revokeuserApiTokenAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api-tokens/${payload?.id}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: REVOKE_WEBHOOK_TOKEN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: REVOKE_WEBHOOK_TOKEN_FAILED,
      message: data.message,
    });
  }
}

export function* addUserApiTokenAttempt(payload) {
  const data = payload.data;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api-tokens`;
  const { response, error } = yield defaultApi(endpoint, "POST", data);

  if (response) {
    yield put({
      type: ADD_WEBHOOK_TOKEN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: ADD_WEBHOOK_TOKEN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_WEBHOOK_TOKEN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addUserApiToken() {
  yield takeLatest(ADD_WEBHOOK_TOKEN, addUserApiTokenAttempt);
}

export function* getUserApiTokensData() {
  yield takeLatest(GET_WEBHOOK_TOKENS, getUserApiTokensDataAttempt);
}

export function* revokeuserApiToken() {
  yield takeLatest(REVOKE_WEBHOOK_TOKEN, revokeuserApiTokenAttempt);
}

export default function* rootSaga() {
  yield all([getUserApiTokensData(), revokeuserApiToken(), addUserApiToken()]);
}
