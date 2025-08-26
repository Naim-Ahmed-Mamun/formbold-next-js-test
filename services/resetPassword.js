import { isEmpty } from "lodash";
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validatePasswordResetForm = ({ payload, setError }) => {
  const { email, password, token, password_confirmation } = payload;

  const error = [];
  const emailErr = [];
  const passwordErr = [];
  const confirmPasswordErr = [];
  const tokenErr = [];

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
  if (password_confirmation === "") {
    confirmPasswordErr.push("Confirm Password can't be empty");
    error.push("Confirm Password can't be empty");
  }

  if (password !== "" && password_confirmation !== "" && password !== password_confirmation) {
    passwordErr.push("Password and confirm password does not match");
    error.push("Password and confirm password does not match");
  }

  const err = {
    email: emailErr,
    password: passwordErr,
    confirmPassword: confirmPasswordErr,
    token: tokenErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};

export const validatePasswordResetFormFromApi = ({ payload, setError }) => {
  const { email, password, token, password_confirmation } = payload;

  const error = email || password || token || password_confirmation;
  const emailErr = email ? [...email] : [];
  const passwordErr = password ? [...password] : [];
  const tokenErr = token ? [...token] : [];
  const confirmPasswordErr = password_confirmation ? [...password_confirmation] : [];

  const err = {
    email: emailErr,
    password: passwordErr,
    confirmPassword: confirmPasswordErr,
    token: tokenErr,
  };

  setError(err);

  return !isEmpty(error) ? err : null;
};
