import React from "react";

const ToggleSwitch = ({ id, checked = false, isDisabled = false, onChangeCallback }) => {
  return (
    <>
      <div className="toggleSwitch relative mb-4">
        <label className="relative cursor-pointer" htmlFor={id}>
          <input id={id} className="sr-only" disabled={isDisabled} type="checkbox" checked={checked} onChange={onChangeCallback} />
          <span className={`box block h-8 w-14 rounded-full bg-stroke`}></span>
          <span className="dot absolute left-1 top-1 flex h-6 w-6 translate-x-0 items-center justify-center rounded-full bg-white transition"></span>
        </label>
      </div>
    </>
  );
};

export default ToggleSwitch;
