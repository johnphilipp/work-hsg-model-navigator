const ModelResultsMain = ({ filteredModelList }) => {
  return (
    <div>
      {filteredModelList.map((item, index) => (
        <li key={item.category}>
          <ul>
            {item.models.map((model) => (
              <label
                key={model.name}
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <li>{model.name}</li>
                <div
                  class="ml-4 font-medium p-1 flex text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  role="alert"
                >
                  {item.category}
                </div>
              </label>
            ))}
          </ul>
          {index !== filteredModelList.length - 1 && (
            <hr className="mb-4 mt-4" />
          )}
        </li>
      ))}
    </div>
  );
};

export default ModelResultsMain;
