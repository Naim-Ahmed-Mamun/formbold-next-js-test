"use client";
import React from "react";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import FormsEmptyState from "../../../../components/Account/FormsEmptyState";
// import withAuth from "../../../../hoc/withAuth";

const FormsEmptyArea = () => {
  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Forms Empty" />
        <FormsEmptyState />
      </AccountPageLayout>
    </>
  );
};

export default FormsEmptyArea;
