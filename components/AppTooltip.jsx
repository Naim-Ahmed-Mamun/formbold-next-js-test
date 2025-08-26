import React from "react";

export default function AppTooltip({ icon, title }) {
  return (
    <div className="group relative flex h-14 w-14 items-center justify-center rounded-lg bg-[#2b2b60] shadow-app sm:h-20 sm:w-20">
      <span className="h-9 w-9 rounded-full drop-shadow-app sm:h-11 sm:w-11">
        {icon}
      </span>

      <span className="absolute top-[-60px] left-1/2 z-20 hidden w-[135%] -translate-x-1/2 items-center justify-center rounded-md bg-white px-5 py-2 text-xs font-medium text-black group-hover:inline-flex sm:w-[115%] sm:text-base">
        <span className="absolute -bottom-1 left-0 right-0 mx-auto block h-3 w-3 rotate-45 rounded-sm bg-white"></span>
        {title}
      </span>
    </div>
  );
}
