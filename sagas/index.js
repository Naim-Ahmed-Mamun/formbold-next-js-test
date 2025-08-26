import { all, fork } from "redux-saga/effects";
import signInSaga from "./SignIn";
import signUpSaga from "./SignUp";
import verifyEmailSaga from "./VerifyEmail";
import pricingPageSaga from "./PricingPage";
import userActivationSaga from "./UserActivation";
import forgotPasswordSaga from "./ForgotPassword";
import resePasswordSaga from "./ResetPassword";
import formSaga from "./Form";
import formPluginsSaga from "./FormPlugins";
import accountSettingsSaga from "./AccountSettings";
import invoiceSaga from "./Invoices";
import WebhookSaga from "./WebhooksSaga";
import UserDashboardSaga from "./UserDashboard";

export default function* rootSaga() {
  yield all([
    fork(signInSaga),
    fork(signUpSaga),
    fork(verifyEmailSaga),
    fork(pricingPageSaga),
    fork(userActivationSaga),
    fork(forgotPasswordSaga),
    fork(resePasswordSaga),
    fork(formSaga),
    fork(formPluginsSaga),
    fork(accountSettingsSaga),
    fork(invoiceSaga),
    fork(WebhookSaga),
    fork(UserDashboardSaga),
  ]);
}
