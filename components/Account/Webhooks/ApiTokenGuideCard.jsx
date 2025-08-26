import React from "react";
import CopyButton from "../CopyButton";

const ApiTokenGuideCard = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
      <h3 className="mb-3 font-heading text-[22px] font-bold text-black">API Token Guide</h3>
      <p className="mb-7 text-sm text-body-color">
        API tokens authenticate your requests to FormBold’s API. Treat tokens like passwords —
        keep them secret and never share them publicly.
      </p>

      {/* Why Section */}
      <div className="mb-8">
        <h4 className="mb-3 font-heading text-lg font-medium text-black">Why use API Tokens?</h4>
        <p className="text-sm text-body-color">
          API tokens allow secure, programmatic access to your forms and submissions without
          needing your account credentials. They make it easy to:
        </p>
        <ul className="mt-3 list-disc pl-6 text-sm text-body-color">
          <li>Connect FormBold with your own apps and services.</li>
          <li>Automate workflows by sending data to your backend.</li>
          <li>Integrate with third-party tools like Zapier, Slack, or Google Sheets.</li>
          <li>Keep your account login details safe and private.</li>
        </ul>
      </div>

      {/* Create Section */}
      <div className="mb-8">
        <h4 className="mb-3 font-heading text-lg font-medium text-black">1. Create a Token</h4>
        <p className="text-sm text-body-color">
          Use the <b>Create Token</b> form to generate a new API token. Each token is unique and
          can be revoked anytime.
        </p>
      </div>

      {/* Usage Section */}
      <div className="mb-8">
        <h4 className="mb-3 font-heading text-lg font-medium text-black">2. Use Your Token</h4>
        <p className="mb-3 text-sm text-body-color">
          Add your token to the <code>Authorization</code> header in API requests:
        </p>
        <div className="group relative">
          <CopyButton
            code="Authorization: Bearer YOUR_TOKEN"
            showIconOnly
            className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <pre className="overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
            <code>Authorization: Bearer YOUR_TOKEN</code>
          </pre>
        </div>
        <p className="mt-2 text-xs text-body-color">Example:</p>
        <pre className="mt-1 overflow-x-auto rounded-lg bg-fb-gray p-4 text-sm">
          <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
https://api.formbold.com/v1/forms`}</code>
        </pre>
      </div>

      {/* Revoke Section */}
      <div className="mb-8">
        <h4 className="mb-3 font-heading text-lg font-medium text-black">3. Revoke a Token</h4>
        <p className="text-sm text-body-color">
          If a token is exposed or no longer needed, revoke it from the token list.
          Revoked tokens stop working immediately.
        </p>
      </div>

      {/* Security Note */}
      <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <b>Security Tip:</b> Never hard-code tokens in public code, and always use HTTPS.
      </div>

      {/* Docs Link */}
      <div className="mt-8 flex justify-end">
        <a
          href="https://formbold.com/docs/webhooks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-primary px-5 py-2 font-heading text-base font-medium text-white shadow transition hover:bg-primary/90"
        >
          Full Docs
          <svg
            className="ml-2"
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8h8m0 0-3-3m3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ApiTokenGuideCard;

