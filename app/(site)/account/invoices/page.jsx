import { siteURL } from "../../../../services/config";
import InvoicesArea from "../_components/InvoicesArea";

export const metadata = {
  title: "Invoices | Formbold",
  alternates: {
    canonical: `${siteURL}/account/invoices`,
  },
};

export default function InvoicesPage() {
  return <InvoicesArea />;
}
