import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../components/Container";
import fetchModel from "../providers/fetchModel";
import Spinner from "../components/Spinner";
import StableDiffusion from "../components/details/StableDiffusion";
import Placeholder from "../components/details/Placeholder";

const Interface = (category) => {
  if (category === "Image Generation") {
    return <StableDiffusion />;
  } else {
    return <Placeholder />;
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
    <>
      <h2 className="mb-4 font-light text-2xl">{model.name}</h2>
      <div className="mb-6 overflow-hidden bg-white shadow rounded-lg">
        <div className="border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {model.category}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Version</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {model.version}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {model.status}
                <span className={statusClass(model.status)}> </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Date created
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Mar 14, 2022
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last used</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Feb 19, 2023
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {model.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div>{Interface(model.category)}</div>
    </>
  );
};

export default Details;
