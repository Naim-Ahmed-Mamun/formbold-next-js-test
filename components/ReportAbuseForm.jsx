"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import cn from '../utils/cn';
import SectionTitleH1 from "./SectionTitleH1";

// Define Zod schema for form validation
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email("Invalid email address"),
  formid: z.string().min(1, "Form ID is required"),
  message: z.string().min(1, "Message is required"),
});

export default function ReportAbuseForm() {
  const [formState, setFormState] = useState({
    fullName: "",
    emailAddress: "",
    formid: "",
    message: "",
    supportForm: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      // Validate form data with Zod
      formSchema.parse(formState);

      if(formState.supportForm !== "") {
        setStatus("success");
        setFormState({
          fullName: "",
          emailAddress: "",
          formid: "",
          message: "",
          supportForm: "",
        });
        toast.success("Form Submitted Successfully");
        setTimeout(() => {
          setStatus("idle");
        }, 10000);

        return;
      }

      const response = await fetch(`https://formbold.com/s/3LK8k`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState }),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({
          fullName: "",
          emailAddress: "",
          formid: "",
          message: "",
          supportForm: "",
        });
        toast.success("Form Submitted Successfully");
        setTimeout(() => {
          setStatus("idle");
        }, 10000);
      } else {
        const data = await response.json();
        setStatus("error");
        setErrors({
          message: data.message || "Submission failed. Please try again.",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        err.errors.forEach((e) => {
          errors[e.path[0]] = e.message;
        });
        setErrors(errors);
      } else {
        setErrors({ msg: "An unexpected error occurred. Please try again." });
      }
      setStatus("error");
    }
  };


  return (
    <section className="pb-24 pt-24 sm:pt-32 md:pb-28 lg:pt-[140px]">
      <div className="container">
        <div className="flex">
          <div className="w-full">
            <SectionTitleH1
              title="Report Abuse"
              paragraph="Report FormBold abuses to protect our platform and make you feel safe"
              paraWidth="550"
              center
              titleWidth="440"
              margin="mb-12"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="mx-auto w-full max-w-[570px] rounded-[22px] border border-fb-stroke bg-fb-gray p-7 sm:p-11">
              <form onSubmit={handleSubmit}>
                <input
                  id="supportForm"
                  type="hidden"
                  name="supportForm"
                  onChange={handleChange}
                  value={formState.supportForm}
                />
                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    value={formState.fullName}
                    placeholder="Enter your full name"
                    className={cn("flex h-[52px] w-full items-center rounded-[30px] border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:shadow-inputHover",
                      {
                        'border-red-500': errors.fullName,
                      }
                    )}
                  />
                  {
                    errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )
                  }
                </div>

                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    value={formState.emailAddress}
                    className={cn("flex h-[52px] w-full items-center rounded-[30px] border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:shadow-inputHover",
                      {
                        'border-red-500': errors.emailAddress,
                      }
                    )}
                  />
                  {errors.emailAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.emailAddress}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Form ID / URL
                  </label>
                  <input
                    type="text"
                    id="formid"
                    name="formid"
                    onChange={handleChange}
                    placeholder="Form ID / URL or Account Email You want to report"
                    value={formState.formid}
                    className={cn("flex h-[52px] w-full items-center rounded-[30px] border border-fb-gray-3 bg-white px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:shadow-inputHover",
                      {
                        'border-red-500': errors.formid,
                      }
                    )}
                  />
                  {
                    errors.formid && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.formid}
                      </p>
                    )
                  }
                </div>
                <div className="mb-5">
                  <label className="mb-2.5 block text-base font-medium text-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message here"
                    rows="6"
                    onChange={handleChange}
                    value={formState.message}
                    className={cn("flex w-full items-center rounded-[30px] border border-fb-gray-3 bg-white p-5 px-6 text-black placeholder-fb-dark-5 outline-none duration-300 focus:border-transparent focus:shadow-inputHover focus:ring-2 focus:ring-primary/20 hover:border-transparent hover:shadow-inputHover",
                      {
                        "border-red-500": errors.message
                      }
                    )}
                  />
                  {
                    errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )
                  }
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className={`mb-6 h-[52px] rounded-full bg-primary px-4 text-base font-medium text-white w-[190px] duration-300 hover:bg-fb-primary-hover inline-flex items-center justify-center ${status === "loading" ? "pointer-events-none opacity-90" : ""}`}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className='w-5 h-5 bg-transparent border-2 border-white rounded-full border-t-transparent block animate-spin' />
                      ) : (
                        "Send Message"
                    )}
                  </button>
                </div>
                <div className="w-full">
                  {status === "success" && (
                    <div className="mt-3 text-base text-green-600">
                      Message sent successfully!
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
