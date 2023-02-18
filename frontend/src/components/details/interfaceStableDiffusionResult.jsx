import React, { useState, useEffect } from "react";

const InterfaceStableDiffusionResult = ({ runResponse, setRunResponse }) => {
  useEffect(() => {
    console.log({ runResponse });
  }, [runResponse]);

  if (runResponse.length === 0) {
    return <div>No results</div>;
  }

  return (
    <>
      {runResponse.prompt}
      <div className="flex flex-wrap justify-center">
        {runResponse.images.length > 0 ? (
          runResponse.images.map((image, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2"
            >
              <img
                className="w-full max-w-xs h-auto rounded-md shadow-md"
                src={`data:image/png;base64,${image}`}
                alt={`image-${index}`}
              />
            </div>
          ))
        ) : (
          <>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
              <div className="bg-gray-200 h-64 rounded-md shadow-md"></div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
              <div className="bg-gray-200 h-64 rounded-md shadow-md"></div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
              <div className="bg-gray-200 h-64 rounded-md shadow-md"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InterfaceStableDiffusionResult;
