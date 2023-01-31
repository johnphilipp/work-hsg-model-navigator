const ModelResultsSideBar = ({
  checkboxCategories,
  modelList,
  handleCheckboxChange,
  selectedCategories,
}) => {
  return (
    <div>
      {checkboxCategories.map((category) => {
        const categoryModels = modelList.find(
          (cat) => cat.category === category
        ).models;
        const totalModels = categoryModels.reduce((acc, curr) => acc + 1, 0);
        const Icon = modelList.find((cat) => cat.category === category).icon;
        return (
          <label
            key={category}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                value={category}
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(category)}
              />
            </div>
            <Icon
              className="ml-4 flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
            />
            <span class="flex-1 ml-3 whitespace-nowrap">{category}</span>
            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {totalModels}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default ModelResultsSideBar;
