import { siteURL } from "../../../../../services/config";
import ResetPasswordArea from "../../_components/ResetPasswordArea";

export const metadata = {
  title: "Reset password | Formbold",
  alternates: {
    canonical: `${siteURL}/auth/reset-password`,
  },
};

export default async function ResetPasswordPage({ params }) {
  const { slug } = await params;
  return <ResetPasswordArea token={slug} />;
}
