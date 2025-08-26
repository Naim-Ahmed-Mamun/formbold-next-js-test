import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import {
  GET_USER_ACTIVATION,
  GET_USER_ACTIVATION_FAILURE,
  GET_USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION,
  USER_ACTIVATION_FAILURE,
  USER_ACTIVATION_SUCCESS,
} from "../actions/userActivation";

export function* getUserActivationAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user-activations`;
  const data = payload?.payload;

  const { response, error } = yield defaultApi(`${endpoint}/${data}`, "GET");

  if (response) {
    yield put({
      type: GET_USER_ACTIVATION_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_USER_ACTIVATION_FAILURE,
      message: data.message,
    });
  }
}
export function* userActivationAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user-activations`;

  const id = payload?.payload?.id;
  delete payload?.payload.id;

  const data = payload?.payload;
  const { response, error } = yield defaultApi(`${endpoint}/${id}`, "POST", data);

  if (response) {
    yield put({
      type: USER_ACTIVATION_SUCCESS,
      message: response && response.data.message,
      credentials: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: USER_ACTIVATION_FAILURE,
      message: data.message,
    });
  }
}

export function* userActivation() {
  yield takeLatest(USER_ACTIVATION, userActivationAttempt);
}
export function* getUserActivation() {
  yield takeLatest(GET_USER_ACTIVATION, getUserActivationAttempt);
}

export default function* rootSaga() {
  yield all([userActivation(), getUserActivation()]);
}
