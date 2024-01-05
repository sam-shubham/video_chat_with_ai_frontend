import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [policyArray, setpolicyArray] = useState([
    {
      title: "Introduction",
      desc: `At 24justice.com, a service provided by 24Justice, we are committed to protecting your privacy and handling your data openly and transparently. This policy outlines how we collect, use, store, and protect your personal information in compliance with the General Data Protection Regulation (GDPR).`,
    },
    {
      title: "Data Collection",
      desc: `We collect personal information that you provide when using our website, such as your name, email address, and any other information you choose to provide in the "Talk to Our Consultant" form. Additionally, we automatically collect certain data through your use of our website, such as IP address, browser type, and usage data.`,
    },
    {
      title: "Use of Cookies",
      desc: `Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us improve our site and your experience on it. We use both session cookies (which expire once you close your browser) and persistent cookies (which stay on your device for a set period or until you delete them).`,
    },
    {
      title: "Purpose of Data Processing",
      desc: `The data we collect is used to provide our AI-driven legal advice service, improve website functionality, and understand user behavior for analytical purposes. We also use your information to respond to your inquiries and provide customer support.`,
    },
    {
      title: "Data Sharing and Transfer",
      desc: `We do not sell or rent your personal data to third parties. However, we may share your data with trusted third parties that provide services on our behalf, such as website hosting and analytics. Any data transfer outside of the European Economic Area (EEA) is carried out in compliance with GDPR regulations.`,
    },
    {
      title: "Data Security",
      desc: `We implement appropriate technical and organizational measures to ensure the security of your personal data and protect it against unauthorized or unlawful processing, accidental loss, destruction, or damage.`,
    },
    {
      title: "Your Rights",
      desc: `Under the GDPR, you have the right to access, rectify, erase, restrict processing of your data, or object to data processing. You also have the right to data portability and the right to lodge a complaint with a supervisory authority.`,
    },
    {
      title: "Changes to This Policy",
      desc: `We may update this policy from time to time. We will notify you of any significant changes and indicate at the top of the policy when it was most recently updated.`,
    },
    {
      title: "Contact Us",
      desc: `If you have any questions about this policy or our data practices, please contact us at 00923085510031.`,
    },
  ]);
  return (
    <div>
      <div className="p-[1.5rem] pt-[5rem]  overflow-y-scroll h-[100vh]">
        <h3
          className="text-4xl text-bold text-[#DBBE67]"
          style={{ fontFamily: "rubik" }}
        >
          GDPR Cookies and Privacy Policy
        </h3>
        <div className="mt-[0.2rem] pb-[5rem]">
          <div className="overflow-y-auto ">
            <h3
              className="whitespace-break-spaces text-slate-200"
              style={{ fontFamily: "Josefin Sans" }}
            >
              {`Welcome to 24justice.com, an experimental AI-driven platform designed to offer general legal advice. This service is provided by 24Justice.`}
            </h3>
            {policyArray.map((el) => (
              <div className="flex flex-col gap-[0.3rem] mt-[2rem]">
                <h3
                  className="text-xl text-semibold"
                  style={{ fontFamily: "rubik" }}
                >
                  {el.title}
                </h3>
                <h3
                  className="whitespace-break-spaces text-slate-200"
                  style={{ fontFamily: "Lato" }}
                >
                  {el.desc}
                </h3>
              </div>
            ))}
            <h3
              className="whitespace-break-spaces mt-[1rem] text-slate-200"
              style={{ fontFamily: "Lato" }}
            >
              {`By using our website, you consent to our GDPR Cookies and Privacy Policy.`}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
