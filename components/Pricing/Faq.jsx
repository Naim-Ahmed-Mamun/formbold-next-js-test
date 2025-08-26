import SectionTitle from "../SectionTitle";

export default function Faq() {
  return (
    <section id='faq' className="scroll-mt-24">
      <div className="container">
        <SectionTitle
          title="Frequently Asked Questions"
          paragraph="Answered all frequently asked questions, if you are still confused
              please open a support ticket. We will get back to you ASAP."
          paraWidth="570"
          center
          margin="mb-12"
        />

        <div className="relative rounded-[22px] border border-fb-gray-3 bg-white py-[60px] shadow-fb-two">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-fb-gray-3 lg:block"></div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <div className="px-7 sm:px-[60px] lg:px-10 2xl:px-[60px]">
                <FaqItem
                  question="Can I cancel anytime?"
                  answer="Yes, you can cancel your membership anytime you want. You will get membership management page from billing page after login."
                />
                <FaqItem
                  question="Can FormBold see my form submission data?"
                  answer="No. All emails and message data are end-to-end encrypted, we can't see your form submission data."
                />
                <FaqItem
                  question="What are the submissions?"
                  answer="Submission means the number of times you can receive the valid submission of forms API created from FormBold account."
                />
                <FaqItem
                  question="How I can get future updates?"
                  answer="As long as you have an active membership with us. You will receive free updates, and new apps and integrations will be automatically available under your account."
                />
                <FaqItem
                  question="Can I use free plan for commercial purpose?"
                  answer="Yes, you can use a free plan for commercial projects forever!. As long as you are not abusing our service and agreed to terms, you have no worries."
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="px-7 sm:px-[60px] lg:px-10 2xl:px-[60px]">
                <FaqItem
                  question="What if I have a team? Can I share my account?"
                  answer="Yes, you can. We recommend teams to use the Business plan so, you will not hit the submission and form limit very soon. And try to use a team email such as team@site.com so, it is easier to share."
                />
                <FaqItem
                  question="How I can protect Forms from Spam and Bots?"
                  answer="You can easily protect FormBold forms from spam submissions with a few clicks from form settings, we also have detailed a guideline and a video tutorial on spam protection. Please, visit the docs page and choose spam protection"
                />
                <FaqItem
                  question="Do you provide support?"
                  answer="Yes. Support is provided to all our customers. Please open a support ticket by describing your issue, we will get back to you within 24hrs."
                />

                <FaqItem
                  question="Is Formbold well-documented?"
                  answer="Indeed. we created an entirely separate portal for docs you can access from: formbold.com/docs if you find anything that is not available on the documentation page. Please, feel free to submit a ticket we will get back to you with a solution."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FaqItem = ({ question, answer }) => {
  return (
    <div className="mb-9 last:mb-0">
      <h3 className="mb-5 font-heading text-xl font-bold text-black">
        {question}
      </h3>
      <p className="text-base leading-[24px] text-body-color">{answer}</p>
    </div>
  );
};
