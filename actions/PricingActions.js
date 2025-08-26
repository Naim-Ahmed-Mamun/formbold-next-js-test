export const PRICING_PAGE_DATA = "PRICING_PAGE_DATA";
export const PRICING_PAGE_DATA_SUCCESS = "PRICING_PAGE_DATA_SUCCESS";
export const PRICING_PAGE_DATA_FAILURE = "PRICING_PAGE_DATA_FAILURE";

export const BILLING_PAGE_DATA = "BILLING_PAGE_DATA";
export const BILLING_PAGE_DATA_SUCCESS = "BILLING_PAGE_DATA_SUCCESS";
export const BILLING_PAGE_DATA_FAILURE = "BILLING_PAGE_DATA_FAILURE";

export const CREATE_SUBSCRIPTION = "CREATE_SUBSCRIPTION";
export const CREATE_SUBSCRIPTION_SUCCESS = "CREATE_SUBSCRIPTION_SUCCESS";
export const CREATE_SUBSCRIPTION_FAILURE = "CREATE_SUBSCRIPTION_FAILURE";

export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_PLAN_SUCCESS = "CHANGE_PLAN_SUCCESS";
export const CHANGE_PLAN_FAILURE = "CHANGE_PLAN_FAILURE";

export const RESET_PADDLE_CHECKOUT = "RESET_PADDLE_CHECKOUT";

export function makeSubscription(data) {
  return {
    type: CREATE_SUBSCRIPTION,
    data: data,
  };
}
export function changePlan(data) {
  return {
    type: CHANGE_PLAN,
    data: data,
  };
}
export function getBillingPageData() {
  return {
    type: BILLING_PAGE_DATA,
  };
}
export function getPricingPageData() {
  return {
    type: PRICING_PAGE_DATA,
  };
}

export function resetPaddleCheckout() {
  return {
    type: RESET_PADDLE_CHECKOUT,
  };
}
