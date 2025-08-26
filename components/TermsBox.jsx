import React from "react";
import SectionTitleH1 from "./SectionTitleH1";

export default function TermBox() {
  return (
    <section className="pb-12 pt-24 sm:pt-32 md:pb-16 lg:pt-[140px]">
      <div className="container">
        <div className="mx-auto w-full max-w-[770px]">
          <SectionTitleH1
            title="Terms of Service"
            paragraph="Before sign you up to FormBold & using our products and services make sure you read, understood and agreed all of our terms. By using our service, you’ve accepted the terms of use given below."
            center
            paraWidth="770"
          />

          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-black md:text-3xl">
              User Data:{" "}
            </h3>
            <p className="mb-6 mt-6">
              All of our registered users informations ( Name and Email ) are
              secure to us. We are committed to take caring of information and
              we are promised to our customers that we are never going to share
              their information with anyone. You can check out detailed
              explanation of privacy policy from Privacy Policy.
            </p>
            <h3 className="mb-6 text-2xl font-bold text-black md:text-3xl">
              Form Attachments:{" "}
            </h3>
            <p className="mb-6 mt-6">
            Files that are uploaded via the form are securely stored on a separate server, utilizing a token-based authentication system. Furthermore, these files are automatically deleted 30 days after their upload/submission.
            </p>
            <h3 className="mb-6 mt-6 text-2xl font-bold text-black md:text-3xl">
              Payment and Card Processing:{" "}
            </h3>
            <p className="mb-6 mt-6">
              Our order process is conducted by our online reseller Paddle.com.
              Paddle.com is the Merchant of Record for all our orders. Paddle
              provides all customer service inquiries and handles returns. We do
              not store any credit card information in server, all payments are
              processed by world leading payment gateways and our site is
              secured by SSL encryption.
            </p>
            <h3 className="mb-6 mt-6 text-2xl font-bold text-black md:text-3xl">
              Support:{" "}
            </h3>
            <p className="mb-6 mt-6">
              If anyone have any problem with our products are welcome to our
              support to ask for help. We try to answer the questions as first
              as possible. Be specific and tell as much details as you can.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
