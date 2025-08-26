import { toast } from "react-toastify";
import {
  SIGN_IN_SUCCESS,
  GET_USER_REQUIRED_DATA,
  GET_USER_REQUIRED_DATA_SUCCESS,
  GET_USER_REQUIRED_DATA_FAILURE,
  MAKE_USER_LOGGED_IN,
  MAKE_USER_LOGGED_IN_SUCCESS,
  MAKE_USER_LOGGED_IN_FAILURE,
} from "../actions/SigninActions";
import { REGISTER_SUCCESS } from "../actions/SignUpActions";
import { SIGNED_OUT, TOKEN_ERROR } from "../actions";
import { RESEND_VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_SUCCESS } from "../actions/VerifyEmailActions";
import { USER_ACTIVATION_SUCCESS } from "../actions/userActivation";
import { MAKE_USER_SIGNED_IN } from "../actions/UserActions";
import {
  ADD_NEW_LINKED_EMAIL_SUCCESS,
  DELETE_LINKED_EMAIL_SUCCESS,
  UPDATE_TIMEZONE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCESS,
  DELETE_USER_ACCOUNT_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
} from "../actions/AccountSettings";
import { handleSessionLogout } from "../components/services/login";
import { BILLING_PAGE_DATA_SUCCESS } from "../actions/PricingActions";
import Cookies from "js-cookie";

const initialState = {
  signIn: undefined,
  signOut: false,
  register: undefined,
  emailVerified: false,
  hasSubscription: false,
  timeZoneList: undefined,
  userTimezone: undefined,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      localStorage.setItem("access_token", action?.credentials?.data?.token);
      localStorage.setItem("user_info", JSON.stringify(action?.credentials?.data?.user));
      // cookies
      Cookies.set('access_token', action?.credentials?.data?.token);
      Cookies.set('user_info', JSON.stringify(action?.credentials?.data?.user));

      toast.success(action?.credentials?.message);
      const newObj = {
        userInfo: action?.credentials?.data?.user,
        token: action?.credentials?.data?.token,
      };
      return {
        ...state,
        signIn: newObj,
        signOut: false,
        emailVerified: action?.credentials?.data?.emailVerified,
        hasSubscription: action?.credentials?.data?.hasSubscription,
        timeZoneList: action?.credentials?.data?.timezones,
        userTimezone: action?.credentials?.data?.userTimeZone,
      };
    case DELETE_USER_ACCOUNT_SUCCESS:
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");

      Cookies.remove("access_token");
      Cookies.remove("user_info");

      handleSessionLogout();
      window.location.href = "/";
      return {
        ...state,
        ...initialState,
      };
    case MAKE_USER_LOGGED_IN_SUCCESS:
      localStorage.setItem("access_token", action?.credentials?.data?.token);
      localStorage.setItem("user_info", JSON.stringify(action?.credentials?.data?.user));
      // cookies
      Cookies.set('access_token', action?.credentials?.data?.token);
      Cookies.set('user_info', JSON.stringify(action?.credentials?.data?.user));

      toast.success(action?.credentials?.message);
      const newUserObj = {
        userInfo: action?.credentials?.data?.user,
        token: action?.credentials?.data?.token,
      };
      return {
        ...state,
        signIn: newUserObj,
        signOut: false,
        emailVerified: action?.credentials?.data?.emailVerified,
        hasSubscription: action?.credentials?.data?.hasSubscription,
        timeZoneList: action?.credentials?.data?.timezones,
        userTimezone: action?.credentials?.data?.userTimeZone,
      };
    case GET_USER_PROFILE_SUCCESS:
      localStorage.setItem("user_info", JSON.stringify(action?.data?.user));
      // cookies
      Cookies.set('user_info', JSON.stringify(action?.data?.user));

      const updatedUserData = {
        userInfo: action?.data?.user,
        token: state.signIn.token,
      };
      return {
        ...state,
        signIn: updatedUserData,
      };
    case GET_USER_REQUIRED_DATA_SUCCESS:
      localStorage.setItem("user_info", JSON.stringify(action?.credentials?.data?.user));
      // cookies
      Cookies.set('user_info', JSON.stringify(action?.credentials?.data?.user));

      toast.success(action?.credentials?.message);
      const finalUserData = {
        userInfo: action?.credentials?.data?.user,
        token: action?.credentials?.data?.token,
      };
      return {
        ...state,
        signIn: finalUserData,
        signOut: false,
        emailVerified: action?.credentials?.data?.emailVerified,
        hasSubscription: action?.credentials?.data?.hasSubscription,
        timeZoneList: action?.credentials?.data?.timezones,
        userTimezone: action?.credentials?.data?.userTimeZone,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("access_token", action?.credentials?.data?.token);
      localStorage.setItem("user_info", JSON.stringify(action?.credentials?.data?.user));

      // cookies
      Cookies.set('access_token', action?.credentials?.data?.token);
      Cookies.set('user_info', JSON.stringify(action?.credentials?.data?.user));

      toast.success(action?.credentials?.message);
      const signInDataAfterRegister = {
        userInfo: action?.credentials?.data?.user,
        token: action?.credentials?.data?.token,
      };
      return {
        ...state,
        signIn: signInDataAfterRegister,
        emailVerified: action?.credentials?.data?.emailVerified,
        hasSubscription: action?.credentials?.data?.hasSubscription,
      };
    case TOKEN_ERROR:
      return {
        ...state,
        signInLoader: false,
        signin: undefined,
        signout: true,
      };
    case RESEND_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: action?.data?.data?.emailVerified,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true,
      };
    case SIGNED_OUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      // cookies
      Cookies.remove("access_token");
      Cookies.remove("user_info");

      handleSessionLogout();
      window.location.href = "/";
      return { ...initialState };

    case USER_ACTIVATION_SUCCESS:
      localStorage.setItem("access_token", action?.credentials?.data?.token);
      localStorage.setItem("user_info", JSON.stringify(action?.credentials?.data?.user));
      // cookies
      Cookies.set('access_token', action?.credentials?.data?.token);
      Cookies.set('user_info', JSON.stringify(action?.credentials?.data?.user));

      toast.success(action?.credentials?.message);
      const finalNewObj = {
        userInfo: action?.credentials?.data?.user,
        token: action?.credentials?.data?.token,
      };
      return {
        ...state,
        signIn: finalNewObj,
        signOut: false,
        emailVerified: action?.credentials?.data?.emailVerified,
        hasSubscription: action?.credentials?.data?.hasSubscription,
      };
    case MAKE_USER_SIGNED_IN:
      localStorage.setItem("access_token", action?.payload?.token);
      localStorage.setItem("user_info", JSON.stringify(action?.payload?.user));
      // cookies
      Cookies.set('access_token', action?.payload?.token);
      Cookies.set('user_info', JSON.stringify(action?.payload?.user));

      toast.success(action?.payload?.message);
      const finalUserObj = {
        userInfo: action?.payload?.user,
        token: action?.payload?.token,
      };
      return {
        ...state,
        signIn: finalUserObj,
        signOut: false,
        emailVerified: action?.payload?.emailVerified,
        hasSubscription: action?.payload?.hasSubscription,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      localStorage.removeItem("user_info");
      localStorage.setItem("user_info", JSON.stringify(action?.data?.user));
      // cookies
      Cookies.remove("user_info");
      Cookies.set('user_info', JSON.stringify(action?.data?.user));

      toast.success(action?.message);
      const updatedUser = {
        ...state.signIn,
        userInfo: action?.data?.user,
      };
      return {
        ...state,
        signIn: updatedUser,
      };
    case UPDATE_USER_PROFILE_FAILED:
      toast.error(action?.message);
      return {
        ...state,
      };
    case UPDATE_TIMEZONE_SUCCESS:
      return {
        ...state,
        userTimezone: action?.data?.timezone,
      };
    case DELETE_LINKED_EMAIL_SUCCESS:
      const updateUserInfo = {
        ...state.signIn.userInfo,
        email_addresses: action?.data?.email_addresses,
      };
      localStorage.removeItem("user_info");
      localStorage.setItem("user_info", JSON.stringify(updateUserInfo));
      // cookies
      Cookies.remove("user_info");
      Cookies.set('user_info', JSON.stringify(updateUserInfo));

      return {
        ...state,
        signIn: {
          ...state.signIn,
          userInfo: { ...updateUserInfo },
        },
      };
    case ADD_NEW_LINKED_EMAIL_SUCCESS:
      const updateUserInfoAfterEmailAdd = {
        ...state.signIn.userInfo,
        email_addresses: action?.data?.data?.email_addresses,
      };
      localStorage.removeItem("user_info");
      localStorage.setItem("user_info", JSON.stringify(updateUserInfoAfterEmailAdd));
      // cookies
      Cookies.remove("user_info");
      Cookies.set('user_info', JSON.stringify(updateUserInfoAfterEmailAdd));
      
      return {
        ...state,
        signIn: {
          ...state.signIn,
          userInfo: { ...updateUserInfoAfterEmailAdd },
        },
      };
    case BILLING_PAGE_DATA_SUCCESS:
      const { data: finalData } = action?.data;
      return {
        ...state,
        hasSubscription: finalData?.hasSubscription ? finalData?.hasSubscription : false,
      };
    default:
      return state;
  }
}
