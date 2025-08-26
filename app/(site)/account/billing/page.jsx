import { siteURL } from "../../../../services/config";
import BillingArea from "../_components/BillingArea";
import {getPricingPageData} from "../../../../api/pricing";

export const metadata = {
  title: "Billing | Formbold",
  alternates: {
    canonical: `${siteURL}/account/billing`,
  },
};

export default async function BillingPage() {
  const pricingData = await getPricingPageData();
  // console.log(pricingData, "pricingData in billing page");
  return <BillingArea pricingData={pricingData?.data} />;
}
