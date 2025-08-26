import { toast } from "react-toastify";
import {
  FORM_CREATE,
  FORM_CREATE_FAILED,
  FORM_CREATE_SUCCESS,
  FORM_PUBLISH,
  FORM_PUBLISH_FAILED,
  FORM_PUBLISH_SUCCESS,
  FORM_REQUEST_SUCCESS_RESET,
  GET_ALL_FORM,
  GET_ALL_FORM_FAILED,
  GET_ALL_FORM_SUCCESS,
  SET_CURRENT_FORM,
  RESET_CURRENT_FORM,
  GET_FORM_CONTENTS,
  GET_FORM_CONTENTS_SUCCESS,
  GET_FORM_CONTENTS_FAILED,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED,
  FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS,
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
  GET_TEMP_FORM,
  GET_TEMP_FORM_SUCCESS,
  UPDATE_TEMP_FORM,
  CREATE_AND_FORM_PUBLISH,
  CREATE_AND_FORM_PUBLISH_FAILED,
  CREATE_AND_FORM_PUBLISH_SUCCESS,
  UPLOAD_FORM_ATTACHMENTS,
  UPLOAD_FORM_ATTACHMENTS_SUCCESS,
  UPLOAD_FORM_ATTACHMENTS_FAILED,
  DELETE_FORM_ATTACHMENTS,
  DELETE_FORM_ATTACHMENTS_SUCCESS,
  DELETE_FORM_ATTACHMENTS_FAILED,
  RESET_EDIT_FORM,
  GET_FORM_SUBMISSIONS,
  GET_FORM_SUBMISSIONS_SUCCESS,
  GET_FORM_SUBMISSIONS_FAILED,
  CREATE_OR_UPDATE_SUCCESS_RESET,
  UPDATE_FORM_CONTENTS,
  FORM_SUBMISSION_DATA_EXPORT,
  FORM_SUBMISSION_DATA_EXPORT_SUCCESS,
  FORM_SUBMISSION_DATA_EXPORT_FAILED,
  RESET_FORM_SUBMISSION_DATA_EXPORT,
  STOP_FORM_PAGE_LOADING,
  //
  UPDATE_SPECIFIC_FORM_CONTENTS,
  GET_FORM_ALLOWED_DOMAINS,
  GET_FORM_ALLOWED_DOMAINS_SUCCESS,
  GET_FORM_ALLOWED_DOMAINS_FAILED,
  ADD_FORM_ALLOWED_DOMAINS,
  ADD_FORM_ALLOWED_DOMAINS_SUCCESS,
  ADD_FORM_ALLOWED_DOMAINS_FAILED,
  ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR,
  RESET_FORM_ALLOWED_DOMAINS_REQUEST_SUCCESS,
  DELETE_FORM_ALLOWED_DOMAIN,
  DELETE_FORM_ALLOWED_DOMAIN_SUCCESS,
  DELETE_FORM_ALLOWED_DOMAIN_FAILED,
} from "../actions/FormAction";
import { getFormId } from "../services/forms";
import { FORCE_SIGNED_OUT } from "../actions";

const initialState = {
  pageLoading: false,
  loading: false,
  forms: [],
  formContents: [],
  requestSucess: false,
  currentForm: undefined,
  currentFormContents: [],
  currentFormEmbedded: undefined,
  tempForm: undefined,
  editForm: {
    loading: false,
    requestSucess: false,
    element: undefined,
    updatedData: undefined,
  },
  createOrUpdateForm: {
    loading: false,
    requestSucess: false,
    pageLoading: false,
    data: undefined,
    isPublished: false,
  },
  submissions: {
    loading: false,
    requestSucess: false,
    pageLoading: true,
    data: undefined,
  },
  submissionsExport: {
    loading: false,
    requestSucess: false,
    pageLoading: false,
    data: undefined,
  },
  allowedDomains: {
    loading: false,
    requestSuccess: false,
    pageLoading: false,
    data: [],
    validationError: [],
  },
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SPECIFIC_FORM_CONTENTS:
      const idExists = state.formContents.some((item) => item.formId === action.data?.formId);
      let updatedContentsData = state.formContents;
      if (idExists) {
        updatedContentsData = state.formContents.map((item) => {
          if (item.formId == action.data?.formId) {
            return { formId: action.data?.formId, formContents: [...action.data?.contents] };
          }
          return item;
        });
      } else {
        updatedContentsData = [...state.formContents, { formId: action.data?.formId, formContents: [...action.data?.contents] }];
      }
      return {
        ...state,
        formContents: updatedContentsData,
      };
    case RESET_FORM_SUBMISSION_DATA_EXPORT:
      return {
        ...state,
        submissionsExport: {
          ...state.submissionsExport,
          loading: false,
          requestSucess: false,
          pageLoading: false,
          data: undefined,
        },
      };
    case FORM_SUBMISSION_DATA_EXPORT:
      return {
        ...state,
        submissionsExport: {
          ...state.submissionsExport,
          loading: true,
          pageLoading: true,
        },
      };
    case FORM_SUBMISSION_DATA_EXPORT_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        submissionsExport: {
          ...state.submissionsExport,
          loading: false,
          pageLoading: false,
          requestSucess: true,
        },
      };
    case FORM_SUBMISSION_DATA_EXPORT_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        submissionsExport: {
          ...state.submissionsExport,
          loading: false,
          pageLoading: false,
          requestSucess: false,
        },
      };
    case CREATE_OR_UPDATE_SUCCESS_RESET:
      return {
        ...state,
        pageLoading: false,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: false,
          isPublished: false,
        },
      };
    case GET_FORM_CONTENTS:
      return {
        ...state,
        loading: false,
        requestSucess: false,
        pageLoading: true,
      };
    case GET_ALL_FORM:
      return {
        ...state,
        loading: true,
        requestSucess: false,
        currentForm: undefined,
        pageLoading: true,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case FORM_CREATE:
      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: true,
          pageLoading: true,
        },
        currentForm: undefined,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case FORM_PUBLISH:
      return {
        ...state,
        loading: true,
        pageLoading: true,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: true,
          pageLoading: true,
        },
      };
    case FORM_CREATE_SUCCESS:
      action?.message && toast.success(action?.message);
      let allForms = [action?.data?.form, ...state.forms];
      let mapFormAndContents = [...state.formContents, { formId: getFormId(action?.data?.form), formContents: [] }];

      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: true,
        },
        forms: allForms,
        currentForm: action?.data?.form,
        currentFormContents: [],
        currentFormEmbedded: undefined,
        tempForm: undefined,
        formContents: mapFormAndContents,
      };
    case FORM_CREATE_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: false,
        },
        currentForm: undefined,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case FORM_REQUEST_SUCCESS_RESET:
      return {
        ...state,
        loading: false,
        requestSucess: false,
      };
    case FORM_PUBLISH_SUCCESS:
      action?.message && toast.success(action?.message);
      let forms = state.forms.map((item) => {
        if (item.id === action?.data?.form?.id) {
          return { ...action?.data?.form };
        }
        return item;
      });
      let newFormContents = [...action?.data?.contents];
      let newFormEmbeddedCode = action?.data?.form_embedded_content ? action?.data?.form_embedded_content : undefined;

      const idExistsAfterPublish = state.formContents.some((item) => item.formId === action?.data?.form?.id);
      let newContentsDataAfterPublish = state.formContents;
      if (idExistsAfterPublish) {
        newContentsDataAfterPublish = state.formContents.map((item) => {
          if (item.formId == action?.data?.form?.id) {
            return { formId: action?.data?.form?.id, formContents: [...action?.data?.contents] };
          }
          return item;
        });
      } else {
        newContentsDataAfterPublish = [...state.formContents, { formId: action?.data?.form?.id, formContents: [...action?.data?.contents] }];
      }

      return {
        ...state,
        loading: false,
        // pageLoading: false,
        requestSucess: true,
        forms: forms,
        currentForm: action?.data?.form,
        currentFormContents: newFormContents,
        formContents: newContentsDataAfterPublish,
        currentFormEmbedded: newFormEmbeddedCode,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: true,
          isPublished: true,
        },
        tempForm: undefined,
      };
    case FORM_PUBLISH_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: false,
        pageLoading: false,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          requestSucess: false,
          pageLoading: false,
          isPublished: false,
        },
      };
    case GET_ALL_FORM_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: false,
        currentForm: undefined,
        pageLoading: false,
      };
    case GET_ALL_FORM_SUCCESS:
      action?.message && toast.success(action?.message);
      let updatedForms = [...action?.data?.forms];
      return {
        ...state,
        loading: false,
        requestSucess: false,
        forms: updatedForms,
        currentForm: undefined,
        pageLoading: false,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case SET_CURRENT_FORM:
      return {
        ...state,
        loading: false,
        requestSucess: false,
        currentForm: { ...action?.form },
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case RESET_CURRENT_FORM:
      return {
        ...state,
        loading: false,
        requestSucess: false,
        currentForm: undefined,
        currentFormContents: [],
        currentFormEmbedded: undefined,
        createOrUpdateForm: {
          loading: false,
          requestSucess: false,
          pageLoading: false,
          data: undefined,
          isPublished: false,
        },
      };
    case GET_FORM_CONTENTS_SUCCESS:
      action?.message && toast.error(action?.message);
      const idExistsAllready = state.formContents.some((item) => item.formId === state.currentForm?.id);
      let oldContentsData = state.formContents;
      if (idExistsAllready) {
        oldContentsData = state.formContents.map((item) => {
          if (item.formId == state.currentForm?.id) {
            return { formId: state.currentForm?.id, formContents: [...action?.data?.contents] };
          }
          return item;
        });
      } else {
        oldContentsData = [...state.formContents, { formId: state.currentForm?.id, formContents: [...action?.data?.contents] }];
      }
      return {
        ...state,
        loading: false,
        pageLoading: false,
        currentFormContents: [...action?.data?.contents],
        formContents: oldContentsData,
        currentFormEmbedded: action?.data?.form_embedded_content ? action?.data?.form_embedded_content : undefined,
      };
    case GET_FORM_CONTENTS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case FORM_EMBEDDED_CODE_VISIBILITY_CHANGE:
      return {
        ...state,
        loading: true,
      };
    case FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_SUCCESS:
      action?.message && toast.success(action?.message);
      let updatedForm = action?.data?.form;
      let updatedAllForms = state.forms.map((item) => {
        if (item.id === action?.data?.form?.id) {
          return { ...action?.data?.form };
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        currentForm: updatedForm,
        forms: updatedAllForms,
      };
    case FORM_EMBEDDED_CODE_VISIBILITY_CHANGE_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
      };
    case CLONE_FORM:
      return {
        ...state,
        loading: false,
        requestSucess: false,
        pageLoading: true,
      };
    case CLONE_FORM_SUCCESS:
      action?.message && toast.success(action?.message);
      let clonedForm = action?.data?.form;
      return {
        ...state,
        loading: false,
        pageLoading: false,
        forms: [clonedForm, ...state?.forms],
      };
    case CLONE_FORM_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case DELETE_FORM_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        pageLoading: false,
        requestSucess: false,
      };
    case DELETE_FORM:
      return {
        ...state,
        loading: true,
        requestSucess: false,
        pageLoading: true,
      };
    case DELETE_FORM_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        loading: false,
        requestSucess: true,
        pageLoading: false,
      };
    case UPDATE_FORM:
      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: true,
        },
      };
    case UPDATE_FORM_SUCCESS:
      action?.message && toast.success(action?.message);
      let updated_forms = state.forms.map((item) => {
        if (item.id === action?.data?.form?.id) {
          return { ...action?.data?.form };
        }
        return item;
      });
      let updatedFormContents = action?.data?.contents ? [...action?.data?.contents] : state.currentFormContents;
      let updatedFormEmbeddedCode = action?.data?.form_embedded_content ? action?.data?.form_embedded_content : undefined;

      //
      let oldContentsAfterUpdate = state.formContents;
      if (action?.data?.contents) {
        const idExistsAfterUpdate = state.formContents.some((item) => item.formId === action?.data?.form?.id);

        if (idExistsAfterUpdate) {
          oldContentsAfterUpdate = state.formContents.map((item) => {
            if (item.formId == action?.data?.form?.id) {
              return { formId: action?.data?.form?.id, formContents: [...action?.data?.contents] };
            }
            return item;
          });
        } else {
          oldContentsAfterUpdate = [...state.formContents, { formId: action?.data?.form?.id, formContents: [...action?.data?.contents] }];
        }
      }

      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: true,
        },
        forms: updated_forms,
        currentForm: action?.data?.form,
        currentFormContents: updatedFormContents,
        formContents: oldContentsAfterUpdate,
        currentFormEmbedded: updatedFormEmbeddedCode,
      };
    case UPDATE_FORM_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          requestSucess: false,
          pageLoading: false,
        },
      };
    case GET_FORM_CONTENTS_FOR_PUBLISH_MODAL:
      return {
        ...state,
        loading: true,
        requestSucess: false,
      };
    case GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_SUCCESS:
      return {
        ...state,
        loading: false,
        pageLoading: false,
        currentFormContents: [...action?.data?.contents],
        currentFormEmbedded: action?.data?.form_embedded_content ? action?.data?.form_embedded_content : undefined,
      };
    case GET_FORM_CONTENTS_FOR_PUBLISH_MODAL_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        loading: false,
        currentFormContents: [],
        currentFormEmbedded: undefined,
      };
    case GET_TEMP_FORM:
      return {
        ...state,
        loading: true,
        pageLoading: true,
      };
    case GET_TEMP_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        pageLoading: false,
      };
    case UPDATE_TEMP_FORM:
      return {
        ...state,
        tempForm: action.data,
      };
    case UPDATE_FORM_CONTENTS:
      return {
        ...state,
        currentFormContents: action.data,
      };
    case CREATE_AND_FORM_PUBLISH_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        pageLoading: false,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          requestSucess: false,
          pageLoading: false,
          isPublished: false,
        },
      };
    case CREATE_AND_FORM_PUBLISH:
      // action?.message && toast.success(action?.message);
      return {
        ...state,
        pageLoading: true,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: true,
          pageLoading: true,
        },
      };
    case CREATE_AND_FORM_PUBLISH_SUCCESS:
      action?.message && toast.success(action?.message);
      let finalForms = [action?.data?.form, ...state.forms];
      let finalFormContents = action?.data?.contents ? [...action?.data?.contents] : state.currentFormContents;
      let finalFormEmbeddedCode = action?.data?.form_embedded_content ? action?.data?.form_embedded_content : undefined;
      let newContentsData = [...state.formContents, { formId: action?.data?.form?.id, formContents: [...action?.data?.contents] }];

      return {
        ...state,
        createOrUpdateForm: {
          ...state.createOrUpdateForm,
          loading: false,
          pageLoading: false,
          requestSucess: true,
          isPublished: true,
        },
        forms: finalForms,
        currentForm: action?.data?.form,
        currentFormContents: finalFormContents,
        formContents: newContentsData,
        currentFormEmbedded: finalFormEmbeddedCode,
        tempForm: undefined,
      };
    case UPLOAD_FORM_ATTACHMENTS:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
        },
      };
    case UPLOAD_FORM_ATTACHMENTS_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          updatedData: action?.data,
          requestSucess: true,
        },
      };
    case UPLOAD_FORM_ATTACHMENTS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          updatedData: undefined,
        },
      };

    case RESET_EDIT_FORM:
      return {
        ...state,
        editForm: {
          loading: false,
          requestSucess: false,
          element: undefined,
          updatedData: undefined,
        },
      };
    case DELETE_FORM_ATTACHMENTS:
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: true,
        },
      };
    case DELETE_FORM_ATTACHMENTS_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          updatedData: undefined,
          requestSucess: true,
        },
      };
    case DELETE_FORM_ATTACHMENTS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        editForm: {
          ...state.editForm,
          loading: false,
          updatedData: undefined,
        },
      };
    case GET_FORM_SUBMISSIONS:
      return {
        ...state,
        submissions: {
          loading: true,
          requestSucess: false,
          pageLoading: true,
        },
      };
    case GET_FORM_SUBMISSIONS_SUCCESS:
      action?.message && toast.success(action?.message);
      return {
        ...state,
        submissions: {
          ...state.submissions,
          loading: false,
          pageLoading: false,
          data: action.data,
        },
      };
    case GET_FORM_SUBMISSIONS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        submissions: {
          ...state.submissions,
          loading: false,
          pageLoading: false,
        },
      };
    case STOP_FORM_PAGE_LOADING:
      return {
        ...state,
        pageLoading: false,
      };
    case GET_FORM_ALLOWED_DOMAINS:
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: true,
          validationError: [],
        },
      };
    case GET_FORM_ALLOWED_DOMAINS_SUCCESS:
      let newAllowedDomains = state.allowedDomains?.data;
      const formIdExists = newAllowedDomains.some((item) => item.formId === state.currentForm.id);
      if (formIdExists) {
        newAllowedDomains = newAllowedDomains.map((form) => {
          if (form.formId === state.currentForm.id) {
            return {
              formId: state.currentForm.id,
              domains: [...action?.data?.allowedDomains],
            };
          }
          return form;
        });
      } else {
        newAllowedDomains = [
          ...newAllowedDomains,
          {
            formId: state.currentForm.id,
            domains: [...action?.data?.allowedDomains],
          },
        ];
      }
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: false,
          data: newAllowedDomains,
        },
      };
    case GET_FORM_ALLOWED_DOMAINS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: false,
          requestSuccess: false,
        },
      };
    case ADD_FORM_ALLOWED_DOMAINS_VALIDATION_ERROR:
      action?.message && toast.warning(action?.message);
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: false,
          validationError: action.errors,
          requestSuccess: false,
        },
      };
    case ADD_FORM_ALLOWED_DOMAINS:
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: true,
        },
      };
    case ADD_FORM_ALLOWED_DOMAINS_SUCCESS:
      let oldAllowedDomains = [...state.allowedDomains?.data];
      oldAllowedDomains = oldAllowedDomains.map((item) => {
        if (item.formId === state.currentForm?.id) {
          return {
            formId: state.currentForm.id,
            domains: [...item.domains, action?.data?.domain],
          };
        }
        return item;
      });
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: false,
          validationError: [],
          data: oldAllowedDomains,
          requestSuccess: true,
        },
      };
    case ADD_FORM_ALLOWED_DOMAINS_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          loading: false,
          requestSuccess: false,
        },
      };
    case RESET_FORM_ALLOWED_DOMAINS_REQUEST_SUCCESS:
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          requestSuccess: false,
        },
      };
    case DELETE_FORM_ALLOWED_DOMAIN:
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          // loading: true,
        },
      };
    case DELETE_FORM_ALLOWED_DOMAIN_SUCCESS:
      let finalAllowedDomains = [...state.allowedDomains?.data];
      finalAllowedDomains = finalAllowedDomains.map((item) => {
        if (item.formId === state.currentForm?.id) {
          let domains = [...item.domains].filter((domain) => domain.id !== action?.data?.domain?.id);
          return {
            formId: state.currentForm.id,
            domains: [...domains],
          };
        }
        return item;
      });
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          // loading: false,
          data: finalAllowedDomains,
          requestSuccess: true,
        },
      };
    case DELETE_FORM_ALLOWED_DOMAIN_FAILED:
      action?.message && toast.error(action?.message);
      return {
        ...state,
        allowedDomains: {
          ...state.allowedDomains,
          // loading: false,
          requestSuccess: false,
        },
      };
    case FORCE_SIGNED_OUT:
      return {
        ...state,
        allowedDomains: {
          loading: false,
          requestSuccess: false,
          pageLoading: false,
          data: [],
          validationError: [],
        },
      };
    default:
      return state;
  }
}
