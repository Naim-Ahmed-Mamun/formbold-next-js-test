import React from "react";

const SingleFeature2 = ({ feature }) => {
  const { icon, title, description } = feature;

  return (
    <div className="rounded-[18px] border border-fb-stroke bg-white p-5 shadow-fb-one duration-300 hover:border-transparent hover:shadow-feature2 xs:p-6">
      <div className="flex">
        <div className="mr-4 xs:mr-5">{icon}</div>
        <div>
          <h3 className="mb-2.5 font-heading text-lg font-bold text-black xs:text-xl">
            {title}
          </h3>
          <p className="text-sm text-body-color">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature2;
