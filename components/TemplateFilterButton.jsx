import React from "react";

export default function TemplateFilterButton({
  handleShowTemplate,
  showTemplate,
  templateTag,
  text,
  id,
}) {
  return (
    <>
      <div className="mb-3 px-1.5">
        <button
          className={`flex items-center whitespace-nowrap rounded-lg px-5 py-3 font-heading text-base font-medium transition-all hover:bg-primary hover:text-white ${
            showTemplate === templateTag
              ? "bg-primary text-white"
              : "bg-fb-gray text-body-color"
          } `}
          onClick={() => handleShowTemplate(templateTag, id)}
        >
          {text}
        </button>
      </div>
    </>
  );
}
