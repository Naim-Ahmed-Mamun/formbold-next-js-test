import { siteURL } from "../../../../services/config";
import LoginArea from "../_components/LoginArea";

export const metadata = {
  title: "Login | FormBold",
  description:
    "Please log in to manage your forms",
    alternates: {
      canonical: `${siteURL}/auth/login`,
    },
};

export default function LoginPage() {
  return <LoginArea />;
}
