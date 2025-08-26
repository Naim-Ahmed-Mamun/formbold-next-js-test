export const GET_USER_DASHBOARD = "GET_USER_DASHBOARD";
export const GET_USER_DASHBOARD_SUCCESS = "GET_USER_DASHBOARD_SUCCESS";
export const GET_USER_DASHBOARD_FAILED = "GET_USER_DASHBOARD_FAILED";

export function getUserDashboardData() {
  return {
    type: GET_USER_DASHBOARD,
  };
}
