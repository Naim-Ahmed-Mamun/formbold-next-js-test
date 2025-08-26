import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  htmlCode,
  htmlWithFileCode,
  reactCode,
} from "../../services/formSettingsService";
import CopyButton from "./CopyButton";

import configs from "../../services/config";

const IntegrationTabContent = () => {
  const userInfo = useSelector((state) => state.auth?.signIn?.userInfo);
  const emailVeryfied = useSelector((state) => state.auth?.emailVerified);
  const currentForm = useSelector((state) => state.forms?.currentForm);

  const [formEndpoint, setFormEndpoint] = useState(
    `${configs.siteURL}/s/${currentForm.id}`
  );

  const [showCode, setShowCode] = useState("html");

  const integrationsData = [
    {
      id: 1,
      title: "HTML",
      value: "html",
      language: "html",
      code: htmlCode(currentForm.id),
    },
    {
      id: 2,
      title: "HTML with file upload",
      value: "html-with-file-upload",
      language: "html",
      code: htmlWithFileCode(currentForm.id),
    },
    {
      id: 3,
      title: "React/NextJS",
      value: "react-next-js",
      language: "html",
      code: reactCode(currentForm.id),
    },
  ];

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="w-full rounded-[10px] bg-white p-9 shadow-fb-one">
      <h3 className="mb-4 text-[22px] font-bold text-black">Form Details</h3>

      <div className="mb-7">
        <div className="relative mb-3">
          <input
            type="text"
            value={formEndpoint}
            onChange={(e) => setFormEndpoint(e.target.value)}
            placeholder="Form Details"
            className="w-full rounded-md border border-transparent bg-fb-gray py-3.5 pl-6 pr-[85px] text-sm text-black outline-none duration-300 focus:border-primary"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <CopyButton code={formEndpoint} />
          </div>
        </div>
        <p className="text-sm font-normal text-body-color">
          Place this URL in the action attribute of your form. Also, make sure
          your form uses method=&quot;POST&quot;. Finally, ensure that each input has a
          name attribute.
        </p>
      </div>

      <h3 className="mb-2 text-[22px] font-bold text-black">
        Integrate with your usecase
      </h3>
      <p className="mb-7 text-sm font-medium text-body-color">
        Check out the code snippets below for more examples:
      </p>

      <div className="-mx-4 flex flex-wrap space-y-8 2xl:flex-nowrap 2xl:space-y-0">
        <div className="w-full px-4 2xl:max-w-[320px]">
          <div className="w-full space-y-2 rounded-[10px] bg-fb-gray p-2.5">
            {integrationsData.map((integration, index) => (
              <button
                key={index}
                onClick={() => setShowCode(integration?.value)}
                className={`flex w-full rounded-md px-4 py-2 text-left transition-all duration-300 ${
                  showCode === integration?.value
                    ? "bg-white text-primary shadow-fb-seven"
                    : "hover:bg-white hover:text-primary hover:shadow-fb-seven"
                }`}
              >
                {integration?.title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full px-4">
          {integrationsData.map((integration, index) => (
            <div
              key={index}
              className={`relative rounded-[10px] bg-fb-gray ${
                showCode === integration?.value ? "block" : "hidden"
              }`}
            >
              <div className="absolute right-2 top-2 z-10">
                <CopyButton code={integration?.code} />
              </div>

              <pre className={`language-${integration?.language} !m-0 rounded`}>
                <code className={`language-${integration?.language}`}>
                  {integration?.code}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationTabContent;
