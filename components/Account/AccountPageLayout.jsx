import React, { useState } from "react";

import AccountPageSidebar from "./AccountPageSidebar";
import AccountStatusBar from "./AccountStatusBar";

const AccountPageLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="bg-white pt-24">
      <div className="border-t border-fb-stroke">
        <div className="flex flex-wrap lg:flex-nowrap">
          {/* Account Page Sidebar */}
          <AccountPageSidebar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />

          <div
            className={`w-full bg-fb-gray lg:overflow-x-auto ${
              openSidebar ? "" : ""
            }`}
          >
            {/* Account Status Bar */}
            <AccountStatusBar
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />

            <div className="bg-fb-gray p-6 sm:p-8 lg:p-6 xl:p-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPageLayout;
