"use client";
import { useState } from "react";
import TemplateCard from "../../../../components/TemplateCard";
import TemplateFilterButton from "../../../../components/TemplateFilterButton";
import { imageUrlBuilder } from "../../../../services/config";

export default function TemplatesMain({ allTemplates, allTags }) {
  const [showTemplate, setShowTemplate] = useState("all");
  const [filterTemplates, setFilterTemplates] = useState(allTemplates);

  const handleShowTemplate = (templateTag, id = "") => {
    setShowTemplate(templateTag);
    if (id) {
      setFilterTemplates(
        allTemplates?.filter((templates) =>
          templates?.tags?.map((tag) => tag?._ref)?.includes(id)
        )
      );
    } else {
      setFilterTemplates(allTemplates);
    }
  };

  return (
      <section className="pb-10 pt-28 lg:pb-20 lg:pt-[140px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[770px] text-center">
                <h1 className="mb-5 text-center text-3xl font-bold leading-tight text-black md:text-4xl md:leading-tight xl:text-[40px] xl:leading-tight">
                  30+ Free HTML Form Templates Based on HTML/CSS and Tailwind
                </h1>

                <p className="text-sm leading-[24px] text-body-color">
                  Ready to use free HTML form templates that you can copy-paste
                  and start using immediately all you need to add FormBold to
                  make them fully work, we crafted almost all essential coded
                  forms you may need for different purposes and are available in
                  plain HTML/CSS and Tailwind CSS version. Find the perfect form
                  template for your needs such as sign-up, contact, lead
                  capture, subscription, survey, quiz, multi-step, application,
                  appointment, reservations, and more. Simply, copy-paste the
                  form code on your web projects and replace the endpoint with
                  your own to make it work anywhere on the web!
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[770px]">
            <div className="-mx-1.5 mb-12 flex flex-wrap items-center justify-center">
              <TemplateFilterButton
                handleShowTemplate={handleShowTemplate}
                showTemplate={showTemplate}
                templateTag="all"
                text="All"
                id=""
              />
              {allTags?.length > 0 &&
                allTags?.map((tag) => (
                  <TemplateFilterButton
                    key={tag?._id}
                    id={tag?._id}
                    handleShowTemplate={handleShowTemplate}
                    showTemplate={showTemplate}
                    templateTag={tag?.slug?.current}
                    text={tag?.name}
                  />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-2 2xl:grid-cols-3">
            {filterTemplates.map((template) => (
              <TemplateCard
                template={{
                  ...template,
                  PreviewImage: imageUrlBuilder
                    .image(template?.PreviewImage)
                    .url(),
                }}
                key={template?._id}
              />
            ))}
          </div>
        </div>
      </section>
  );
}
