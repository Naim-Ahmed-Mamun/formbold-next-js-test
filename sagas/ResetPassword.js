import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST_FAILURE, RESET_PASSWORD_REQUEST_SUCCESS, RESET_PASSWORD_REQUEST_VALIDATION_ERROR } from "../actions/ResetPassword";

export function* requestResetPassAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;
  const requestPayload = payload?.payload;
  const { response, error } = yield defaultApi(endpoint, "POST", requestPayload);
  if (response) {
    yield put({
      type: RESET_PASSWORD_REQUEST_SUCCESS,
      message: response && response?.data?.message,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: RESET_PASSWORD_REQUEST_VALIDATION_ERROR,
        message: data?.message,
        errors: data?.errors,
      });
    } else {
      yield put({
        type: RESET_PASSWORD_REQUEST_FAILURE,
        message: data?.message,
      });
    }
  }
}

export function* requestResetPass() {
  yield takeLatest(RESET_PASSWORD_REQUEST, requestResetPassAttempt);
}

export default function* rootSaga() {
  yield all([requestResetPass()]);
}
