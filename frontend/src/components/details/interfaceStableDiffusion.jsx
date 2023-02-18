import React, { useState } from "react";
import InterfaceStableDiffusionForm from "./interfaceStableDiffusionForm";
import Spinner from "../Spinner";
import InterfaceStableDiffusionResult from "./interfaceStableDiffusionResult";

const InterfaceStableDiffusion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadResponse, setLoadResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [runResponse, setRunResponse] = useState([]);

  const handleButtonClick = () => {
    setIsLoading(true);

    fetch("http://localhost:8000/loadModel", {
      method: "POST",
      headers: {
        Authorization: "Bearer daGoveitgididNeltifwoylchISlith5",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setLoadResponse(data);
        setIsComplete(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <div className="flex items-center justify-center mt-6 mb-6 min-h-80 text-slate-400 bg-slate-100 rounded-md">
      {!isComplete ? (
        <>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleButtonClick}
          >
            Load model
          </button>
          {isLoading && <Spinner />}
          {loadResponse && <div>Response: {loadResponse}</div>}
          {error && <div>Error: {error.message}</div>}
        </>
      ) : (
        <div className="flex flex-row space-x-4 p-4">
          <div className="flex-1">
            <InterfaceStableDiffusionForm
              runResponse={runResponse}
              setRunResponse={setRunResponse}
            />
          </div>
          <div className="flex-1">
            <InterfaceStableDiffusionResult
              runResponse={runResponse}
              setRunResponse={setRunResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InterfaceStableDiffusion;
