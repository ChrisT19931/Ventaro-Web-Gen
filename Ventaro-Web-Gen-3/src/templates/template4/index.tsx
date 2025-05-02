import React from 'react';

const Template4 = ({ headline, subtext, buttonText }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold">{headline}</h1>
      <p className="text-lg mt-2">{subtext}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {buttonText}
      </button>
    </div>
  );
};

export default Template4;