import TermsBox from "../../../components/TermsBox";
import { siteURL } from "../../../services/config";

export const metadata = {
  title:"Terms of Service | Formbold",
  alternates: {
    canonical: `${siteURL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <TermsBox />
  );
}
