import axios from "axios";
import { signOut } from "next-auth/react";

const reqData = {
  method: "GET",
  url: "",
  queryParams: {},
  formData: {},
  bodyParams: {},
  pathParams: [],
  data: {},
};

function makeHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
}
/*eslint-disable */
function makeHeaderWithToken(options) {
  const { token, ContentType } = options;
  const headers = {
    Authorization: `${"Bearer" + " "}${token}`,
    "Content-Type": ContentType,
  };
  return headers;
}

export function defaultApi(
  URL,
  method,
  details,
  hideLoader,
  options = {
    ContentType: "application/json",
  }
) {
  const token = localStorage.getItem("access_token");
  const newOptions = {
    ...options,
    token: token,
  };

  // axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  // axios.defaults.xsrfCookieName = 'csrftoken';
  // axios.defaults.withCredentials = true;

  const api = axios.create({
    baseURL: URL,
    headers: token ? makeHeaderWithToken(newOptions) : makeHeaders(),
  });

  let requestDetails = { ...reqData };
  requestDetails.url = URL;
  requestDetails.method = method;
  requestDetails.data = details;

  return apiCall(api, requestDetails, hideLoader)
    .then((response) => response)
    .catch((error) => error);
}

async function apiCall(api, requestDetails, hideLoader) {
  // !hideLoader && store.dispatch(loadingStart());
  let apiReturn = {
    response: undefined,
    error: undefined,
  };

  try {
    const data = await api(requestDetails);
    apiReturn = { ...apiReturn, response: data };
  } catch (error) {
    // console.log(error?.response?.status,'error in apiCall');
    if(error?.response?.status === 403){
      await signOut({
        redirect: true,
        callbackUrl: "/auth/login",
      });
    }
    apiReturn = { ...apiReturn, error: error && error.response };
  }

  // !hideLoader && store.dispatch(loadingStop());

  return apiReturn;
}
