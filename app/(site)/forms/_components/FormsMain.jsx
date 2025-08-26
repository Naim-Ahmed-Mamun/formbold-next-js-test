"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { getAllForms, setCurrentForm } from "../../../../actions/FormAction";
import Loader from "../../../../components/Icons/Loader";

const FormsMain = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const signInData = useSelector((state) => state.auth?.signIn);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const allForms = useSelector((state) => state.forms?.forms);
  const pageLoader = useSelector((state) => state.forms?.pageLoading);

  useEffect(() => {
    if (signInData) {
      dispatch(getAllForms());
    } else {
      toast.warning(
        <>
          <h2>Not Logged In!!</h2>
          <p>Please Log in first, Sync feature not available at the moment</p>
        </>
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInData]);

  const handelSetCurruntForm = (e, form) => {
    e.preventDefault();
    dispatch(setCurrentForm(form));
    router.push("/account/dashboard");
  };

  return (
    <>
      <div className="pb-[100px] pt-[120px] lg:pt-[150px]">
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-[890px] items-center justify-center rounded-lg border border-stroke bg-[#E2E8F029] px-5 py-12 md:px-12">
            <div className="text-center">
              <h1 className="mb-4 text-[26px] font-semibold !leading-tight text-black sm:text-[34px]">This is Forms page</h1>
              <p className="mb-5 text-sm text-body-color sm:text-base">This is a demo design . this page shows users all created forms</p>

              <div className="mx-auto w-full max-w-[590px]">
                {pageLoader ? (
                  <Loader show />
                ) : (
                  <div className="-mx-3 flex flex-wrap">
                    {allForms.map((form, index) => (
                      <div key={index} className="w-full px-3 sm:w-1/2" style={{ cursor: "pointer" }} onClick={(e) => handelSetCurruntForm(e, form)}>
                        <div className="group mb-8 block rounded border border-dashed border-stroke bg-white p-5 pt-10 text-center hover:border-primary sm:mb-0">
                          <span className="text-base text-black">{form.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormsMain;
