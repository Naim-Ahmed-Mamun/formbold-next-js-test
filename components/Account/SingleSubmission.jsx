import { isArray, isEmpty } from "lodash";
import moment from "moment";
import React, { useState } from "react";

const SingleSubmission = ({ submission }) => {
  const { submissionID, isSpam, fields, files, created_at } = submission;

  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="mb-5 rounded-[10px] bg-white shadow-fb-one">
      <div className="flex flex-wrap items-center justify-between p-3.5">
        <div className="flex items-center">
          <div className="mr-5">
            <label htmlFor={submissionID} className="select_all text-sm font-medium text-black">
              <input type="checkbox" name={submissionID} id={submissionID} className="sr-only" />
              <span className="flex h-5 w-5 items-center justify-center rounded-md border border-fb-gray-4 bg-fb-gray">
                <span className="icon">
                  <svg width="10" height="8" viewBox="0 0 10 8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.70643 0.792787C9.8939 0.980314 9.99922 1.23462 9.99922 1.49979C9.99922 1.76495 9.8939 2.01926 9.70643 2.20679L4.70643 7.20679C4.5189 7.39426 4.2646 7.49957 3.99943 7.49957C3.73427 7.49957 3.47996 7.39426 3.29243 7.20679L0.292431 4.20679C0.110272 4.01818 0.00947813 3.76558 0.0117566 3.50339C0.014035 3.24119 0.119204 2.99038 0.304612 2.80497C0.49002 2.61956 0.740832 2.51439 1.00303 2.51211C1.26523 2.50983 1.51783 2.61063 1.70643 2.79279L3.99943 5.08579L8.29243 0.792787C8.47996 0.605316 8.73427 0.5 8.99943 0.5C9.2646 0.5 9.5189 0.605316 9.70643 0.792787Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </span>
            </label>
          </div>
          <p className="mr-8 items-center text-sm font-normal text-black sm:flex md:mr-[60px]">
            {fields?.email ? (
              <>
                <span className="block pr-2 text-body-color">Email:</span>
                {fields.email}
              </>
            ) : (
              Object.keys(fields).length > 0 && (
                <>
                  <span className="block pr-2 text-body-color capitalize">
                    {Object.keys(fields)[0]}:
                  </span>
                  <span>
                    {fields[Object.keys(fields)[0]].length > 40
                      ? `${fields[Object.keys(fields)[0]].slice(0, 40)}...`
                      : fields[Object.keys(fields)[0]]}
                  </span>
                </>
              )
            )}
          </p>
          <p className="items-center text-sm font-normal text-body-color sm:flex">
            <span className="block pr-2 text-body-color">Date:</span>
            {created_at && moment(created_at).format("MMM DD YYYY, h:mm:ss A")}
          </p>
        </div>
        <div className="flex items-center justify-end">
          {/* {isSpam ? (
            <span className="flex h-[22px] items-center justify-center rounded-3xl bg-orange-light-6 px-2.5 text-xs font-medium text-fb-orange">Spam</span>
          ) : (
            <span className="flex h-[22px] items-center justify-center rounded-3xl bg-fb-gray px-2.5 text-xs font-medium text-primary">New</span>
          )} */}
          <button onClick={() => setShowDetails(!showDetails)} className="ml-4 flex items-center justify-center rounded-md bg-fb-gray p-2 pl-3 text-sm font-medium text-body-color">
            View Details
            <span className={`pl-2.5`}>
              <svg width="18" height="18" viewBox="0 0 18 18" className={`${showDetails ? "rotate-180" : "rotate-0"}`}>
                <path
                  d="M9.2778 11.8764L14.1001 6.9035C14.401 6.5932 14.2186 6 13.8223 6L4.17773 6C3.78142 6 3.59902 6.5932 3.89992 6.9035L8.72219 11.8764C8.88205 12.0412 9.11795 12.0412 9.2778 11.8764Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateRows: `${showDetails ? "1fr" : "0fr"}`,
          transition: "grid-template-rows 300ms",
        }}
      >
        <div className={`overflow-hidden`}>
          <div className="border-t border-stroke p-6">
            {!isEmpty(fields) &&
              Object.keys(fields).map((key, index) => (
                <div key={index} className="mb-5">
                  <p className="mb-1 text-sm font-normal text-body-color">{key}:</p>

                  <p className="text-sm font-normal text-black">{fields[key]}</p>
                </div>
              ))}
            {!isEmpty(files) &&
              Object.keys(files).map((key, index) => (
                <React.Fragment key={index}>
                  <p className="mb-2 mt-5 text-xl font-medium">Attached files</p>
                  <div key={index} className="mb-5">
                    <p className="mb-1 text-sm font-normal text-body-color">{key}:</p>
                    <p className="text-sm font-normal text-black">
                      {isArray(files[key]) && !isEmpty(files[key]) ? (
                        files[key].map((item, index) => (
                          <>
                            <a target="_blank" href={item.url}>
                              {item.name}
                            </a>
                            {files[key].length - 1 !== index && <br />}
                          </>
                        ))
                      ) : (
                        <a target="_blank" href={files[key].url}>
                          {files[key].name}
                        </a>
                      )}
                    </p>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSubmission;
