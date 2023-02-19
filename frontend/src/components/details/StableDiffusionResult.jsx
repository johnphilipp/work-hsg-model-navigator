import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";
import Alert from "../Alert";

const StableDiffusionResult = ({ runResponse, runResponseIsLoading }) => {
  useEffect(() => {
    console.log({ runResponse });
  }, [runResponse]);

  if (runResponseIsLoading) {
    return (
      <div className="mt-12 md:mt-0 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (runResponse.length === 0) {
    return <Alert msg={"No results"} />;
  }

  return (
    <>
      <div className="italic mt-6 md:mt-2 block mb-2 text-lg font-light text-gray-900 dark:text-white">
        {'"'}
        {runResponse.prompt}
        {'"'}
        <hr className="mt-2 mb-4" />
      </div>
      <div className="md:columns-3">
        {runResponse.images.map((image, index) => (
          <img
            key={index}
            className="w-full mb-4 max-w-xs h-auto rounded-md shadow-md"
            src={`data:image/png;base64,${image}`}
          />
        ))}
      </div>
    </>
  );
};

export default StableDiffusionResult;
