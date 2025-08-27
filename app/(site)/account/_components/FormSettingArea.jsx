"use client";
// import withAuth from "../../../../hoc/withAuth";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import FormSettingContent from "../../../../components/Account/FormSettingContent";

const FormSettingsArea = ({submissionData}) => {
  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Form Settings" />
        <FormSettingContent submissionData={submissionData} />
      </AccountPageLayout>
    </>
  );
};

export default FormSettingsArea;
