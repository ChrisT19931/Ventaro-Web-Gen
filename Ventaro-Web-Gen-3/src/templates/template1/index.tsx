import React from 'react';

const Template1 = ({ headline, subtext, buttonText }) => {
  return (
    <div className="p-5 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white">{headline}</h1>
      <p className="text-lg text-gray-300">{subtext}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {buttonText}
      </button>
    </div>
  );
};

export default Template1;