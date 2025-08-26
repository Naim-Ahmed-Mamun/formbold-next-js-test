import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";
import { signOut } from "../actions";
import { unAuthorized } from "../utils/constants/apiStatus";
import { GET_INVOICES, GET_INVOICES_FAILED, GET_INVOICES_SUCCESS } from "../actions/Invoices";

export function* getUserInvoicesAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/invoice`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_INVOICES_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_INVOICES_FAILED,
      message: data.message,
    });
  }
}

export function* getUserInvoices() {
  yield takeLatest(GET_INVOICES, getUserInvoicesAttempt);
}

export default function* rootSaga() {
  yield all([getUserInvoices()]);
}
