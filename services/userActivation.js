import { isEmpty } from "lodash";
export const validateUserActivationForm = ({ payload, setError }) => {
  const { name, password } = payload;

  const error = [];
  const nameErr = [];
  const passwordErr = [];

  if (name === "") {
    nameErr.push("Name can't be empty");
    error.push("Name can't be empty");
  }
  if (password === "") {
    passwordErr.push("Password can't be empty");
    error.push("Password can't be empty");
  }
  const err = {
    name: nameErr,
    password: passwordErr,
  };
  setError(err);

  return !isEmpty(error) ? err : null;
};
