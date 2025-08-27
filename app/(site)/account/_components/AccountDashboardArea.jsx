"use client"
// import withAuth from '../../../../hoc/withAuth';
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import DashboardContent from "../../../../components/Account/Dashboard/DashboardContent";

const AccountDashboardArea = ({data}) => {
  return (
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Dashboard" />
        <DashboardContent userDashboard={data} />
      </AccountPageLayout>
  );
};

export default AccountDashboardArea;
