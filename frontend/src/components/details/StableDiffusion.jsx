import React, { useState } from "react";
import StableDiffusionForm from "./StableDiffusionForm";
import Spinner from "../Spinner";
import StableDiffusionResult from "./StableDiffusionResult";

const StableDiffusion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadResponse, setLoadResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loadIsComplete, setLoadIsComplete] = useState(false);
  const [runResponse, setRunResponse] = useState([]);
  const [runResponseIsLoading, setRunResponseIsLoading] = useState(false);

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
        setLoadIsComplete(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <div className="flex items-center justify-center mt-6 mb-6 text-slate-400 bg-slate-100 rounded-md">
      {loadIsComplete ? (
        <div className="md:grid grid-cols-3">
          <div className="bg-slate-200 p-4">
            <StableDiffusionForm
              runResponse={runResponse}
              setRunResponse={setRunResponse}
              runResponseIsLoading={runResponseIsLoading}
              setRunResponseIsLoading={setRunResponseIsLoading}
            />
          </div>
          <div className="col-span-2 p-4">
            <StableDiffusionResult
              runResponse={runResponse}
              runResponseIsLoading={runResponseIsLoading}
            />
          </div>
        </div>
      ) : (
        <div class="flex h-96">
          <div class="m-auto">
            {!isLoading && (
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleButtonClick}
              >
                Load model
              </button>
            )}
            {isLoading && <Spinner />}
            {loadResponse && <div>Response: {loadResponse}</div>}
            {error && <div>Error: {error.message}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default StableDiffusion;
