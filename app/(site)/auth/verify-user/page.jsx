import { siteURL } from "../../../../services/config";
import VerifyUserArea from "../_components/VerifyUserArea";

export const metadata = {
  title:"Verifying user | Formbold",
  alternates: {
    canonical: `${siteURL}/auth/verify-user`,
  },
}

export default function VerifyUserPage() {
  return (
    <VerifyUserArea/>
  )
}
