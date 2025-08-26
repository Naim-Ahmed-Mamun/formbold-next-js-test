import { isEmpty } from "lodash";
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validateSignUpForm = ({ payload, setError }) => {
  const { email, password, name } = payload;

  const error = [];
  const emailErr = [];
  const passwordErr = [];
  const nameErr = [];

  if (email === "") {
    emailErr.push("Email can't be empty");
  }
  if (email.length > 0 && !validEmailRegex.test(email)) {
    emailErr.push("Email is not valid");
    error.push("Email is not valid");
  }
  if (password === "") {
    passwordErr.push("Password can't be empty");
    error.push("Password can't be empty");
  }
  if (name === "") {
    nameErr.push("Name can't be empty");
    error.push("Name can't be empty");
  }

  const err = {
    email: emailErr,
    password: passwordErr,
    name: nameErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};
export const getSignUpValidationErrorFromApi = ({ payload, setError }) => {
  const { email, password, name } = payload;

  const error = email || password || name;
  const emailErr = email ? [...email] : [];
  const passwordErr = password ? [...password] : [];
  const nameErr = name ? [...name] : [];

  const err = {
    email: emailErr,
    password: passwordErr,
    name: nameErr,
  };

  setError(err);

  return !isEmpty(error) ? err : null;
};

export const resetSignUpValidation = ({ setError }) => {
  setError({
    email: [],
    password: [],
    name: [],
  });
};

export const validateSignInForm = ({ payload, setError }) => {
  const { email, password } = payload;

  const error = [];
  const emailErr = [];
  const passwordErr = [];

  if (email === "") {
    emailErr.push("Email can't be empty");
    error.push("Email can't be empty");
  }
  if (email.length > 0 && !validEmailRegex.test(email)) {
    emailErr.push("Email is not valid");
    error.push("Email is not valid");
  }
  if (password === "") {
    passwordErr.push("Password can't be empty");
    error.push("Password can't be empty");
  }
  const err = {
    email: emailErr,
    password: passwordErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};

export const getSignInValidationErrorFromApi = ({ payload, setError }) => {
  const { email, password } = payload;

  const error = email || password;
  const emailErr = email ? [...email] : [];
  const passwordErr = password ? [...password] : [];

  setError({
    email: emailErr,
    password: passwordErr,
  });

  return {
    email: emailErr,
    password: passwordErr,
  };
};
export const resetSignInValidation = ({ setError }) => {
  setError({
    email: [],
    password: [],
  });
};
