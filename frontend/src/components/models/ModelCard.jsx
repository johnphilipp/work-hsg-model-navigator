import { Link } from "react-router-dom";

const ModelCard = (props) => {
  const { category, id, name, version, status } = props;

  const statusClass = (status) => {
    if (status === "available")
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-green-500 rounded-full";
    else if (status === "in use" || status === "deploying")
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-orange-300 rounded-full";
    else
      return "mr-2 inline-flex items-center justify-center w-2 h-2 ml-2 text-xs font-semibold text-blue-800 bg-red-600 rounded-full";
  };

  return (
    <div className="p-2 mb-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      <Link to={`/details/${id}`}>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="font-medium dark:text-white">{name}</div>
            <span className="ml-4 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
              v{version}
            </span>
            <div className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              {category}
            </div>
          </div>
          <div>
            <div className="ml-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400">
              <span className={statusClass(status)}> </span>
              {status}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Date created: Mar 14, 2022 ・ Last used: Feb 1, 2023
        </div>
      </Link>
    </div>
  );
};

export default ModelCard;
