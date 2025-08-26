import { siteURL } from "../../../../services/config";
import RegisterArea from "../_components/RegisterArea";

export const metadata = {
  title: "Sign Up | FormBold",
  description:
    "Create your account to create forms and start receiving submissions",
  alternates: {
    canonical: `${siteURL}/auth/register`,
  },
};

export default function RegisterPage() {
  return <RegisterArea />;
}
