import { siteURL } from "../../../../services/config";
// import AccountFormsArea from "../_components/AccountFormsArea";
// import {getAllFormAttempt} from '../../../../api/form';

export const metadata = {
  title: "Account Forms | Formbold",
  alternates: {
    canonical: `${siteURL}/account/forms`,
  },
};

export default async function AccountFormsPage() {
  // const forms = await getAllFormAttempt();
  // return <AccountFormsArea allForms={forms?.data?.forms || []} />;
  return <h2>Account Forms</h2>;
}
