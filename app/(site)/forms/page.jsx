import { siteURL } from "../../../services/config";
import FormsMain from "./_components/FormsMain";

export const metadata = {
  title: "Forms | Formbold",
  robots: "noindex",
  alternates: {
    canonical: `${siteURL}/forms`,
  },
};

export default function FormsPage() {
  return <FormsMain />;
}
