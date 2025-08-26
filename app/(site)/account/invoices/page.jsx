import { siteURL } from "../../../../services/config";
import InvoicesArea from "../_components/InvoicesArea";
import {getUserInvoices} from "../../../../api/invoice";

export const metadata = {
  title: "Invoices | Formbold",
  alternates: {
    canonical: `${siteURL}/account/invoices`,
  },
};

export default async function InvoicesPage() {
  const invoices = await getUserInvoices();
  
  return <InvoicesArea userInvoiceData={invoices?.data?.receipts || []} />;
}
