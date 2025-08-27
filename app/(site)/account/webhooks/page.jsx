import { siteURL } from "../../../../services/config";
import WebhooksArea from "../_components/WebhooksArea";
import {getUserApiTokensData} from "../../../../fetch-api/webhook";

export const metadata = {
  title: "Webhooks | Formbold",
  alternates: {
    canonical: `${siteURL}/account/webhooks`,
  },
};

export default async function WebhooksPage() {
  const tokens = await getUserApiTokensData();
  return (
    <WebhooksArea tokens={tokens?.data?.tokens || []} />
  )
}
