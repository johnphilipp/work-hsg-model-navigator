const ModelResultsSideBar = ({
  categories,
  handleCheckboxChange,
  selectedCategories,
}) => {
  return (
    <div>
      {categories.map((category) => {
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
            <span class="flex-1 ml-3 whitespace-nowrap">{category}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ModelResultsSideBar;
