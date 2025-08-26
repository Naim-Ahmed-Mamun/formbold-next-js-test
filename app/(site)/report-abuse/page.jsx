import ReportAbuseForm from "../../../components/ReportAbuseForm";
import { siteURL } from "../../../services/config";

export const metadata = {
  title:"Report Abuse | FormBold",
  alternates: {
    canonical: `${siteURL}/report-abuse`,
  },
}
export default function ReportAbusePage() {
  return (
    <ReportAbuseForm />
  );
}
