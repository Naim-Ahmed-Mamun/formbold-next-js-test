import { siteURL } from "../../../../services/config";
import FormsEmptyArea from "../_components/FormsEmptyArea";

export const metadata = {
  title: "Forms Empty | Formbold",
  alternates: {
    canonical: `${siteURL}/account/forms-empty`,
  },
};

export default function FormsEmptyPage() {
  return <FormsEmptyArea />;
}
