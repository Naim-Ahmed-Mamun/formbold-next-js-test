export const GET_USER_ACTIVATION = "GET_USER_ACTIVATION";
export const GET_USER_ACTIVATION_SUCCESS = "GET_USER_ACTIVATION_SUCCESS";
export const GET_USER_ACTIVATION_FAILURE = "GET_USER_ACTIVATION_FAILURE";

export const USER_ACTIVATION = "USER_ACTIVATION";
export const USER_ACTIVATION_SUCCESS = "USER_ACTIVATION_SUCCESS";
export const USER_ACTIVATION_FAILURE = "USER_ACTIVATION_FAILURE";

export function userActivationAttempt(data) {
  return {
    type: USER_ACTIVATION,
    payload: data,
  };
}
export function getUserActivationData(data) {
  return {
    type: GET_USER_ACTIVATION,
    payload: data,
  };
}
