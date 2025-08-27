"use client";
// import withAuth from "../../../../hoc/withAuth";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import DangerZoneCard from "../../../../components/Account/DangerZoneCard";
import EditProfileCard from "../../../../components/Account/EditProfileCard";
import LinkedEmailCard from "../../../../components/Account/LinkedEmailCard";
import PasswordSettingCard from "../../../../components/Account/PasswordSettingCard";
import TimeZoneCard from "../../../../components/Account/TimeZoneCard";

// 
const AccountSettingsArea = () => {
  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Account Settings" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <EditProfileCard />

            <TimeZoneCard />

            <DangerZoneCard />
          </div>
          <div className="space-y-8">
            <PasswordSettingCard />

            <LinkedEmailCard />
          </div>
        </div>
      </AccountPageLayout>
    </>
  );
};

export default AccountSettingsArea;
