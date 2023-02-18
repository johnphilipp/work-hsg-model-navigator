import React, { useState } from "react";

const InterfaceStableDiffusionForm = ({ runResponse, setRunResponse }) => {
  const [formData, setFormData] = useState({
    prompt: "",
    negative_prompt: null,
    number: 3,
    number_of_steps: 50,
    seed: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:8000/runModel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer daGoveitgididNeltifwoylchISlith5",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setRunResponse(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  const responseImage =
    runResponse !== "Please submit form" &&
    runResponse !== "An error occurred. Please try again later." ? (
      <img src={`data:image/png;base64,${runResponse}`} alt="Generated image" />
    ) : (
      runResponse
    );

  const errorDiv = error && (
    <div>
      <p>Error: {error.message}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
        <label htmlFor="prompt" className="mb-2 font-bold text-md">
          Prompt
        </label>
        <input
          type="text"
          name="prompt"
          id="prompt"
          className="border-2 border-gray-400 p-2 w-full"
          value={formData.prompt}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="negative_prompt" className="mb-2 font-bold text-md">
          Negative Prompt (optional)
        </label>
        <input
          type="text"
          name="negative_prompt"
          id="negative_prompt"
          className="border-2 border-gray-400 p-2 w-full"
          value={formData.negative_prompt}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="number" className="mb-2 font-bold text-md">
          Number (1-8)
        </label>
        <input
          type="number"
          name="number"
          id="number"
          className="border-2 border-gray-400 p-2 w-full"
          value={formData.number}
          onChange={handleChange}
          min="1"
          max="8"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="number_of_steps" className="mb-2 font-bold text-md">
          Number of Steps (1-50, optional)
        </label>
        <input
          type="number"
          name="number_of_steps"
          id="number_of_steps"
          className="border-2 border-gray-400 p-2 w-full"
          value={formData.number_of_steps}
          onChange={handleChange}
          min="1"
          max="50"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="seed" className="mb-2 font-bold text-md">
          Seed (int)
        </label>
        <input
          type="number"
          name="seed"
          id="seed"
          className="border-2 border-gray-400 p-2 w-full"
          value={formData.seed}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default InterfaceStableDiffusionForm;
