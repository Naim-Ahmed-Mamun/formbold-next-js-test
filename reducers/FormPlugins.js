import { toast } from "react-toastify";
import {
  GET_FORM_PLUGINS,
  GET_FORM_PLUGINS_FAILED,
  GET_FORM_PLUGINS_SUCCESS,
  ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED,
  RESET_FORM_PLUGIN_SUCCESS,
  ADD_WEBHOOK_PLUGIN_SUCCESS,
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

const initialState = {
  pageLoading: false,
  loading: false,
  plugins: [],
  telegramBotName: undefined,
  googleSheetUrl: undefined,
  requestSucess: false,
  validationError: [],
  addPlugin: {
    loading: true,
    name: undefined,
    redirectData: undefined,
    isRequestSuccess: true,
  },
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_FORM_PLUGIN_SUCCESS:
      return {
        ...state,
        requestSucess: false,
      };
    case GET_FORM_PLUGINS:
      return {
        ...state,
        loading: true,
      };
    case GET_FORM_PLUGINS_SUCCESS:
      return {
        ...state,
        loading: false,
        plugins: action?.data?.plugins,
        telegramBotName: action?.data?.telegramBotName,
        googleSheetUrl: action?.data?.googleSheetUrl,
      };
    case ADD_WEBHOOK_PLUGIN_VALIDATION_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        validationError: action.errors,
      };
    case UPDATE_PLUGIN_VALIDATION_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        validationError: action.errors,
      };
    case ADD_WEBHOOK_PLUGIN_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: true,
        plugins: action?.data?.plugins,
      };
    case GET_FORM_PLUGINS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    case DELETE_PLUGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PLUGIN_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: true,
        plugins: action?.data?.plugins,
      };
    case DELETE_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PLUGIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PLUGIN_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: true,
        plugins: action?.data?.plugins,
      };

    case UPDATE_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PLUGIN_VALIDATION_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        validationError: action.errors,
      };
    case ADD_AUTO_RESPONDER_PLUGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_AUTO_RESPONDER_PLUGIN_VALIDATION_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        validationError: action.errors,
      };
    case ADD_AUTO_RESPONDER_PLUGIN_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: true,
        plugins: action?.data?.plugins,
      };
    case ADD_AUTO_RESPONDER_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    case ADD_SLACK_PLUGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_SLACK_PLUGIN_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        addPlugin: {
          loading: false,
          name: action?.data?.name,
          redirectData: action?.data?.redirect_data,
          isRequestSuccess: true,
        },
      };
    case ADD_TELEGRAM_PLUGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_TELEGRAM_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_TELEGRAM_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    // Discord
    case ADD_DISCORD_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_DISCORD_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_DISCORD_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    // ZAPIER
    case ADD_ZAPIER_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_ZAPIER_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_ZAPIER_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    // Make
    case ADD_MAKE_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_MAKE_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_MAKE_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };

      // Mailchimp
    case ADD_MAILCHIMP_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_MAILCHIMP_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_MAILCHIMP_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };

      // Hubspot
    case ADD_HUBSPOT_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_HUBSPOT_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_HUBSPOT_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };

      // Zendesk
    case ADD_ZENDESK_PLUGIN:
      return {
        ...state,
        loading: true,
      }
    case ADD_ZENDESK_PLUGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        requestSucess: true,
      };
    case ADD_ZENDESK_PLUGIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
