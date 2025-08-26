import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_TIMEZONE,
  UPDATE_TIMEZONE_SUCCESS,
  UPDATE_TIMEZONE_FAILED,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  DELETE_LINKED_EMAIL,
  DELETE_LINKED_EMAIL_SUCCESS,
  DELETE_LINKED_EMAIL_FAILED,
  ADD_NEW_LINKED_EMAIL,
  ADD_NEW_LINKED_EMAIL_SUCCESS,
  ADD_NEW_LINKED_EMAIL_FAILED,
  ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED,
  DELETE_USER_ACCOUNT,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAILED,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
} from "../actions/AccountSettings";

export function* getUserProfileAttempt(payload) {
  const data = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account/${data.id}/profile`;

  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_USER_PROFILE_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_USER_PROFILE_FAILED,
      message: data.message,
    });
  }
}

export function* userProfileDeleteRequestAttempt(payload) {
  const data = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account/${data.id}/delete`;

  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: DELETE_USER_ACCOUNT_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_USER_ACCOUNT_FAILED,
      message: data.message,
    });
  }
}

export function* userProfileUpdateAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account`;
  const data = payload?.payload;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data, false, {
    ContentType: "multipart/form-data",
  });

  if (response) {
    yield put({
      type: UPDATE_USER_PROFILE_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPDATE_USER_PROFILE_FAILED,
      message: data.message,
    });
  }
}

export function* updateTimezoneAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account/timezone`;
  const data = payload?.payload;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: UPDATE_TIMEZONE_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPDATE_TIMEZONE_FAILED,
      message: data.message,
    });
  }
}
export function* passwordUpdateAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account/password`;
  const data = payload?.payload;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: UPDATE_PASSWORD_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPDATE_PASSWORD_FAILED,
      message: data.message,
    });
  }
}

export function* deleteUserLinkeEmailAttempt(payload) {
  const email = payload?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/email-addresses/${email}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: DELETE_LINKED_EMAIL_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_LINKED_EMAIL_FAILED,
      message: data.message,
    });
  }
}

export function* addUserLinkeEmailAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/email-addresses`;
  const data = payload.data;

  const { response, error } = yield defaultApi(endpoint, "POST", data);

  if (response) {
    yield put({
      type: ADD_NEW_LINKED_EMAIL_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_NEW_LINKED_EMAIL_FAILED,
        message: data.message,
      });
    }
  }
}

export function* userProfileUpdateRequest() {
  yield takeLatest(UPDATE_USER_PROFILE, userProfileUpdateAttempt);
}
export function* userProfileDeleteRequest() {
  yield takeLatest(DELETE_USER_ACCOUNT, userProfileDeleteRequestAttempt);
}
export function* getUserProfile() {
  yield takeLatest(GET_USER_PROFILE, getUserProfileAttempt);
}
export function* updateTimezone() {
  yield takeLatest(UPDATE_TIMEZONE, updateTimezoneAttempt);
}
export function* passwordUpdate() {
  yield takeLatest(UPDATE_PASSWORD, passwordUpdateAttempt);
}
export function* deleteUserLinkeEmail() {
  yield takeLatest(DELETE_LINKED_EMAIL, deleteUserLinkeEmailAttempt);
}
export function* addUserLinkeEmail() {
  yield takeLatest(ADD_NEW_LINKED_EMAIL, addUserLinkeEmailAttempt);
}

export default function* rootSaga() {
  yield all([userProfileUpdateRequest(), updateTimezone(), passwordUpdate(), deleteUserLinkeEmail(), addUserLinkeEmail(), userProfileDeleteRequest(), getUserProfile()]);
}
