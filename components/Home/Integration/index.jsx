import Image from "next/image";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import templateImage from "../../../public/template-01.svg";
import SectionTitle from "../../SectionTitle";
import IntegrationButton from "./IntegrationButton";
import integrationData from "./integrationData";
import dynamic from "next/dynamic";
const ClientCodeBlock = dynamic(() => import("./ClientCodeBlock"), { ssr: false });

export default function Integration() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [showCode, setShowCode] = useState("html");

  const handleShowCode = (language) => {
    setShowCode(language);
  };

  let fileExtension = "html";
  if (showCode === "react" || showCode === "nextjs") {
    fileExtension = "jsx";
  }
  if (showCode === "vue") {
    fileExtension = "vue";
  }

  let codeLanguage = "html";
  if (showCode === "react" || showCode === "nextjs") {
    codeLanguage = "jsx";
  }
  

  return (
    <section className="bg-white py-14 md:py-[120px]">
      <div className="sm:container">
        <div className="relative z-20">
         <div className="px-4 sm:px-0">
            <SectionTitle
              center
              title="Super easy to integrate, no library, dependency needed."
              paragraph="Example implementations for different tech stacks"
              titleWidth="620"
              paraWidth="690"
              margin="mb-10"
            />
          </div>

          <div className="w-full px-4 text-center">
            <div className="relative mb-[60px] inline-flex max-w-full flex-wrap items-center justify-center rounded-[30px] bg-[#F7F9FC] p-1">
              {integrationData.map((integration, index) => (
                <IntegrationButton
                  key={index}
                  handleShowCode={handleShowCode}
                  showCode={showCode}
                  integration={integration}
                />
              ))}
            </div>
          </div>

          <div className="relative z-20 mx-auto flex w-full max-w-[1060px] flex-wrap bg-white px-4 drop-shadow-[0px_60px_100px_rgba(107,110,148,0.13)] sm:rounded-[10px] sm:px-0 lg:flex-nowrap">
            <div className="flex h-[406px] w-full flex-col rounded-[10px] bg-white lg:max-w-[550px] xl:max-w-[616px]">
              <div className="relative flex h-12 items-center justify-center py-3">
                <div className="absolute left-6 top-1/2 inline-flex -translate-y-1/2 items-center space-x-2.5">
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#FA85A4]"></span>
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#FFE56E]"></span>
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#52E282]"></span>
                </div>
                <span className="inline-flex h-6 items-center rounded-3xl bg-fb-gray px-6 text-[10px] font-medium text-body-color">
                  index.{fileExtension}
                </span>
              </div>

              <div className="light-version h-[350px] flex-1 p-4">
                {integrationData.map((integration, index) => (
                  <div
                    key={index}
                    className={`h-full ${
                      showCode === integration.framework ? "block" : "hidden"
                    }`}
                  >
                    <ClientCodeBlock code={integration.code} language={codeLanguage} />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[406px] w-full rounded-[10px] border-fb-stroke bg-white px-4 lg:border-l xl:max-w-[443px]">
              <div className="relative flex h-12 items-center justify-center">
                <div className="absolute left-6 top-1/2 inline-flex -translate-y-1/2 items-center space-x-2.5">
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#FA85A4]"></span>
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#FFE56E]"></span>
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#52E282]"></span>
                </div>
                <span className="inline-flex h-6 items-center rounded-3xl bg-fb-gray px-6 text-[10px] font-medium text-body-color">
                  Browser
                </span>
              </div>

              <div className="flex items-center justify-center pt-6">
                <Image src={templateImage} alt="template Image" />
              </div>
            </div>

            <div className="absolute -bottom-48 left-1/2 -z-10 h-[280px] w-[calc(100%-40px)] -translate-x-1/2 bg-[url(/integrations/background.svg)] bg-contain bg-center bg-no-repeat"></div>
          </div> 
        </div>
      </div>
    </section>
  );
}
