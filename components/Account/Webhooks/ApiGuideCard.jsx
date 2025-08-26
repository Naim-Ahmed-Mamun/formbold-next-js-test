import React from "react";
import CopyButton from "../CopyButton";

const ApiGuideCard = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-2 font-heading text-[22px] font-bold text-black">API Guide</h3>
      <p className="mb-7.5 text-sm text-body-color">
        Learn how to use FormBold&apos;s API to access your form submissions programmatically.
      </p>

      <div className="mb-8">
        <h4 className="mb-4 font-heading text-lg font-medium text-black">Base URL</h4>
        <div className="group relative">
          <CopyButton code="https://api.formbold.com" showIconOnly className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <pre className="mb-4 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
            <code>https://api.formbold.com</code>
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="mb-4 font-heading text-lg font-medium text-black">Authentication</h4>
        <p className="mb-4 text-sm text-body-color">
          All API requests require authentication using a Bearer token. Include your token in the Authorization header:
        </p>
        <div className="group relative">
          <CopyButton code="Authorization: Bearer YOUR_TOKEN" showIconOnly className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <pre className="mb-4 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
            <code>Authorization: Bearer YOUR_TOKEN</code>
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="mb-4 font-heading text-lg font-medium text-black">Endpoints</h4>
        
        <div className="mb-6">
          <h5 className="mb-2 font-heading text-base font-medium text-black">Get All Submissions</h5>
          <p className="mb-4 text-sm text-body-color">
            Retrieve all submissions for a specific form:
          </p>
          <div className="group relative">
            <CopyButton code="/api/forms/formId/submissions?all=true" showIconOnly className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <pre className="mb-4 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
              <code>GET /api/forms/formId/submissions?all=true</code>
            </pre>
          </div>
        </div>

        <div className="mb-6">
          <h5 className="mb-2 font-heading text-base font-medium text-black">Get Paginated Submissions</h5>
          <p className="mb-4 text-sm text-body-color">
            Retrieve submissions with pagination:
          </p>
          <div className="group relative">
            <CopyButton code="/api/forms/formId/submissions?page=1&limit=10" showIconOnly className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <pre className="mb-4 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
              <code>GET /api/forms/formId/submissions?page=1&limit=10</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="mb-4 font-heading text-lg font-medium text-black">Response Format</h4>
        <p className="mb-4 text-sm text-body-color">
          The API returns JSON responses in the following format:
        </p>
        <div className="group relative">
          <CopyButton code={`{\n  \"data\": [\n    {\n      \"created_at\": \"2024-03-14T04:41:39.000000Z\",\n      \"fields\": {\n        \"email\": \"example@email.com\",\n        \"message\": \"Test message\"\n      },\n      \"files\": [],\n      \"is_spam\": false\n    }\n  ],\n  \"meta\": {\n    \"pagination\": {\n      \"count\": 1,\n      \"current_page\": 1,\n      \"per_page\": 25,\n      \"total\": 1,\n      \"total_pages\": 1\n    }\n  }\n}`} showIconOnly className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <pre className="mb-4 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
            <code>{`{
  "data": [
    {
      "created_at": "2024-03-14T04:41:39.000000Z",
      "fields": {
        "email": "example@email.com",
        "message": "Test message"
      },
      "files": [],
      "is_spam": false
    }
  ],
  "meta": {
    "pagination": {
      "count": 1,
      "current_page": 1,
      "per_page": 25,
      "total": 1,
      "total_pages": 1
    }
  }
}`}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <a
          href="https://formbold.com/docs/webhooks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-primary px-5 py-2 font-heading text-base font-medium text-white shadow transition hover:bg-primary/90"
        >
          More Details
          <svg className="ml-2" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8h8m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  );
};

export default ApiGuideCard; 