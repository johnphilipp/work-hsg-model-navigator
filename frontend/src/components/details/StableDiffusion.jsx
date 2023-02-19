import React, { useState } from "react";
import Spinner from "../Spinner";
import StableDiffusionForm from "./StableDiffusionForm";
import StableDiffusionResult from "./StableDiffusionResult";

const StableDiffusion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadResponse, setLoadResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loadIsComplete, setLoadIsComplete] = useState(false);
  const [runResponse, setRunResponse] = useState([]);
  const [runResponseIsLoading, setRunResponseIsLoading] = useState(false);

  const handleButtonClick = () => {
    console.log(process.env.REACT_APP_API_AUTH);
    console.log(process.env.REACT_APP_MODEL_SD_LOAD_URL);

    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", process.env.REACT_APP_API_AUTH);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_MODEL_SD_LOAD_URL, requestOptions)
      .then((response) => {
        console.log("loadModel", response);
        response.json();
      })
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
    <>
      {loadIsComplete ? (
        <div className="md:grid grid-cols-3 gap-4">
          <div className="shadow bg-slate-200 p-4 rounded-lg">
            <StableDiffusionForm
              runResponse={runResponse}
              setRunResponse={setRunResponse}
              runResponseIsLoading={runResponseIsLoading}
              setRunResponseIsLoading={setRunResponseIsLoading}
            />
          </div>
          <div className="col-span-2">
            <StableDiffusionResult
              runResponse={runResponse}
              runResponseIsLoading={runResponseIsLoading}
            />
          </div>
        </div>
      ) : (
        <div className="shadow flex h-96 bg-slate-200 rounded-lg">
          <div className="m-auto">
            {!isLoading && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
    </>
  );
};

export default StableDiffusion;
