import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";
import {
  GET_FORM_PLUGINS,
  GET_FORM_PLUGINS_SUCCESS,
  GET_FORM_PLUGINS_FAILED,
  ADD_WEBHOOK_PLUGIN,
  ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED,
  ADD_WEBHOOK_PLUGIN_SUCCESS,
  ADD_WEBHOOK_PLUGIN_FAILED,
  DELETE_PLUGIN,
  DELETE_PLUGIN_SUCCESS,
  DELETE_PLUGIN_FAILED,
  UPDATE_PLUGIN,
  UPDATE_PLUGIN_SUCCESS,
  UPDATE_PLUGIN_FAILED,
  UPDATE_PLUGIN_VALIDATION_FAILED,
  ADD_AUTO_RESPONDER_PLUGIN,
  ADD_AUTO_RESPONDER_PLUGIN_VALIDATION_FAILED,
  ADD_AUTO_RESPONDER_PLUGIN_SUCCESS,
  ADD_AUTO_RESPONDER_PLUGIN_FAILED,
  ADD_SLACK_PLUGIN,
  ADD_SLACK_PLUGIN_VALIDATION_FAILED,
  ADD_SLACK_PLUGIN_SUCCESS,
  ADD_SLACK_PLUGIN_FAILED,
  ADD_TELEGRAM_PLUGIN,
  ADD_TELEGRAM_PLUGIN_VALIDATION_FAILED,
  ADD_TELEGRAM_PLUGIN_SUCCESS,
  ADD_TELEGRAM_PLUGIN_FAILED,

  ADD_DISCORD_PLUGIN,
  ADD_DISCORD_PLUGIN_VALIDATION_FAILED,
  ADD_DISCORD_PLUGIN_SUCCESS,
  ADD_DISCORD_PLUGIN_FAILED,

  ADD_ZAPIER_PLUGIN,
  ADD_ZAPIER_PLUGIN_VALIDATION_FAILED,
  ADD_ZAPIER_PLUGIN_SUCCESS,
  ADD_ZAPIER_PLUGIN_FAILED,

  ADD_MAKE_PLUGIN,
  ADD_MAKE_PLUGIN_VALIDATION_FAILED,
  ADD_MAKE_PLUGIN_SUCCESS,
  ADD_MAKE_PLUGIN_FAILED,

  ADD_MAILCHIMP_PLUGIN,
  ADD_MAILCHIMP_PLUGIN_VALIDATION_FAILED,
  ADD_MAILCHIMP_PLUGIN_SUCCESS,
  ADD_MAILCHIMP_PLUGIN_FAILED,

  ADD_HUBSPOT_PLUGIN,
  ADD_HUBSPOT_PLUGIN_VALIDATION_FAILED,
  ADD_HUBSPOT_PLUGIN_SUCCESS,
  ADD_HUBSPOT_PLUGIN_FAILED,

  ADD_ZENDESK_PLUGIN,
  ADD_ZENDESK_PLUGIN_VALIDATION_FAILED,
  ADD_ZENDESK_PLUGIN_SUCCESS,
  ADD_ZENDESK_PLUGIN_FAILED,
} from "../actions/FomPlugins";
import { omit } from "lodash";

export function* updatePluginDataAttempt(payload) {
  const formId = payload?.payload?.formId;
  const pluginId = payload?.payload?.pluginId;

  const pluginData = payload?.payload;
  omit(pluginData, "formId");

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/${pluginId}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "PUT", pluginData);

  if (response) {
    yield put({
      type: UPDATE_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: UPDATE_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: UPDATE_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* deletePluginAttempt(payload) {
  const formId = payload?.payload?.formId;
  const pluginId = payload?.payload?.pluginId;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/plugins/${pluginId}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: DELETE_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_PLUGIN_FAILED,
      message: data.message,
    });
  }
}

export function* getPluginsAttempt(payload) {
  const id = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_FORM_PLUGINS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_FORM_PLUGINS_FAILED,
      message: data.message,
    });
  }
}

export function* addWebhookPluginAttempt(payload) {
  const id = payload?.payload?.formId;
  const data = omit(payload?.payload, "formId");
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/webhooks`;

  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: ADD_WEBHOOK_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_WEBHOOK_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

// add discord plugin
export function* addDiscordPluginAttempt(payload) {
  const id = payload?.payload?.formId;
  const data = omit(payload?.payload, "formId");
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/discord/add`;

  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: ADD_DISCORD_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_DISCORD_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_DISCORD_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

// add zapier plugin
export function* addZapierPluginAttempt(payload) {
  const id = payload?.payload?.formId;
  const data = omit(payload?.payload, "formId");
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/zapier/add`;

  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: ADD_ZAPIER_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_ZAPIER_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_ZAPIER_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addAutoResponderPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const data = omit(payload?.payload, "formId");
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/auto-responder`;

  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: ADD_AUTO_RESPONDER_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_AUTO_RESPONDER_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_AUTO_RESPONDER_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addSlackPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/slack`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");
  if (response) {
    yield put({
      type: ADD_SLACK_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_SLACK_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_SLACK_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}
export function* addTelegramPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const finalPayload = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/telegram/add`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalPayload);
  if (response) {
    yield put({
      type: ADD_TELEGRAM_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_TELEGRAM_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_TELEGRAM_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addMakePluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const finalPayload = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/make/add`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalPayload);
  if (response) {
    yield put({
      type: ADD_MAKE_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_MAKE_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_MAKE_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addMailchimpPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const finalPayload = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/mailchimp/add`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalPayload);
  if (response) {
    yield put({
      type: ADD_MAILCHIMP_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_MAILCHIMP_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_MAILCHIMP_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addHubspotPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const finalPayload = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/hubspot/add`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalPayload);
  if (response) {
    yield put({
      type: ADD_HUBSPOT_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_HUBSPOT_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_HUBSPOT_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* addZendeskPluginDataAttempt(payload) {
  const id = payload?.payload?.formId;
  const finalPayload = payload?.payload;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/plugins/zendesk/add`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalPayload);
  if (response) {
    yield put({
      type: ADD_ZENDESK_PLUGIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    } else if (data?.status === "validation_error") {
      yield put({
        type: ADD_ZENDESK_PLUGIN_VALIDATION_FAILED,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_ZENDESK_PLUGIN_FAILED,
        message: data.message,
      });
    }
  }
}

export function* deletePlugin() {
  yield takeLatest(DELETE_PLUGIN, deletePluginAttempt);
}
export function* updatePluginData() {
  yield takeLatest(UPDATE_PLUGIN, updatePluginDataAttempt);
}
export function* getPlugins() {
  yield takeLatest(GET_FORM_PLUGINS, getPluginsAttempt);
}
export function* addWebhookPlugin() {
  yield takeLatest(ADD_WEBHOOK_PLUGIN, addWebhookPluginAttempt);
}

// add discord plugin
export function* addDiscordPlugin() {
  yield takeLatest(ADD_DISCORD_PLUGIN, addDiscordPluginAttempt);
}

// add zapier plugin
export function* addZapierPlugin() {
  yield takeLatest(ADD_ZAPIER_PLUGIN, addZapierPluginAttempt);
}

export function* addAutoResponderPluginData() {
  yield takeLatest(ADD_AUTO_RESPONDER_PLUGIN, addAutoResponderPluginDataAttempt);
}
export function* addSlackPluginData() {
  yield takeLatest(ADD_SLACK_PLUGIN, addSlackPluginDataAttempt);
}
export function* addTelegramPluginData() {
  yield takeLatest(ADD_TELEGRAM_PLUGIN, addTelegramPluginDataAttempt);
}

export function* addMakePluginData() {
  yield takeLatest(ADD_MAKE_PLUGIN, addMakePluginDataAttempt);
}   

export function* addMailchimpPluginData() {
  yield takeLatest(ADD_MAILCHIMP_PLUGIN, addMailchimpPluginDataAttempt);
}

export function* addHubspotPluginData() {
  yield takeLatest(ADD_HUBSPOT_PLUGIN, addHubspotPluginDataAttempt);
}

export function* addZendeskPluginData() {
  yield takeLatest(ADD_ZENDESK_PLUGIN, addZendeskPluginDataAttempt);
}

export default function* rootSaga() {
  yield all([getPlugins(), addWebhookPlugin(), deletePlugin(), updatePluginData(), addAutoResponderPluginData(), addSlackPluginData(), addTelegramPluginData(), addDiscordPlugin(), addZapierPlugin(), addMakePluginData(), addMailchimpPluginData(), addHubspotPluginData(), addZendeskPluginData()]);
}
