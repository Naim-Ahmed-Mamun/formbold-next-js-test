import { get, isEmpty } from "lodash";
const needDropzoneJsItems = ["FileUpload"];

export const validateFormCreate = ({ payload, setError }) => {
  const { name, email } = payload;

  const error = [];
  const emailErr = [];
  const nameErr = [];

  if (email === "") {
    emailErr.push("Email can't be empty");
    error.push("Email can't be empty");
  }
  if (name === "") {
    nameErr.push("Name can't be empty");
    error.push("Name can't be empty");
  }
  const err = {
    name: nameErr,
    email: emailErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};
export const validateFormSettings = ({ payload, setError }) => {
  const { name, email } = payload;

  const error = [];
  const emailErr = [];
  const nameErr = [];

  if (email === "") {
    emailErr.push("Email can't be empty");
    error.push("Email can't be empty");
  }
  if (name === "") {
    nameErr.push("Name can't be empty");
    error.push("Name can't be empty");
  }
  const err = {
    name: nameErr,
    email: emailErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};

export const getFormId = (form) => {
  return get(form, "id", undefined);
};
export const getCurrentFormContents = (form, allFormContent) => {
  let currentFormContents = [];
  const formId = get(form, "id", undefined);
  if (formId && !isEmpty(allFormContent) && allFormContent.some((item) => item.formId == formId)) {
    currentFormContents = allFormContent.filter((item) => item.formId == formId)[0].formContents;
  }
  return currentFormContents;
};

export const hasFileUploadElement = (builderData) => {
  return builderData.some((item) => needDropzoneJsItems.includes(item.element));
};

export const addFileUploadjs = (builderData) => {
  let returnData = "";
  if (hasFileUploadElement(builderData)) {
    returnData = `<link rel="stylesheet" href="https://cdn.formbold.com/dropzone.css" />
    <script src="https://cdn.formbold.com/dropzone.js"></script>
    `;
  }
  return returnData;
};
