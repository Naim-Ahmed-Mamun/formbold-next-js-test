import ThanksBox from "../../../components/ThanksBox";
import { siteURL } from "../../../services/config";

export const metadata = {
  title:"Thank You! - Account Successfully Upgraded 🥳 | FormBold",
  alternates: {
    canonical: `${siteURL}/thank-you`,
  },
}

export default function ThanksBoxPage() {
  return (
    <ThanksBox />
  );
}
