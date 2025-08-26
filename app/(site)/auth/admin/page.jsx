import { siteURL } from "../../../../services/config";
import AdminArea from "../_components/AdminArea";

export const metadata = {
  title: "Verifying user | Formbold",
  alternates: {
    canonical: `${siteURL}/auth/admin`,
  },
};

export default function AdminPage() {
  return (
    <AdminArea />
  )
}
