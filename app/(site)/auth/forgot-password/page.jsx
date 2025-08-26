import { siteURL } from "../../../../services/config";
import ForgotPasswordArea from "../_components/ForgotPasswordArea";

export const metadata = {
  title: "Forgot password | FormBold",
  alternates: {
    canonical: `${siteURL}/auth/forgot-password`,
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordArea />;
}
