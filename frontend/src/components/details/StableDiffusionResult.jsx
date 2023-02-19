import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";

const StableDiffusionResult = ({ runResponse, runResponseIsLoading }) => {
  useEffect(() => {
    console.log({ runResponse });
  }, [runResponse]);

  if (runResponseIsLoading) {
    return <Spinner />;
  }

  if (runResponse.length === 0) {
    return <div>No results</div>;
  }

  return (
    <>
      {runResponse.prompt}
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
