import { isEmpty } from "lodash";
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validateForgotPasswordForm = ({ payload, setError }) => {
  const { email } = payload;

  const error = [];
  const emailErr = [];

  if (email === "") {
    emailErr.push("Email can't be empty");
  }
  if (email.length > 0 && !validEmailRegex.test(email)) {
    emailErr.push("Email is not valid");
    error.push("Email is not valid");
  }

  const err = {
    email: emailErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};
