"use client";
import withAuth from "../../../../hoc/withAuth";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import FormSettingContent from "../../../../components/Account/FormSettingContent";

const FormSettingsArea = () => {
  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Form Settings" />
        <FormSettingContent />
      </AccountPageLayout>
    </>
  );
};

export default withAuth(FormSettingsArea);
