export const FORM_CREATE = "FORM_CREATE";
export const FORM_CREATE_SUCCESS = "FORM_CREATE_SUCCESS";
export const FORM_CREATE_FAILED = "FORM_CREATE_FAILED";

export const GET_ALL_FORM = "GET_ALL_FORM";
export const GET_ALL_FORM_SUCCESS = "GET_ALL_FORM_SUCCESS";
export const GET_ALL_FORM_FAILED = "GET_ALL_FORM_FAILED";

export const FORM_REQUEST_SUCCESS_RESET = "FORM_REQUEST_SUCCESS_RESET";

export const FORM_PUBLISH = "FORM_PUBLISH";
export const FORM_PUBLISH_SUCCESS = "FORM_PUBLISH_SUCCESS";
export const FORM_PUBLISH_FAILED = "FORM_PUBLISH_FAILED";

export const CREATE_AND_FORM_PUBLISH = "CREATE_AND_FORM_PUBLISH";
export const CREATE_AND_FORM_PUBLISH_SUCCESS = "CREATE_AND_FORM_PUBLISH_SUCCESS";
export const CREATE_AND_FORM_PUBLISH_FAILED = "CREATE_AND_FORM_PUBLISH_FAILED";

export const SET_CURRENT_FORM = "SET_CURRENT_FORM";
export const RESET_CURRENT_FORM = "RESET_CURRENT_FORM";

export const CREATE_OR_UPDATE_SUCCESS_RESET = "CREATE_OR_UPDATE_SUCCESS_RESET";

export const GET_FORM_CONTENTS = "GET_FORM_CONTENTS";
export const GET_FORM_CONTENTS_SUCCESS = "GET_FORM_CONTENTS_SUCCESS";
export const GET_FORM_CONTENTS_FAILED = "GET_FORM_CONTENTS_FAILED";

export const UPDATE_FORM_CONTENTS = "UPDATE_FORM_CONTENTS";

export const FORM_EMBEDDED_CODE_VISIBILITY_CHANGE = "FORM_EMBEDDED_CODE_VISIBILITY_CHANGE";
export const FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS = "FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS";
export const FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED = "FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED";

export const CLONE_FORM = "CLONE_FORM";
export const CLONE_FORM_SUCCESS = "CLONE_FORM_SUCCESS";
export const CLONE_FORM_FAILED = "CLONE_FORM_FAILED";

export const DELETE_FORM = "DELETE_FORM";
export const DELETE_FORM_SUCCESS = "DELETE_FORM_SUCCESS";
export const DELETE_FORM_FAILED = "DELETE_FORM_FAILED";

export const UPDATE_FORM = "UPDATE_FORM";
export const UPDATE_FORM_SUCCESS = "UPDATE_FORM_SUCCESS";
export const UPDATE_FORM_FAILED = "UPDATE_FORM_FAILED";

export const GET_FORM_CONTENTS_FOR_PUBLISH_MODAL = "GET_FORM_CONTENTS_FOR_PUBLISH_MODAL";
export const GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_SUCCESS = "GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_SUCCESS";
export const GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_FAILED = "GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_FAILED";

export const GET_TEMP_FORM = "GET_TEMP_FORM";
export const GET_TEMP_FORM_SUCCESS = "GET_TEMP_FORM_SUCCESS";
export const GET_TEMP_FORM_FAILED = "GET_TEMP_FORM_FAILED";

export const UPDATE_TEMP_FORM = "UPDATE_TEMP_FORM";
export const UPDATE_TEMP_FORM_SUCCESS = "UPDATE_TEMP_FORM_SUCCESS";
export const UPDATE_TEMP_FORM_FAILED = "UPDATE_TEMP_FORM_FAILED";

export const FORM_SUBMISSION_DATA_EXPORT = "FORM_SUBMISSION_DATA_EXPORT";
export const FORM_SUBMISSION_DATA_EXPORT_SUCCESS = "FORM_SUBMISSION_DATA_EXPORT_SUCCESS";
export const FORM_SUBMISSION_DATA_EXPORT_FAILED = "FORM_SUBMISSION_DATA_EXPORT_FAILED";

export const RESET_FORM_SUBMISSION_DATA_EXPORT = "RESET_FORM_SUBMISSION_DATA_EXPORT";

export const RESET_EDIT_FORM = "RESET_EDIT_FORM";

//builder
export const UPDATE_SPECIFIC_FORM_CONTENTS = "UPDATE_SPECIFIC_FORM_CONTENTS";
export const UPDATE_SPECIFIC_FORM_CONTENTS_SUCCESS = "UPDATE_SPECIFIC_FORM_CONTENTS_SUCCESS";
export const UPDATE_SPECIFIC_FORM_CONTENTS_FAILED = "UPDATE_SPECIFIC_FORM_CONTENTS_FAILED";

export const UPLOAD_FORM_ATTACHMENTS = "UPLOAD_FORM_ATTACHMENTS";
export const UPLOAD_FORM_ATTACHMENTS_SUCCESS = "UPLOAD_FORM_ATTACHMENTS_SUCCESS";
export const UPLOAD_FORM_ATTACHMENTS_FAILED = "UPLOAD_FORM_ATTACHMENTS_FAILED";

export const DELETE_FORM_ATTACHMENTS = "DELETE_FORM_ATTACHMENTS";
export const DELETE_FORM_ATTACHMENTS_SUCCESS = "DELETE_FORM_ATTACHMENTS_SUCCESS";
export const DELETE_FORM_ATTACHMENTS_FAILED = "DELETE_FORM_ATTACHMENTS_FAILED";

export const GET_FORM_SUBMISSIONS = "GET_FORM_SUBMISSIONS";
export const GET_FORM_SUBMISSIONS_SUCCESS = "GET_FORM_SUBMISSIONS_SUCCESS";
export const GET_FORM_SUBMISSIONS_FAILED = "GET_FORM_SUBMISSIONS_FAILED";

export const START_FORM_PAGE_LOADING = "START_FORM_PAGE_LOADING";
export const STOP_FORM_PAGE_LOADING = "STOP_FORM_PAGE_LOADING";

export const UPDATE_FORM_CUSTOM_EMAIL_LOGO = "UPDATE_FORM_CUSTOM_EMAIL_LOGO";
export const UPDATE_FORM_CUSTOM_EMAIL_LOGO_SUCCESS = "UPDATE_FORM_CUSTOM_EMAIL_LOGO_SUCCESS";
export const UPDATE_FORM_CUSTOM_EMAIL_LOGO_FAILED = "UPDATE_FORM_CUSTOM_EMAIL_LOGO_FAILED";

//allowed domain
export const GET_FORM_ALLOWED_DOMAINS = "GET_FORM_ALLOWED_DOMAINS";
export const GET_FORM_ALLOWED_DOMAINS_SUCCESS = "GET_FORM_ALLOWED_DOMAINS_SUCCESS";
export const GET_FORM_ALLOWED_DOMAINS_FAILED = "GET_FORM_ALLOWED_DOMAINS_FAILED";

export const ADD_FORM_ALLOWED_DOMAINS = "ADD_FORM_ALLOWED_DOMAINS";
export const ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR = "ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR";
export const ADD_FORM_ALLOWED_DOMAINS_SUCCESS = "ADD_FORM_ALLOWED_DOMAINS_SUCCESS";
export const ADD_FORM_ALLOWED_DOMAINS_FAILED = "ADD_FORM_ALLOWED_DOMAINS_FAILED";

export const RESET_FORM_ALLOWED_DOMAINS_REQUEST_SUCCESS = "RESET_FORM_ALLOWED_DOMAINS_REQUEST_SUCCESS";

export const DELETE_FORM_ALLOWED_DOMAIN = "DELETE_FORM_ALLOWED_DOMAIN";
export const DELETE_FORM_ALLOWED_DOMAIN_SUCCESS = "DELETE_FORM_ALLOWED_DOMAIN_SUCCESS";
export const DELETE_FORM_ALLOWED_DOMAIN_FAILED = "DELETE_FORM_ALLOWED_DOMAIN_FAILED";

export function deleteFormAllowedDomain(data) {
  return {
    type: DELETE_FORM_ALLOWED_DOMAIN,
    payload: data,
  };
}

export function resetAllowedDomainRequestSuccess() {
  return {
    type: RESET_FORM_ALLOWED_DOMAINS_REQUEST_SUCCESS,
  };
}

export function getFormAllowedDomains(formId) {
  return {
    type: GET_FORM_ALLOWED_DOMAINS,
    id: formId,
  };
}

export function addFormAllowedDomain(data) {
  return {
    type: ADD_FORM_ALLOWED_DOMAINS,
    payload: data,
  };
}

export function startFormPageLoading() {
  return {
    type: START_FORM_PAGE_LOADING,
  };
}
export function stopFormPageLoading() {
  return {
    type: STOP_FORM_PAGE_LOADING,
  };
}

export function deleteForm(payload) {
  return {
    type: DELETE_FORM,
    payload: payload,
  };
}
export function cloneForm(payload) {
  return {
    type: CLONE_FORM,
    payload: payload,
  };
}

export function changeEmbeddedContentVisibility(payload) {
  return {
    type: FORM_EMBEDDED_CODE_VISIBILITY_CHANGE,
    payload: payload,
  };
}

export function getFormContent(formId) {
  return {
    type: GET_FORM_CONTENTS,
    id: formId,
  };
}
export function setCurrentForm(formData) {
  return {
    type: SET_CURRENT_FORM,
    form: formData,
  };
}
export function resetCurrentForm() {
  return {
    type: RESET_CURRENT_FORM,
  };
}
export function getAllForms() {
  return {
    type: GET_ALL_FORM,
  };
}
export function createForm(data) {
  return {
    type: FORM_CREATE,
    payload: data,
  };
}
export function resetReuestSuccess() {
  return {
    type: FORM_REQUEST_SUCCESS_RESET,
  };
}
export function resetCreateOrUpdateReuestSuccess() {
  return {
    type: CREATE_OR_UPDATE_SUCCESS_RESET,
  };
}
export function publishForm(data) {
  return {
    type: FORM_PUBLISH,
    payload: data,
  };
}

export function createAndPublishForm(data) {
  return {
    type: CREATE_AND_FORM_PUBLISH,
    payload: data,
  };
}

export function updateForm(data) {
  return {
    type: UPDATE_FORM,
    payload: data,
  };
}

export function updateFormEmailLogo(formId, data) {
  return {
    type: UPDATE_FORM_CUSTOM_EMAIL_LOGO,
    payload: {
      id: formId,
      data: data,
    },
  };
}

export function getFormContentForPublishModal(formId) {
  return {
    type: GET_FORM_CONTENTS_FOR_PUBLISH_MODAL,
    id: formId,
  };
}

export function getPreviousTempForm() {
  return {
    type: GET_TEMP_FORM,
  };
}
export function updateTempForm(formData) {
  return {
    type: UPDATE_TEMP_FORM,
    data: formData,
  };
}

export function updateTempCurrentFormContent(formData) {
  return {
    type: UPDATE_FORM_CONTENTS,
    data: formData,
  };
}

export function uploadFormAttachments(payloadData) {
  const { id, payload } = payloadData;
  return {
    type: UPLOAD_FORM_ATTACHMENTS,
    data: {
      formId: id,
      api_payload: payload,
    },
  };
}
export function deleteFormAttachments(payload) {
  const { id, fieldName, attachmentLink } = payload;
  return {
    type: DELETE_FORM_ATTACHMENTS,
    data: {
      formId: id,
      fileFullPath: attachmentLink,
      fieldName: fieldName,
    },
  };
}
export function resetEditFormElement() {
  return {
    type: RESET_EDIT_FORM,
  };
}

export function getFormSubmissions(payload) {
  return {
    type: GET_FORM_SUBMISSIONS,
    payload: payload,
  };
}

export function formSubmissionsDataExport(payload) {
  return {
    type: FORM_SUBMISSION_DATA_EXPORT,
    payload: payload,
  };
}

export function resetFormSubmissionsDataExport() {
  return {
    type: RESET_FORM_SUBMISSION_DATA_EXPORT,
  };
}

//
export function updateSpecificFormContents({ formId, contents }) {
  return {
    type: UPDATE_SPECIFIC_FORM_CONTENTS,
    data: {
      formId: formId,
      contents: contents,
    },
  };
}
