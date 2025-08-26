import { siteURL } from '../../../../../services/config';
import FormSettingsArea from '../../_components/FormSettingArea';

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  return {
    title: `Form Settings | Formbold`,
    alternates: {
        canonical: `${siteURL}/account/forms/${id}`,
    },
  };
}

export default function FormSettingPage() {
  return (
    <FormSettingsArea/>
  )
}
