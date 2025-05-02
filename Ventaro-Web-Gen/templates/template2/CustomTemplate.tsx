import React from "react";

interface CustomTemplateProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
}

const CustomTemplate: React.FC<CustomTemplateProps> = ({
  headline = "Build Your Next Project",
  subtext = "Launch faster with this clean business-focused template.",
  ctaText = "Get Started",
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-black mb-4">{headline}</h1>
      <p className="text-lg text-gray-600 mb-6">{subtext}</p>
      <button className="bg-blue-600 text-white hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium">
        {ctaText}
      </button>
    </div>
  );
};

export default CustomTemplate;