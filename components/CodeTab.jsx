import React from "react";

export default function CodeTab({ codeShow, handleCodeShow, code }) {
  return (
    <>
      <button
        className={`rounded-3xl px-7 py-2.5 font-heading text-base font-medium ${
          codeShow === code
            ? "bg-white text-black shadow-fb-three"
            : "text-body-color shadow-none"
        } `}
        onClick={() => handleCodeShow(code)}
      >
        {code}
      </button>
    </>
  );
}
