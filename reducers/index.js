import { combineReducers } from "redux";

import auth from "./AuthReducer";
import signUp from "./SignUpReducer";
import util from "./UtilReducer";
import verifyEmail from "./VerifyEmailReducer";
import pricingPage from "./PricingReducer";
import signIn from "./SignInReducer";
import userActivation from "./UserActivationReducer";
import forgotPassword from "./ForgotPasswordReducer";
import resetPassword from "./ResetPasswordReducer";
import forms from "./FormReducer";
import formPlugins from "./FormPlugins";
import accountSettings from "./AccountSettingsReducers";
import invoiceReducers from "./InvoicesReducers";
import WebhookReducers from "./Webhooks";
import UserDashboardReducers from "./UserDashboard";

const rootReducer = combineReducers({
  auth: auth,
  util: util,
  signUp: signUp,
  signIn: signIn,
  verifyEmail: verifyEmail,
  pricingPage: pricingPage,
  userActivation: userActivation,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  forms: forms,
  formPlugins: formPlugins,
  accountSettings: accountSettings,
  invoices: invoiceReducers,
  webhooks: WebhookReducers,
  userDashboard: UserDashboardReducers,
});

export default rootReducer;
