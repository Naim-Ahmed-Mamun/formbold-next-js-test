import React from "react";
import { useRouter } from 'next/navigation';

const AccountPageBreadcrumb = ({ pageName }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-black">{pageName}</h3>
        </div>

        <div className="mb-5">
          <ul className="flex items-center justify-end space-x-2 text-sm text-body-color">
            <li className="after:ml-2 after:content-['/']">
              <button onClick={() => router.push("/account/forms")}>
                <a>Form</a>
              </button>
            </li>
            <li className="">{pageName}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccountPageBreadcrumb;
