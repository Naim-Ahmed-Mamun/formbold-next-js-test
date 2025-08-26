import React from "react";
import author1 from "../../../public/testimonials/author-1.png";
import author2 from "../../../public/testimonials/author-2.png";
import author3 from "../../../public/testimonials/author-3.png";
import SectionTitle from "../../SectionTitle";
import TestimonialItem from "./TestimonialItem";

const testimonialData = [
  {
    id: 1,
    authorImage: author1,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "Musharof Chowdhury",
    designation: "Founder @ Ayro UI",
  },
  {
    id: 2,
    authorImage: author2,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "William Smith",
    designation: "Founder @ Torex",
  },
  {
    id: 3,
    authorImage: author3,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "Sabo Masties",
    designation: "Founder @ Nextido",
  },
  {
    id: 4,
    authorImage: author1,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "Musharof Chowdhury",
    designation: "Founder @ Ayro UI",
  },
  {
    id: 5,
    authorImage: author2,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "William Smith",
    designation: "Founder @ Torex",
  },
  {
    id: 6,
    authorImage: author3,
    imageAlt: "author",
    description:
      "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    name: "Sabo Masties",
    designation: "Founder @ Nextido",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-14 md:pt-[120px]">
      <div className="md:container">
        <div className="rounded-[22px] bg-fb-gray px-4 pb-10 pt-14 sm:px-10 lg:pt-[100px]">
          <SectionTitle
            title="What our users say"
            titleWidth="400"
            paragraph="See what our users think and says about our products and services"
            paraWidth="700"
            center
          />

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 xl:grid-cols-3">
            {testimonialData.map((testimonialItem, id) => (
              <TestimonialItem testimonialItem={testimonialItem} key={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
