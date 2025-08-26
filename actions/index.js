export const SIGNED_OUT = "SIGNED_OUT";
export const LOADING_START = "LOADING_START";
export const LOADING_STOP = "LOADING_STOP";
export const TOKEN_ERROR = "TOKEN_ERROR";
export const FORCE_SIGNED_OUT = "FORCE_SIGNED_OUT";

export function signOut() {
  return {
    type: SIGNED_OUT,
  };
}

export function loadingStart() {
  return {
    type: LOADING_START,
  };
}

export function loadingStop() {
  return {
    type: LOADING_STOP,
  };
}

export function forceLogout() {
  return {
    type: FORCE_SIGNED_OUT,
  };
}
