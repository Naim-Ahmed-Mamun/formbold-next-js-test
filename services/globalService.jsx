import { toast } from "react-toastify";
import { find } from "lodash";

export const copyToClipboard = (text) => {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();

  toast.success("Link Copied Successfully");
};

export const getUserPrimaryEmail = (user) => {
  return find(user?.email_addresses, { email: user?.email });
};

export const makeUrlSearchParameter = (baseUrl, paramsObject) => {
  const searchParams = new URLSearchParams();
  for (const key in paramsObject) {
    if (paramsObject.hasOwnProperty(key)) {
      searchParams.append(key, paramsObject[key]);
    }
  }

  const queryString = searchParams.toString();
  const url = baseUrl + (queryString ? `?${queryString}` : "");

  return url;
};
