import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import { GET_USER_DASHBOARD, GET_USER_DASHBOARD_FAILED, GET_USER_DASHBOARD_SUCCESS } from "../actions/UserDashboard";

export function* userDashboardRequestAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/account/dashboard`;

  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_USER_DASHBOARD_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_USER_DASHBOARD_FAILED,
      message: data.message,
    });
  }
}

export function* userDashboardRequest() {
  yield takeLatest(GET_USER_DASHBOARD, userDashboardRequestAttempt);
}

export default function* rootSaga() {
  yield all([userDashboardRequest()]);
}
