import { siteURL } from "../../../../services/config";
import AccountFormsArea from "../_components/AccountFormsArea";

export const metadata = {
  title: "Account Forms | Formbold",
  alternates: {
    canonical: `${siteURL}/account/forms`,
  },
};

export default function AccountFormsPage() {
  return <AccountFormsArea />;
}
