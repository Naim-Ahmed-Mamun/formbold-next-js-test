import { siteURL } from "../../../../services/config";
import AccountSettingsArea from "../_components/AccountSettingArea";

export const metadata = {
  title: "Account Settings | Formbold",
  alternates: {
    canonical: `${siteURL}/account/account-settings`,
  },
};

export default function AccountSettingPage() {
  return (
    <AccountSettingsArea/>
  )
}
