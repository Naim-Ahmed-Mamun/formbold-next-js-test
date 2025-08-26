import PrivacyPolicyBox from "../../../components/PrivacyBox";
import { siteURL } from "../../../services/config";

export const metadata = {
  title:"Privacy Policy | FormBold",
  alternates: {
    canonical: `${siteURL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyBox />
  );
}
