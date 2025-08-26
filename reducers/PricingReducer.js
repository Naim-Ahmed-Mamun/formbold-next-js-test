import { toast } from "react-toastify";
import {
  BILLING_PAGE_DATA,
  BILLING_PAGE_DATA_FAILURE,
  BILLING_PAGE_DATA_SUCCESS,
  PRICING_PAGE_DATA,
  PRICING_PAGE_DATA_SUCCESS,
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_SUCCESS,
  CHANGE_PLAN_SUCCESS,
  CHANGE_PLAN_FAILURE,
  CHANGE_PLAN,
  RESET_PADDLE_CHECKOUT,
} from "../actions/PricingActions";

const initialState = {
  loading: false,
  pageLoader: false,
  hasSubscription: false,
  updatePaymentInfoUrl: undefined,
  plans: [],
  paddleSuccessCallback: false,
  requestSuccess: false,
  subscribedPlan: undefined,
};

export default function pricingPage(state = initialState, action) {
  switch (action.type) {
    case PRICING_PAGE_DATA:
      return {
        ...state,
        loading: true,
        pageLoader: true,
        paddleSuccessCallback: false,
      };
    case PRICING_PAGE_DATA_SUCCESS:
      const { data } = action?.data;
      return {
        ...state,
        loading: false,
        pageLoader: false,
        plans: data?.plans,
      };

    case BILLING_PAGE_DATA:
      return {
        ...state,
        loading: true,
        pageLoader: true,
        paddleSuccessCallback: false,
      };
    case BILLING_PAGE_DATA_SUCCESS:
      const { data: finalData } = action?.data;
      return {
        ...state,
        loading: false,
        pageLoader: false,
        plans: finalData?.plans,
        hasSubscription: finalData?.hasSubscription,
        updatePaymentInfoUrl: finalData?.updatePaymentInfoUrl,
        subscribedPlan: finalData?.subscribedPlan,
      };
    case BILLING_PAGE_DATA_FAILURE:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };

    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SUBSCRIPTION_SUCCESS:
      const { data: subsData } = action?.data;
      return {
        ...state,
        loading: false,
        updatePaymentInfoUrl: subsData?.link,
        paddleSuccessCallback: true,
        requestSuccess: true,
      };
    case CREATE_SUBSCRIPTION_FAILURE:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: false,
      };

    case RESET_PADDLE_CHECKOUT:
      return {
        ...state,
        loading: false,
        updatePaymentInfoUrl: undefined,
        paddleSuccessCallback: false,
        requestSuccess: false,
      };
    case CHANGE_PLAN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PLAN_SUCCESS:
      const { data: planData } = action?.data;
      toast.success(action?.data?.message);
      return {
        ...state,
        loading: false,
        requestSuccess: true,
        subscribedPlan: planData?.subscribedPlan,
      };
    case CHANGE_PLAN_FAILURE:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        paddleSuccessCallback: false,
        requestSuccess: false,
      };

    default:
      return state;
  }
}
