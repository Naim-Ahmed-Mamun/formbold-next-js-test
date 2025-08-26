import Link from "next/link";
import React from "react";

const UpgradeButton = () => {
  return (
    <>
      <Link href="/pricing" className="inline-flex items-center justify-center rounded-3xl bg-primary px-[18px] py-2 font-heading text-sm font-medium text-white duration-300 hover:bg-fb-primary-hover">
          <span className="pr-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.50065 6.70275V5.33301C3.50065 2.84773 5.51537 0.833008 8.00065 0.833008C10.4859 0.833008 12.5007 2.84773 12.5007 5.33301V6.70275C13.2438 6.75825 13.7278 6.89837 14.0815 7.25213C14.6673 7.83791 14.6673 8.78072 14.6673 10.6663C14.6673 12.552 14.6673 13.4948 14.0815 14.0806C13.4957 14.6663 12.5529 14.6663 10.6673 14.6663H5.33398C3.44837 14.6663 2.50556 14.6663 1.91977 14.0806C1.33398 13.4948 1.33398 12.552 1.33398 10.6663C1.33398 8.78072 1.33398 7.83791 1.91977 7.25213C2.27352 6.89837 2.75748 6.75825 3.50065 6.70275ZM4.50065 5.33301C4.50065 3.40001 6.06765 1.83301 8.00065 1.83301C9.93365 1.83301 11.5007 3.40001 11.5007 5.33301V6.66872C11.2453 6.66634 10.9683 6.66634 10.6673 6.66634H5.33398C5.03298 6.66634 4.75599 6.66634 4.50065 6.66872V5.33301Z"
                fill="white"
              />
            </svg>
          </span>
          Upgrade to Unlock
      </Link>
    </>
  );
};

export default UpgradeButton;
