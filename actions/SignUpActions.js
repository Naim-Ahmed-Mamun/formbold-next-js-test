export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_VALIDATION_FAILED = "REGISTER_VALIDATION_FAILED";

export const RESET_REGISTER_VALIDATION_ERROR = "RESET_REGISTER_VALIDATION_ERROR";

export function register(data) {
  return {
    type: REGISTER,
    credentials: {
      ...data,
    },
  };
}

export function resetValidationError() {
  return {
    type: RESET_REGISTER_VALIDATION_ERROR,
  };
}
