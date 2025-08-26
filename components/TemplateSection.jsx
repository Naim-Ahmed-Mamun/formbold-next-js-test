import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "./../public/template-section.svg";
import SectionTitle from "./SectionTitle";

export default function TemplateSection() {
  return (
    <section className="bg-[#F5F8FF] py-24">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 lg:mb-0">
              <SectionTitle
                title="Ready to use form templates"
                titleWidth="550"
                paragraph="Tons of free form templates to get started! we crafted all essential form templates that you can start using immediately without coding from scratch."
                paraWidth="570"
                margin="mb-8"
              />
              <div>
                <Link href="/templates" className="btn inline-flex items-center justify-center bg-primary py-4 px-9 hover:bg-opacity-90">
                    Form Templates
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <div className="text-center">
              <Image src={image} alt="template section image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
