import { siteURL } from "../../../../services/config";
import BillingArea from "../_components/BillingArea";

export const metadata = {
  title: "Billing | Formbold",
  alternates: {
    canonical: `${siteURL}/account/billing`,
  },
};

export default function BillingPage() {
  return <BillingArea />;
}
