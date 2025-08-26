export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const SIGN_IN_VALIDATION_FAILED = "SIGN_IN_VALIDATION_FAILED";

//modal
export const SHOW_SIGN_IN_MODAL = "SHOW_SIGN_IN_MODAL";
export const CLOSE_SIGN_IN_MODAL = "CLOSE_SIGN_IN_MODAL";

export const SHOW_SIGN_UP_MODAL = "SHOW_SIGN_UP_MODAL";
export const CLOSE_SIGN_UP_MODAL = "CLOSE_SIGN_UP_MODAL";

export const GET_USER_REQUIRED_DATA = "GET_USER_REQUIRED_DATA";
export const GET_USER_REQUIRED_DATA_SUCCESS = "GET_USER_REQUIRED_DATA_SUCCESS";
export const GET_USER_REQUIRED_DATA_FAILURE = "GET_USER_REQUIRED_DATA_FAILURE";

export const MAKE_USER_LOGGED_IN = "MAKE_USER_LOGGED_IN";
export const MAKE_USER_LOGGED_IN_SUCCESS = "MAKE_USER_LOGGED_IN_SUCCESS";
export const MAKE_USER_LOGGED_IN_FAILURE = "MAKE_USER_LOGGED_IN_FAILURE";

export function signin({ email, password }) {
  return {
    type: SIGN_IN,
    credentials: {
      email,
      password,
    },
  };
}

export function getUserRequiredData() {
  return {
    type: GET_USER_REQUIRED_DATA,
  };
}

export function makeUserLoggedIn(data) {
  return {
    type: MAKE_USER_LOGGED_IN,
    payload: data,
  };
}
