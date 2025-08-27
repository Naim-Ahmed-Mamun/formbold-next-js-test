"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import WithAuth from "../../../../hoc/withAuth";
import CreateFormBar from "../../../../components/Account/CreateFormBar";
import SingleFormCard from "../../../../components/Account/SingleFormCard";
import AccountPageLayout from "../../../../components/Account/AccountPageLayout";
import AccountPageBreadcrumb from "../../../../components/Account/AccountPageBreadcrumb";

import { isEmpty } from "lodash";
import {
  getAllForms,
  resetReuestSuccess,
} from "../../../../actions/FormAction";
import FormsEmptyState from "../../../../components/Account/FormsEmptyState";

const AccountFormsArea = ({ allForms }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  // const allForms = useSelector((state) => state.forms?.forms);
  // const pageLoader = useSelector((state) => state.forms?.pageLoading);
  const form_page = useSelector((state) => state.forms);

  useEffect(() => {
    if (userInfo && emailVeryfied) {
      dispatch(getAllForms());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form_page?.requestSucess) {
      dispatch(resetReuestSuccess());
      dispatch(getAllForms());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form_page?.requestSucess]);

  return (
    <>
      <AccountPageLayout>
        <AccountPageBreadcrumb pageName="Forms" />
        <CreateFormBar isFormsPage={true} />

        {!isEmpty(allForms) ? (
          <div
            className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-6 xl:gap-8 2xl:grid-cols-3`}
          >
            {
              // pageLoader ? (
              //   <div className="content-center">
              //     <Loader show />
              //   </div>
              // ) : (
              allForms?.map((form, index) => (
                <SingleFormCard form={form} key={index} />
              ))
            }
          </div>
        ) : (
          <FormsEmptyState />
        )}
      </AccountPageLayout>
    </>
  );
};

export default AccountFormsArea;
