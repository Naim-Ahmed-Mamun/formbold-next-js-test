import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_REQUEST_FAILURE, FORGOT_PASSWORD_REQUEST_SUCCESS } from "../actions/ForgotPassword";

export function* requestForgotPassAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`;
  const email = payload?.payload;

  const { response, error } = yield defaultApi(endpoint, "POST", email);
  if (response) {
    yield put({
      type: FORGOT_PASSWORD_REQUEST_SUCCESS,
      message: response && response?.data?.message,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: FORGOT_PASSWORD_REQUEST_FAILURE,
      message: data.message,
    });
  }
}

export function* requestForgotPass() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, requestForgotPassAttempt);
}

export default function* rootSaga() {
  yield all([requestForgotPass()]);
}
