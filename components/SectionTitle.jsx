import React from "react";
export default function SectionTitle({
  title,
  paragraph,
  center,
  titleWidth,
  paraWidth,
  color,
  margin,
}) {
  return (
    <div
      className={`${margin ? margin : "mb-16"} ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <h2
        className={`mt-0 mb-3 text-3xl font-black leading-tight sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight text-${
          color ? color : "black"
        } ${center ? "mx-auto" : ""}`}
        style={{ maxWidth: `${titleWidth}px` }}
      >
        {title}
      </h2>
      <p
        className={`w-full text-base font-normal leading-relaxed text-${
          color ? color : "body-color"
        } ${center ? "mx-auto" : ""}`}
        style={{ maxWidth: `${paraWidth}px` }}
      >
        {paragraph}
      </p>
    </div>
  );
}
