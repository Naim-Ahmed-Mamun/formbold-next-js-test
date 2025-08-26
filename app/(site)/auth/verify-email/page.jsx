import { siteURL } from "../../../../services/config";
import VerifyEmailArea from "../_components/VerifyEmailArea";

export const metadata = {
  title: "Email Verification | Formbold",
  alternates: {
    canonical: `${siteURL}/auth/verify-email`,
  },
};

export default function VerifyEmailPage() {
  return <VerifyEmailArea />;
}
