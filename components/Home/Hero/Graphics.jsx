import React from "react";

const Graphics = () => {
  let line = [];
  for (let index = 0; index < 50; index++) {
    line.push(
      <div
        key={index}
        className="mb-12 block h-px w-full bg-fb-gray py-[.5px]"
      ></div>
    );
  }
  let line2 = [];
  for (let index = 0; index < 50; index++) {
    line2.push(
      <div
        key={index}
        className="mb-12 block h-full w-px bg-fb-gray px-[.5px]"
      ></div>
    );
  }

  return (
    <>
      <div className="absolute left-0 top-0 -z-10 flex h-full w-full flex-col items-center justify-center space-y-12">
        {line}
      </div>
      <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center space-x-12">
        {line2}
      </div>
    </>
  );
};

export default Graphics;
