import React from "react";

import featuresData2 from "./featuresData2";
import SingleFeature2 from "./SingleFeature2";

const index = () => {
  return (
    <section className="pt-10">
      <div className="container">
        <div className="grid gap-7.5 lg:grid-cols-2">
          {featuresData2.map((feature, i) => (
            <SingleFeature2 key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default index;
