import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";
import {
  RESEND_VERIFY_EMAIL,
  RESEND_VERIFY_EMAIL_FAILURE,
  RESEND_VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
} from "../actions/VerifyEmailActions";

import { unAuthorized } from "../utils/constants/apiStatus";

export function* verifyEmailAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`;

  const id = payload?.payload?.id;
  const hash = payload?.payload?.hash;

  delete payload?.payload.id;
  delete payload?.payload.hash;

  const encodedParams = new URLSearchParams(payload.payload).toString();
  const { response, error } = yield defaultApi(`${endpoint}/${id}/${hash}?${encodedParams}`, "GET");

  if (response) {
    yield put({
      type: VERIFY_EMAIL_SUCCESS,
      message: response && response.data.message,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: VERIFY_EMAIL_FAILURE,
      message: data.message,
    });
  }
}
export function* resendVerifyEmailAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/email/verification-notification`;
  const { response, error } = yield defaultApi(endpoint, "POST");
  if (response) {
    yield put({
      type: RESEND_VERIFY_EMAIL_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: RESEND_VERIFY_EMAIL_FAILURE,
      message: data.message,
    });
  }
}

export function* verifyEmail() {
  yield takeLatest(VERIFY_EMAIL, verifyEmailAttempt);
}
export function* resendVerifyEmail() {
  yield takeLatest(RESEND_VERIFY_EMAIL, resendVerifyEmailAttempt);
}

export default function* rootSaga() {
  yield all([verifyEmail(), resendVerifyEmail()]);
}
