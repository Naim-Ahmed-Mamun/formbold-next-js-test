import React from "react";

const paginationPerPageArr = [
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 20, value: 20 },
  { label: 25, value: 25 },
];

const SubmissionsPagination = ({
  handelPerPageChange,
  pagination,
  handelPageChange,
}) => {
  return (
    <>
      <div className="mb-12 flex w-full flex-wrap items-center justify-between">
        <div className="inline-flex items-center rounded-md bg-white px-3 py-1.5 shadow-fb-one">
          <span className="pr-2.5 text-sm font-normal text-black">Show</span>

          <div className="relative flex h-7 items-center rounded-md border border-stroke px-2.5 text-sm font-normal text-black">
            <select
              onChange={(e) => handelPerPageChange(e, e.target.value)}
              value={pagination.perPage}
              className="relative z-10 appearance-none pr-[18px] outline-none"
            >
              {paginationPerPageArr.map((perPage,index) => (
                <option
                  key={index}
                  value={perPage?.value}
                >
                  {perPage?.label}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1852 7.91757L9.40005 4.60233C9.60065 4.39547 9.47906 4 9.21485 4L2.78515 4C2.52094 4 2.39935 4.39547 2.59995 4.60233L5.8148 7.91757C5.92137 8.02748 6.07863 8.02748 6.1852 7.91757Z"
                  fill="#6C6F93"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center rounded-md bg-white p-1.5 shadow-fb-one">
          <button
            onClick={(e) => handelPageChange(e, pagination?.currentPage - 1)}
            disabled={pagination?.currentPage === 1}
            className={`inline-flex h-[30px] items-center rounded-md px-2.5 text-sm font-medium ${
              pagination?.currentPage === 1
                ? "text-body-color/70"
                : "text-black hover:bg-fb-gray"
            }`}
          >
            <span className="pr-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.47266 12.534C9.34141 12.534 9.21016 12.4902 9.12266 12.3809L4.17891 7.34961C3.98203 7.15273 3.98203 6.84648 4.17891 6.64961L9.12266 1.61836C9.31953 1.42148 9.62578 1.42148 9.82266 1.61836C10.0195 1.81523 10.0195 2.12148 9.82266 2.31836L5.22891 6.99961L9.84453 11.6809C10.0414 11.8777 10.0414 12.184 9.84453 12.3809C9.71328 12.4684 9.60391 12.534 9.47266 12.534Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Prev
          </button>
          <p className="inline-flex h-[30px] items-center rounded-md px-2.5 text-sm font-medium text-black">
            Page: {pagination?.currentPage} / {pagination?.lastPage}
          </p>
          <button
            onClick={(e) => handelPageChange(e, pagination?.currentPage + 1)}
            disabled={pagination?.currentPage === pagination?.lastPage}
            className={`inline-flex h-[30px] items-center rounded-md px-2.5 text-sm font-medium ${
              pagination?.currentPage === pagination?.lastPage
                ? "text-body-color/70"
                : "text-black hover:bg-fb-gray"
            }`}
          >
            Next
            <span className="pl-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.52891 12.534C4.39766 12.534 4.28828 12.4902 4.17891 12.4027C3.98203 12.2059 3.98203 11.8996 4.17891 11.7027L8.77266 6.99961L4.17891 2.31836C3.98203 2.12148 3.98203 1.81523 4.17891 1.61836C4.37578 1.42148 4.68203 1.42148 4.87891 1.61836L9.82266 6.64961C10.0195 6.84648 10.0195 7.15273 9.82266 7.34961L4.87891 12.3809C4.79141 12.4684 4.66016 12.534 4.52891 12.534Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmissionsPagination;
