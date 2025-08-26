import React from "react";
import FormBuilder from "../../lib/builder";

const FormBuilderWrapper = () => {
  return (
    <>
      <div className="border-t border-stroke">
        <FormBuilder.ReactFormBuilder />
      </div>
    </>
  );
};

export default FormBuilderWrapper;
