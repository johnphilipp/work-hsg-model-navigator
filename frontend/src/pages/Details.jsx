import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../components/Container";
import fetchModel from "../providers/fetchModel";
import Spinner from "../components/Spinner";
import InterfaceStableDiffusion from "../components/details/interfaceStableDiffusion";
import InterfacePlaceholder from "../components/details/interfacePlaceholder";

const Interface = (category) => {
  if (category === "Image Generation") {
    return <InterfaceStableDiffusion />;
  } else {
    return <InterfacePlaceholder />;
  }
};

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchModel);

  if (results.isLoading) {
    return (
      <Container>
        <h2 className="mb-4 font-light text-2xl">Details</h2>
        <Spinner />
      </Container>
    );
  }

  const model = results.data.model[0];

  const statusClass = (status) => {
    if (status === "available")
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-green-500 rounded-full";
    else if (status === "in use" || status === "deploying")
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-orange-300 rounded-full";
    else
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-red-600 rounded-full";
  };

  return (
    <Container>
      <h2 className="mb-4 font-light text-2xl">Details</h2>
      <div className="mb-2 rounded-lg dark:text-white">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="font-medium dark:text-white">{model.name}</div>
            <span className="ml-4 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
              v{model.version}
            </span>
            <div className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              {model.category}
            </div>
          </div>
          <div>
            <div className="ml-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400">
              <span className={statusClass(model.status)}> </span>
              {model.status}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Date created: Mar 14, 2022 ・ Last used: Feb 1, 2023
        </div>
      </div>
      <div className="mt-6 text-base font-normal text-gray-900">
        {model.description}
      </div>
      {Interface(model.category)}
    </Container>
  );
};

export default Details;
