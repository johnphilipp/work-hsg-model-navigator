import React, { useState } from "react";

const StableDiffusionForm = ({
  runResponse,
  setRunResponse,
  runResponseIsLoading,
  setRunResponseIsLoading,
}) => {
  const [formData, setFormData] = useState({
    prompt: "", // str,
    negative_prompt: "", // optional str (default None),
    number: 3, // int between 1 and 8, (3 default),
    number_of_steps: 50, // optional int between 1 and 50 (50 default),
    seed: 1, // int of the random seed
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRunResponseIsLoading(true);

    fetch(process.env.REACT_APP_MODEL_SD_RUN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_API_AUTH,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setRunResponseIsLoading(false);
        setRunResponse(data);
      })
      .catch((error) => {
        setRunResponseIsLoading(false);
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
        <label
          htmlFor="prompt"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Prompt
        </label>
        <textarea
          type="text"
          rows="3"
          name="prompt"
          id="prompt"
          className="resize-y block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.prompt}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="negative_prompt"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Negative Prompt (optional)
        </label>
        <input
          type="text"
          name="negative_prompt"
          id="negative_prompt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.negative_prompt}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number (1-8)
        </label>
        <input
          type="number"
          name="number"
          id="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.number}
          onChange={handleChange}
          min="1"
          max="8"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="number_of_steps"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number of Steps (1-50, optional)
        </label>
        <input
          type="number"
          name="number_of_steps"
          id="number_of_steps"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.number_of_steps}
          onChange={handleChange}
          min="1"
          max="50"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="seed"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Seed (int)
        </label>
        <input
          type="number"
          name="seed"
          id="seed"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.seed}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {runResponseIsLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default StableDiffusionForm;
