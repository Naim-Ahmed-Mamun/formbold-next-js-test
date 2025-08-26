import React from "react";

const TotalFormsCard = ({ formsCount, activeFormsCount, archivedFormsCount }) => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-2 font-heading text-[22px] font-bold text-black">Forms</h3>
      <p className="mb-5 text-sm text-body-color">You have created {formsCount} forms</p>

      <div className="flex flex-wrap items-center rounded-[10px] border border-fb-stroke px-5">
        <div className="w-full sm:w-1/2 lg:w-full 2xl:w-1/2">
          <p className="py-4 font-heading text-sm font-medium text-black">
            Your active forms{" "}
            <span className="ml-3 inline-flex h-[26px] min-w-[35px] items-center justify-center rounded-3xl bg-fb-green/10 px-2.5 font-heading text-sm font-medium text-fb-green">
              {activeFormsCount}
            </span>
          </p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-full 2xl:w-1/2">
          <p className="py-4 font-heading text-sm font-medium text-black">
            Your inactive forms
            <span className="ml-3 inline-flex h-[26px] min-w-[35px] items-center justify-center rounded-3xl bg-fb-red-light-5 px-2.5 font-heading text-sm font-medium text-fb-red-dark">
              {archivedFormsCount}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalFormsCard;
