import Image from "next/image";
import React from "react";
import image1 from "./../public/clients/image-01.svg";
import image2 from "./../public/clients/image-02.svg";
import image3 from "./../public/clients/image-03.svg";
import image4 from "./../public/clients/image-04.svg";
import image5 from "./../public/clients/image-05.svg";
import SectionTitle from "./SectionTitle";

const images = [
  {
    id: 1,
    image: image1,
    link: "https://onepagelove.com/",
    name: "onepagelove",
  },
  {
    id: 2,
    image: image2,
    link: "https://metamap.com",
    name: "metamap",
  },
  {
    id: 3,
    image: image3,
    link: "https://www.zavvy.io/",
    name: "zavvy",
  },
  {
    id: 4,
    image: image4,
    link: "https://asuratechnologies.com/",
    name: "asura",
  },
  {
    id: 5,
    image: image5,
    link: "#",
    name: "FC",
  },
];

export default function Clients() {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex">
          <div className="w-full">
            <SectionTitle
              title="Notable Users"
              paragraph="You’re in good company, check out who are using FormBold with their projects."
              paraWidth="690"
              center
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center">
          {images.map((imageItem, id) => (
            <ImageItem imageItem={imageItem} key={id} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ImageItem = ({ imageItem }) => {
  const { image, link, name } = imageItem;
  return (
    <a
      href={link}
      name="image"
      target="_blank"
      rel="noreferrer"
      className="m-3 flex h-[70px] w-[150px] items-center justify-center rounded-lg p-3 md:h-[90px] xl:w-[210px] "
    >
      <Image src={image} alt={name} />
    </a>
  );
};
