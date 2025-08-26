"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesData } from "../../../../actions/Invoices";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import InvoicesEmptyState from "../../../../components/Account/Invoices/InvoicesEmptyState";

import { isEmpty } from "lodash";
import InvoicesTable from "../../../../components/Account/Invoices/InvoicesTable";
import Loader from "../../../../components/Icons/Loader";
import withAuth from "../../../../hoc/withAuth";

const InvoicesArea = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const userInvoices = useSelector((state) => state.invoices);
  const loading = userInvoices?.loading;
  const hasSubscription = userInfo?.hasSubscription;

  useEffect(() => {
    dispatch(getInvoicesData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Invoices" />
        {loading ? (
          <Loader show height="100px" size="100px" />
        ) : userInvoices?.data && !isEmpty(userInvoices?.data) ? (
          <InvoicesTable invoices={userInvoices?.data} />
        ) : (
          <InvoicesEmptyState />
        )}
      </AccountPageLayout>
    </>
  );
};

export default withAuth(InvoicesArea);
