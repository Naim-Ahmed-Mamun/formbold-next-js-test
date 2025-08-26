import { toast } from "react-toastify";
import { GET_INVOICES, GET_INVOICES_SUCCESS, GET_INVOICES_FAILED } from "../actions/Invoices";

const initialState = {
  loading: false,
  requestSucess: false,
  pageLoading: false,
  data: [],
};

export default function invoiceReducers(state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        data: action?.data?.receipts ? action?.data?.receipts : [],
      };
    case GET_INVOICES_FAILED:
      toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    default:
      return state;
  }
}
