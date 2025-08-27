import { siteURL } from "../../../../../services/config";
import FormSettingsArea from "../../_components/FormSettingArea";
import { getFormSubmissions } from "../../../../../fetch-api/form";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  return {
    title: `Form Settings | Formbold`,
    alternates: {
      canonical: `${siteURL}/account/forms/${id}`,
    },
  };
};

export default async function FormSettingPage({ params, searchParams }) {
  const { id } = await params;
  const search_params = (await searchParams) || {};
  const filters = {
    page: search_params?.page || 1,
    perPage: search_params?.perPage || 10,
    spam: search_params?.spam || undefined,
    tab: search_params?.tab || undefined,
  };

  const data = await getFormSubmissions(id, filters);

  return (
    <FormSettingsArea
      submissionData={data?.data || {}}
    />
  );
}
