export const MAKE_USER_SIGNED_IN = "MAKE_USER_SIGNED_IN";

export function makeSignedIn(data) {
  return {
    type: MAKE_USER_SIGNED_IN,
    payload: data,
  };
}
