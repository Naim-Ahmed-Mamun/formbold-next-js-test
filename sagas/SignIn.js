import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import {
  SIGN_IN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_VALIDATION_FAILED,
  GET_USER_REQUIRED_DATA,
  GET_USER_REQUIRED_DATA_SUCCESS,
  GET_USER_REQUIRED_DATA_FAILURE,
  MAKE_USER_LOGGED_IN,
  MAKE_USER_LOGGED_IN_SUCCESS,
  MAKE_USER_LOGGED_IN_FAILURE,
} from "../actions/SigninActions";

export function* makeUserLoggedInAttempt(credentials) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/social-login`;
  const payload = credentials.payload;

  const { response, error } = yield defaultApi(endpoint, "POST", payload);

  if (response) {
    yield put({
      type: MAKE_USER_LOGGED_IN_SUCCESS,
      credentials: response && response.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: SIGN_IN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: MAKE_USER_LOGGED_IN_FAILURE,
        message: data.message,
      });
    }
  }
}

export function* signinAttempt(credentials) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const credentials2 = credentials.credentials;

  const { response, error } = yield defaultApi(endpoint, "POST", credentials2);

  if (response) {
    yield put({
      type: SIGN_IN_SUCCESS,
      credentials: response && response.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: SIGN_IN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: SIGN_IN_FAILURE,
        message: data.message,
      });
    }
  }
}

export function* userRequiredDataAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/required-info`;
  const { response, error } = yield defaultApi(endpoint, "GET");

  if (response) {
    yield put({
      type: GET_USER_REQUIRED_DATA_SUCCESS,
      credentials: response && response.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: SIGN_IN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: GET_USER_REQUIRED_DATA_FAILURE,
        message: data.message,
      });
    }
  }
}

export function* signin() {
  yield takeLatest(SIGN_IN, signinAttempt);
}

export function* userRequiredData() {
  yield takeLatest(GET_USER_REQUIRED_DATA, userRequiredDataAttempt);
}

export function* makeUserLoggedIn() {
  yield takeLatest(MAKE_USER_LOGGED_IN, makeUserLoggedInAttempt);
}

export default function* rootSaga() {
  yield all([signin(), userRequiredData(), makeUserLoggedIn()]);
}
