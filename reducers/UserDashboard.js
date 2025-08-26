import { GET_USER_DASHBOARD, GET_USER_DASHBOARD_FAILED, GET_USER_DASHBOARD_SUCCESS } from "../actions/UserDashboard";

const initialState = {
  loading: false,
  requestSuccess: false,
  formsCount: 0,
  statistics: {
    items: [],
    categories: [],
  },
  plans: [],
};

export default function userDashboard(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DASHBOARD:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSuccess: true,
        formsCount: action?.data?.formsCount,
        statistics: action?.data?.statistics,
        plans: action?.data?.plans,
        activeFormsCount: action?.data?.activeFormsCount,
        archivedFormsCount: action?.data?.archivedFormsCount,
      };
    case GET_USER_DASHBOARD_FAILED:
      return {
        ...state,
        loading: false,
        requestSuccess: false,
      };
    default:
      return state;
  }
}
