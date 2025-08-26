import { siteURL } from "../../../../services/config";
import AccountDashboardArea from "../_components/AccountDashboardArea";

export const metadata = {
  title: "Dashboard | Formbold",
  alternates: {
    canonical: `${siteURL}/account/dashboard`,
  },
};

export default function AccountDashboardPage() {
  return <AccountDashboardArea />;
}
