import { all, put, takeLatest } from "redux-saga/effects";
import { defaultApi } from "../config/axiosApi";

import { signOut } from "../actions";

import { unAuthorized } from "../utils/constants/apiStatus";

import {
  FORM_CREATE,
  FORM_CREATE_FAILED,
  FORM_CREATE_SUCCESS,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS,
  FORM_PUBLISH,
  FORM_PUBLISH_FAILED,
  FORM_PUBLISH_SUCCESS,
  GET_ALL_FORM,
  GET_ALL_FORM_FAILED,
  GET_ALL_FORM_SUCCESS,
  GET_FORM_CONTENTS,
  GET_FORM_CONTENTS_FAILED,
  GET_FORM_CONTENTS_SUCCESS,
  CLONE_FORM,
  CLONE_FORM_SUCCESS,
  CLONE_FORM_FAILED,
  DELETE_FORM,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILED,
  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILED,
  GET_FORM_CONTENTS_FOR_PUBLISH_MODAL,
  GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_SUCCESS,
  GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_FAILED,
  CREATE_AND_FORM_PUBLISH,
  CREATE_AND_FORM_PUBLISH_SUCCESS,
  CREATE_AND_FORM_PUBLISH_FAILED,
  UPLOAD_FORM_ATTACHMENTS,
  UPLOAD_FORM_ATTACHMENTS_SUCCESS,
  UPLOAD_FORM_ATTACHMENTS_FAILED,
  DELETE_FORM_ATTACHMENTS,
  DELETE_FORM_ATTACHMENTS_SUCCESS,
  DELETE_FORM_ATTACHMENTS_FAILED,
  GET_FORM_SUBMISSIONS,
  GET_FORM_SUBMISSIONS_SUCCESS,
  GET_FORM_SUBMISSIONS_FAILED,
  FORM_SUBMISSION_DATA_EXPORT,
  FORM_SUBMISSION_DATA_EXPORT_SUCCESS,
  FORM_SUBMISSION_DATA_EXPORT_FAILED,
  UPDATE_FORM_CUSTOM_EMAIL_LOGO,
  GET_FORM_ALLOWED_DOMAINS,
  GET_FORM_ALLOWED_DOMAINS_SUCCESS,
  GET_FORM_ALLOWED_DOMAINS_FAILED,
  ADD_FORM_ALLOWED_DOMAINS,
  ADD_FORM_ALLOWED_DOMAINS_SUCCESS,
  ADD_FORM_ALLOWED_DOMAINS_FAILED,
  ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR,
  DELETE_FORM_ALLOWED_DOMAIN,
  DELETE_FORM_ALLOWED_DOMAIN_SUCCESS,
  DELETE_FORM_ALLOWED_DOMAIN_FAILED,
} from "../actions/FormAction";
import { makeUrlSearchParameter } from "../services/globalService";

export function* deleteFormAttempt(payload) {
  const data = payload?.payload;
  const id = data?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: DELETE_FORM_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_FORM_FAILED,
      message: data.message,
    });
  }
}

export function* cloneFormAttempt(payload) {
  const data = payload?.payload;
  const id = data?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/duplicate`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: CLONE_FORM_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: CLONE_FORM_FAILED,
      message: data.message,
    });
  }
}
export function* changeEmbeddedVisibilityAttempt(payload) {
  const data = payload?.payload;
  const id = data?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/changeVisibility`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED,
      message: data.message,
    });
  }
}

export function* getFormContentsAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${payload?.id}/content`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_FORM_CONTENTS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_FORM_CONTENTS_FAILED,
      message: data.message,
    });
  }
}

export function* getAllFormAttempt() {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_ALL_FORM_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_ALL_FORM_FAILED,
      message: data.message,
    });
  }
}

export function* storeFormAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms`;
  const data = payload?.payload;

  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: FORM_CREATE_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: FORM_CREATE_FAILED,
      message: data.message,
    });
  }
}

export function* publishFormAttempt(payload) {
  const data = payload?.payload;
  const id = data?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/publish`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: FORM_PUBLISH_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: FORM_PUBLISH_FAILED,
      message: data.message,
    });
  }
}

export function* createtAndPublishFormAttempt(payload) {
  const data = payload?.payload;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/create-publish`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: CREATE_AND_FORM_PUBLISH_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: CREATE_AND_FORM_PUBLISH_FAILED,
      message: data.message,
    });
  }
}

export function* updateFormAttempt(payload) {
  const data = payload?.payload;
  const id = data?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "PUT", data);

  if (response) {
    yield put({
      type: UPDATE_FORM_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPDATE_FORM_FAILED,
      message: data.message,
    });
  }
}

export function* updateFormCustomLogoAttempt(payload) {
  const data = payload?.payload?.data;
  const id = payload?.payload?.id;

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/email-logo-update`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", data);

  if (response) {
    yield put({
      type: UPDATE_FORM_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPDATE_FORM_FAILED,
      message: data.message,
    });
  }
}

export function* getFormContentsForPublishedModalAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${payload?.id}/content`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_FAILED,
      message: data.message,
    });
  }
}

export function* uploadFormAttachmentsAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${payload?.data?.formId}/attachments/upload`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", payload?.data?.api_payload, false, {
    ContentType: "multipart/form-data",
  });

  if (response) {
    yield put({
      type: UPLOAD_FORM_ATTACHMENTS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: UPLOAD_FORM_ATTACHMENTS_FAILED,
      message: data.message,
    });
  }
}

export function* deleteFormAttachmentsAttempt(payload) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${payload?.data?.formId}/attachments/delete`;
  const finalAttachments = {
    fileFullPath: payload?.data?.fileFullPath,
    fieldName: payload?.data?.fieldName,
  };
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", finalAttachments);

  if (response) {
    yield put({
      type: DELETE_FORM_ATTACHMENTS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_FORM_ATTACHMENTS_FAILED,
      message: data.message,
    });
  }
}
export function* getFormSubmissionsAttempt(payload) {
  const payloadData = payload.payload;
  const filters = payloadData.filters;
  const endpoint = makeUrlSearchParameter(`${process.env.NEXT_PUBLIC_API_URL}/forms/${payloadData?.id}/submissions-list`, filters);

  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_FORM_SUBMISSIONS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_FORM_SUBMISSIONS_FAILED,
      message: data.message,
    });
  }
}

export function* exportFormSubmissionDataRequestAttempt(payload) {
  const formId = payload?.payload?.formId;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/submissions/export`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST");

  if (response) {
    yield put({
      type: FORM_SUBMISSION_DATA_EXPORT_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: FORM_SUBMISSION_DATA_EXPORT_FAILED,
      message: data.message,
    });
  }
}

export function* getCurrentFormAllowedDomainsAttempt(payload) {
  const formId = payload?.id;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/allowed-domains`;
  const { response, error } = yield defaultApi(`${endpoint}`, "GET");

  if (response) {
    yield put({
      type: GET_FORM_ALLOWED_DOMAINS_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: GET_FORM_ALLOWED_DOMAINS_FAILED,
      message: data.message,
    });
  }
}
export function* deleteCurrentFormAllowedDomainAttempt(payload) {
  const formId = payload?.payload?.formId;
  const domain = payload?.payload?.domainId;
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/allowed-domains/${domain}`;
  const { response, error } = yield defaultApi(`${endpoint}`, "DELETE");

  if (response) {
    yield put({
      type: DELETE_FORM_ALLOWED_DOMAIN_SUCCESS,
      message: response && response?.data?.message,
      data: response && response?.data?.data,
    });
  } else if (error) {
    const { data, status } = error;
    if (status === unAuthorized) {
      yield put(signOut());
    }
    yield put({
      type: DELETE_FORM_ALLOWED_DOMAIN_FAILED,
      message: data.message,
    });
  }
}
export function* addCurrentFormAllowedDomainAttempt(payload) {
  const formId = payload?.payload?.formId;
  const newPayload = {
    domain: payload?.payload?.domain,
  };
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/allowed-domains`;
  const { response, error } = yield defaultApi(`${endpoint}`, "POST", newPayload);

  if (response) {
    yield put({
      type: ADD_FORM_ALLOWED_DOMAINS_SUCCESS,
      data: response && response.data?.data,
    });
  } else if (error) {
    const { data } = error;
    if (data.status === "validation_error") {
      yield put({
        type: ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR,
        message: data.message,
        errors: data.errors,
      });
    } else {
      yield put({
        type: ADD_FORM_ALLOWED_DOMAINS_FAILED,
        message: data.message,
      });
    }
  }
}

export function* deleteForm() {
  yield takeLatest(DELETE_FORM, deleteFormAttempt);
}
export function* cloneForm() {
  yield takeLatest(CLONE_FORM, cloneFormAttempt);
}
export function* changeEmbeddedVisibility() {
  yield takeLatest(FORM_EMBEDDED_CODE_VISIBILITY_CHANGE, changeEmbeddedVisibilityAttempt);
}
export function* getFormContents() {
  yield takeLatest(GET_FORM_CONTENTS, getFormContentsAttempt);
}

export function* getAllForm() {
  yield takeLatest(GET_ALL_FORM, getAllFormAttempt);
}

export function* storeForm() {
  yield takeLatest(FORM_CREATE, storeFormAttempt);
}

export function* publishForm() {
  yield takeLatest(FORM_PUBLISH, publishFormAttempt);
}
export function* createtAndPublishForm() {
  yield takeLatest(CREATE_AND_FORM_PUBLISH, createtAndPublishFormAttempt);
}

export function* updateForm() {
  yield takeLatest(UPDATE_FORM, updateFormAttempt);
}

export function* updateFormCustomLogo() {
  yield takeLatest(UPDATE_FORM_CUSTOM_EMAIL_LOGO, updateFormCustomLogoAttempt);
}

export function* uploadFormAttachments() {
  yield takeLatest(UPLOAD_FORM_ATTACHMENTS, uploadFormAttachmentsAttempt);
}
export function* deleteFormAttachments() {
  yield takeLatest(DELETE_FORM_ATTACHMENTS, deleteFormAttachmentsAttempt);
}

export function* getFormSubmissions() {
  yield takeLatest(GET_FORM_SUBMISSIONS, getFormSubmissionsAttempt);
}

export function* getFormContentsForPublishedModal() {
  yield takeLatest(GET_FORM_CONTENTS_FOR_PUBLISH_MODAL, getFormContentsForPublishedModalAttempt);
}
export function* exportFormSubmissionDataRequest() {
  yield takeLatest(FORM_SUBMISSION_DATA_EXPORT, exportFormSubmissionDataRequestAttempt);
}

export function* getCurrentFormAllowedDomains() {
  yield takeLatest(GET_FORM_ALLOWED_DOMAINS, getCurrentFormAllowedDomainsAttempt);
}

export function* addCurrentFormAllowedDomain() {
  yield takeLatest(ADD_FORM_ALLOWED_DOMAINS, addCurrentFormAllowedDomainAttempt);
}

export function* deleteCurrentFormAllowedDomain() {
  yield takeLatest(DELETE_FORM_ALLOWED_DOMAIN, deleteCurrentFormAllowedDomainAttempt);
}

export default function* rootSaga() {
  yield all([
    storeForm(),
    publishForm(),
    getAllForm(),
    getFormContents(),
    changeEmbeddedVisibility(),
    cloneForm(),
    deleteForm(),
    updateForm(),
    getFormContentsForPublishedModal(),
    createtAndPublishForm(),
    uploadFormAttachments(),
    deleteFormAttachments(),
    getFormSubmissions(),
    exportFormSubmissionDataRequest(),
    updateFormCustomLogo(),
    getCurrentFormAllowedDomains(),
    addCurrentFormAllowedDomain(),
    deleteCurrentFormAllowedDomain(),
  ]);
}
