export const GET_FORM_PLUGINS = "GET_FORM_PLUGINS";
export const GET_FORM_PLUGINS_SUCCESS = "GET_FORM_PLUGINS_SUCCESS";
export const GET_FORM_PLUGINS_FAILED = "GET_FORM_PLUGINS_FAILED";

export const ADD_WEBHOOK_PLUGIN = "ADD_WEBHOOK_PLUGIN";
export const ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED = "ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED";
export const ADD_WEBHOOK_PLUGIN_SUCCESS = "ADD_WEBHOOK_PLUGIN_SUCCESS";
export const ADD_WEBHOOK_PLUGIN_FAILED = "ADD_WEBHOOK_PLUGIN_FAILED";

export const ADD_DISCORD_PLUGIN = "ADD_DISCORD_PLUGIN";
export const ADD_DISCORD_PLUGIN_VALIDATION_FAILED = "ADD_DISCORD_PLUGIN_VALIDATION_FAILED";
export const ADD_DISCORD_PLUGIN_SUCCESS = "ADD_DISCORD_PLUGIN_SUCCESS";
export const ADD_DISCORD_PLUGIN_FAILED = "ADD_DISCORD_PLUGIN_FAILED";

export const ADD_ZAPIER_PLUGIN = "ADD_ZAPIER_PLUGIN";
export const ADD_ZAPIER_PLUGIN_VALIDATION_FAILED = "ADD_ZAPIER_PLUGIN_VALIDATION_FAILED";
export const ADD_ZAPIER_PLUGIN_SUCCESS = "ADD_ZAPIER_PLUGIN_SUCCESS";
export const ADD_ZAPIER_PLUGIN_FAILED = "ADD_ZAPIER_PLUGIN_FAILED";

export const ADD_MAKE_PLUGIN = "ADD_MAKE_PLUGIN";
export const ADD_MAKE_PLUGIN_VALIDATION_FAILED = "ADD_MAKE_PLUGIN_VALIDATION_FAILED";
export const ADD_MAKE_PLUGIN_SUCCESS = "ADD_MAKE_PLUGIN_SUCCESS";
export const ADD_MAKE_PLUGIN_FAILED = "ADD_MAKE_PLUGIN_FAILED";

export const ADD_AUTO_RESPONDER_PLUGIN = "ADD_AUTO_RESPONDER_PLUGIN";
export const ADD_AUTO_RESPONDER_PLUGIN_VALIDATION_FAILED = "ADD_AUTO_RESPONDER_PLUGIN_VALIDATION_FAILED";
export const ADD_AUTO_RESPONDER_PLUGIN_SUCCESS = "ADD_AUTO_RESPONDER_PLUGIN_SUCCESS";
export const ADD_AUTO_RESPONDER_PLUGIN_FAILED = "ADD_AUTO_RESPONDER_PLUGIN_FAILED";

export const DELETE_PLUGIN = "DELETE_WEBHOOK_PLUGIN";
export const DELETE_PLUGIN_SUCCESS = "DELETE_PLUGIN_SUCCESS";
export const DELETE_PLUGIN_FAILED = "DELETE_PLUGIN_FAILED";

export const UPDATE_PLUGIN = "UPDATE_WEBHOOK_PLUGIN";
export const UPDATE_PLUGIN_VALIDATION_FAILED = "UPDATE_PLUGIN_VALIDATION_FAILED";
export const UPDATE_PLUGIN_SUCCESS = "UPDATE_PLUGIN_SUCCESS";
export const UPDATE_PLUGIN_FAILED = "UPDATE_PLUGIN_FAILED";

export const RESET_FORM_PLUGIN_SUCCESS = "RESET_FORM_PLUGIN_SUCCESS";

export const ADD_SLACK_PLUGIN = "ADD_SLACK_PLUGIN";
export const ADD_SLACK_PLUGIN_VALIDATION_FAILED = "ADD_SLACK_PLUGIN_VALIDATION_FAILED";
export const ADD_SLACK_PLUGIN_SUCCESS = "ADD_SLACK_PLUGIN_SUCCESS";
export const ADD_SLACK_PLUGIN_FAILED = "ADD_SLACK_PLUGIN_FAILED";

export const ADD_TELEGRAM_PLUGIN = "ADD_TELEGRAM_PLUGIN";
export const ADD_TELEGRAM_PLUGIN_VALIDATION_FAILED = "ADD_TELEGRAM_PLUGIN_VALIDATION_FAILED";
export const ADD_TELEGRAM_PLUGIN_SUCCESS = "ADD_TELEGRAM_PLUGIN_SUCCESS";
export const ADD_TELEGRAM_PLUGIN_FAILED = "ADD_TELEGRAM_PLUGIN_FAILED";

export const ADD_MAILCHIMP_PLUGIN = "ADD_MAILCHIMP_PLUGIN";
export const ADD_MAILCHIMP_PLUGIN_VALIDATION_FAILED = "ADD_MAILCHIMP_PLUGIN_VALIDATION_FAILED";
export const ADD_MAILCHIMP_PLUGIN_SUCCESS = "ADD_MAILCHIMP_PLUGIN_SUCCESS";
export const ADD_MAILCHIMP_PLUGIN_FAILED = "ADD_MAILCHIMP_PLUGIN_FAILED";

export const ADD_HUBSPOT_PLUGIN = "ADD_HUBSPOT_PLUGIN";
export const ADD_HUBSPOT_PLUGIN_VALIDATION_FAILED = "ADD_HUBSPOT_PLUGIN_VALIDATION_FAILED";
export const ADD_HUBSPOT_PLUGIN_SUCCESS = "ADD_HUBSPOT_PLUGIN_SUCCESS";
export const ADD_HUBSPOT_PLUGIN_FAILED = "ADD_HUBSPOT_PLUGIN_FAILED";

export const ADD_ZENDESK_PLUGIN = "ADD_ZENDESK_PLUGIN";
export const ADD_ZENDESK_PLUGIN_VALIDATION_FAILED = "ADD_ZENDESK_PLUGIN_VALIDATION_FAILED";
export const ADD_ZENDESK_PLUGIN_SUCCESS = "ADD_ZENDESK_PLUGIN_SUCCESS";
export const ADD_ZENDESK_PLUGIN_FAILED = "ADD_ZENDESK_PLUGIN_FAILED";

export function resetFormPluginSuccess() {
  return {
    type: RESET_FORM_PLUGIN_SUCCESS,
  };
}

export function getFormPluginsData(id) {
  return {
    type: GET_FORM_PLUGINS,
    payload: id,
  };
}
export function addWebhookPlugins(data) {
  return {
    type: ADD_WEBHOOK_PLUGIN,
    payload: data,
  };
}
export function addDiscordPlugins(data) {
  return {
    type: ADD_DISCORD_PLUGIN,
    payload: data,
  };
}
export function addZapierPlugins(data) {
  return {
    type: ADD_ZAPIER_PLUGIN,
    payload: data,
  };
}
export function deletePlugins(data) {
  return {
    type: DELETE_PLUGIN,
    payload: data,
  };
}
export function updatePlugin(data) {
  return {
    type: UPDATE_PLUGIN,
    payload: data,
  };
}

export function addAutoResponderPlugin(data) {
  return {
    type: ADD_AUTO_RESPONDER_PLUGIN,
    payload: data,
  };
}
export function addSlackPlugin(data) {
  return {
    type: ADD_SLACK_PLUGIN,
    payload: data,
  };
}
export function addTelegramPlugin(data) {
  return {
    type: ADD_TELEGRAM_PLUGIN,
    payload: data,
  };
}

export function addMakePlugin(data) {
  return {
    type: ADD_MAKE_PLUGIN,
    payload: data,
  };
}

export function addMailchimpPlugin(data) {
  return {
    type: ADD_MAILCHIMP_PLUGIN,
    payload: data,
  };
}

export function addHubspotPlugin(data) {
  return {
    type: ADD_HUBSPOT_PLUGIN,
    payload: data,
  };
}

export function addZendeskPlugins(data) {
  return {
    type: ADD_ZENDESK_PLUGIN,
    payload: data,
  };
}



