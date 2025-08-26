import { siteURL } from "../../../../services/config";
import WebhooksArea from "../_components/WebhooksArea";

export const metadata = {
  title: "Webhooks | Formbold",
  alternates: {
    canonical: `${siteURL}/account/webhooks`,
  },
};

export default function WebhooksPage() {
  return (
    <WebhooksArea />
  )
}
