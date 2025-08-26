export const GET_WEBHOOK_TOKENS = "GET_WEBHOOK_TOKENS";
export const GET_WEBHOOK_TOKENS_SUCCESS = "GET_WEBHOOK_TOKENS_SUCCESS";
export const GET_WEBHOOK_TOKENS_FAILED = "GET_WEBHOOK_TOKENS_FAILED";

export const ADD_WEBHOOK_TOKEN = "ADD_WEBHOOK_TOKEN";
export const ADD_WEBHOOK_TOKEN_VALIDATION_FAILED = "ADD_WEBHOOK_TOKEN_VALIDATION_FAILED";
export const ADD_WEBHOOK_TOKEN_SUCCESS = "ADD_WEBHOOK_TOKEN_SUCCESS";
export const ADD_WEBHOOK_TOKEN_FAILED = "ADD_WEBHOOK_TOKEN_FAILED";

export const REVOKE_WEBHOOK_TOKEN = "REVOKE_WEBHOOK_TOKEN";
export const REVOKE_WEBHOOK_TOKEN_SUCCESS = "REVOKE_WEBHOOK_TOKEN_SUCCESS";
export const REVOKE_WEBHOOK_TOKEN_FAILED = "REVOKE_WEBHOOK_TOKEN_FAILED";

export const RESET_WEBHOOK_REQUEST_SUCCESS = "RESET_WEBHOOK_REQUEST_SUCCESS";

export function getUserApiTokens() {
  return {
    type: GET_WEBHOOK_TOKENS,
  };
}

export function addUserApiToken(data) {
  return {
    type: ADD_WEBHOOK_TOKEN,
    data,
  };
}

export function revokeUserApiToken(tokenId) {
  return {
    type: REVOKE_WEBHOOK_TOKEN,
    id: tokenId,
  };
}

export function resetWebhookRequstSuccess() {
  return {
    type: RESET_WEBHOOK_REQUEST_SUCCESS,
  };
}
