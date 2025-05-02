import React from "react";

interface Template4Props {
  headline?: string;
  subtext?: string;
  buttonText?: string;
}

const Template4: React.FC<Template4Props> = ({
  headline = "Welcome to Template 4",
  subtext = "This is a card layout with a warm color theme.",
  buttonText = "Get Started",
}) => {
  return (
    <main className="min-h-screen bg-red-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-red-600">{headline}</h1>
        <p className="text-gray-700 mb-6">{subtext}</p>
        <button className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white font-medium">
          {buttonText}
        </button>
      </div>
    </main>
  );
};

export default Template4;