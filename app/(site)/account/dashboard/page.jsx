import { siteURL } from "../../../../services/config";
import AccountDashboardArea from "../_components/AccountDashboardArea";
import accountDashboard from "../../../../fetch-api/user-dashboard";

export const metadata = {
  title: "Dashboard | Formbold",
  alternates: {
    canonical: `${siteURL}/account/dashboard`,
  },
};

export default async function AccountDashboardPage() {
  const data = await accountDashboard();
  return <AccountDashboardArea data={data?.data} />;
}
