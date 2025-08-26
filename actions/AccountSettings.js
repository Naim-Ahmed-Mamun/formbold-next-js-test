export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILED = "UPDATE_USER_PROFILE_FAILED";

export const UPDATE_TIMEZONE = "UPDATE_TIMEZONE";
export const UPDATE_TIMEZONE_SUCCESS = "UPDATE_TIMEZONE_SUCCESS";
export const UPDATE_TIMEZONE_FAILED = "UPDATE_TIMEZONE_FAILED";

export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";

export const DELETE_LINKED_EMAIL = "DELETE_LINKED_EMAIL";
export const DELETE_LINKED_EMAIL_SUCCESS = "DELETE_LINKED_EMAIL_SUCCESS";
export const DELETE_LINKED_EMAIL_FAILED = "DELETE_LINKED_EMAIL_FAILED";

export const DELETE_USER_ACCOUNT = "DELETE_USER_ACCOUNT";
export const DELETE_USER_ACCOUNT_SUCCESS = "DELETE_USER_ACCOUNT_SUCCESS";
export const DELETE_USER_ACCOUNT_FAILED = "DELETE_USER_ACCOUNT_FAILED";

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILED = "GET_USER_PROFILE_FAILED";

export const ADD_NEW_LINKED_EMAIL = "ADD_NEW_LINKED_EMAIL";
export const ADD_NEW_LINKED_EMAIL_SUCCESS = "ADD_NEW_LINKED_EMAIL_SUCCESS";
export const ADD_NEW_LINKED_EMAIL_FAILED = "ADD_NEW_LINKED_EMAIL_FAILED";

export const ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED = "ADD_NEW_LINKED_EMAIL_VALIDATION_FAILED";
export const RESET_LINKED_EMAIL_REQUEST_SUCCESS = "RESET_LINKED_EMAIL_REQUEST_SUCCESS";

export function deleteUserAccount(data) {
  return {
    type: DELETE_USER_ACCOUNT,
    payload: data,
  };
}
export function getUserProfileData(data) {
  return {
    type: GET_USER_PROFILE,
    payload: data,
  };
}

export function userProfileUpdate(data) {
  return {
    type: UPDATE_USER_PROFILE,
    payload: data,
  };
}
export function updateTimeZone(data) {
  return {
    type: UPDATE_TIMEZONE,
    payload: data,
  };
}
export function updatePassword(data) {
  return {
    type: UPDATE_PASSWORD,
    payload: data,
  };
}

export function resetPasswordRequestSuccess() {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
  };
}

export function resetLinkedEmailRequestSuccess() {
  return {
    type: RESET_LINKED_EMAIL_REQUEST_SUCCESS,
  };
}
export function deleteLinkedEmail(id) {
  return {
    type: DELETE_LINKED_EMAIL,
    id: id,
  };
}

export function addNewLinkedEmail(data) {
  return {
    type: ADD_NEW_LINKED_EMAIL,
    data: data,
  };
}
