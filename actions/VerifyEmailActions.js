export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_FAILURE = "VERIFY_EMAIL_FAILURE";

export const RESEND_VERIFY_EMAIL = "RESEND_VERIFY_EMAIL";
export const RESEND_VERIFY_EMAIL_SUCCESS = "RESEND_VERIFY_EMAIL_SUCCESS";
export const RESEND_VERIFY_EMAIL_FAILURE = "RESEND_VERIFY_EMAIL_FAILURE";

export function resendVerifyEmail() {
  return {
    type: RESEND_VERIFY_EMAIL,
  };
}
export function verifyEmail(data) {
  return {
    type: VERIFY_EMAIL,
    payload: data,
  };
}
