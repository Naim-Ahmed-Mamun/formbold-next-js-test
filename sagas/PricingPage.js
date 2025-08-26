import { all, put, takeLatest } from "redux-saga/effects";
import { signOut } from "../actions";
import {
  BILLING_PAGE_DATA,
  BILLING_PAGE_DATA_FAILURE,
  BILLING_PAGE_DATA_SUCCESS,
  CHANGE_PLAN,
  CHANGE_PLAN_FAILURE,
  CHANGE_PLAN_SUCCESS,
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_SUCCESS,
  PRICING_PAGE_DATA,
  PRICING_PAGE_DATA_FAILURE,
  PRICING_PAGE_DATA_SUCCESS,
} from "../actions/PricingActions";

import { defaultApi } from "../config/axiosApi";
import { unAuthorized } from "../utils/constants/apiStatus";

export function* makeSubscriptionAttempt(data) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;
  const payLoad = data.data;
  const { response, error } = yield defaultApi(endpoint, "POST", payLoad);
  if (response) {
    yield put({
      type: CREATE_SUBSCRIPTION_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: CREATE_SUBSCRIPTION_FAILURE,
      message: data.message,
    });
  }
}

export function* changePlanAttempt(data) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;
  const payLoad = data.data;
  const { response, error } = yield defaultApi(endpoint, "PUT", payLoad);
  if (response) {
    yield put({
      type: CHANGE_PLAN_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: CHANGE_PLAN_FAILURE,
      message: data.message,
    });
  }
}

export function* getBillingPageDataAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/billing`;
  const { response, error } = yield defaultApi(endpoint, "GET");
  if (response) {
    yield put({
      type: BILLING_PAGE_DATA_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: BILLING_PAGE_DATA_FAILURE,
      message: data.message,
    });
  }
}

export function* getPricingPageDataAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/pricing`;
  const { response, error } = yield defaultApi(endpoint, "GET");
  if (response) {
    yield put({
      type: PRICING_PAGE_DATA_SUCCESS,
      data: response && response.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
      // window.location.reload();
    }
    yield put({
      type: PRICING_PAGE_DATA_FAILURE,
      message: data.message,
    });
  }
}

export function* makeSubscription() {
  yield takeLatest(CREATE_SUBSCRIPTION, makeSubscriptionAttempt);
}

export function* changePlan() {
  yield takeLatest(CHANGE_PLAN, changePlanAttempt);
}

export function* getBillingPageData() {
  yield takeLatest(BILLING_PAGE_DATA, getBillingPageDataAttempt);
}

export function* getPricingPageData() {
  yield takeLatest(PRICING_PAGE_DATA, getPricingPageDataAttempt);
}

export default function* rootSaga() {
  yield all([getPricingPageData(), getBillingPageData(), changePlan(), makeSubscription()]);
}
