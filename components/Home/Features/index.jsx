import React from "react";
import SectionTitle from "../../SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const index = () => {
  return (
    <section id="features" className="pb-9 pt-14 md:pb-[60px] md:pt-20">
      <div className="container">
        <div className="mx-auto max-w-[548px]">
          <SectionTitle
            title="Secure, easy to use with all essential features!"
            paragraph="A simple, no-code and complete Form solution for your next web project"
            center
          />
        </div>

        <div className="grid gap-x-7.5 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default index;
