import { all, put, takeLatest } from "redux-saga/effects";
import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_VALIDATION_FAILED } from "../actions/SignUpActions";

import { defaultApi } from "../config/axiosApi";

export function* registrationAttempt(credentials) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const credentials2 = credentials.credentials;

  const { response, error } = yield defaultApi(endpoint, "POST", credentials2);

  if (response) {
    yield put({
      type: REGISTER_SUCCESS,
      credentials: response && response.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: REGISTER_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: REGISTER_FAILURE,
        message: data.message,
      });
    }
  }
}

export function* regiter() {
  yield takeLatest(REGISTER, registrationAttempt);
}

export default function* rootSaga() {
  yield all([regiter()]);
}
