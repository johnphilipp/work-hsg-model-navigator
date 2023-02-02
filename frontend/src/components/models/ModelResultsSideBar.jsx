import Alert from "../Alert";

const ModelResultsSideBar = ({
  categories,
  handleCheckboxChange,
  selectedCategories,
}) => {
  if (categories.length === 0)
    return <Alert msg={"Could not fetch categories. Server down?"} />;
  return (
    <div>
      {categories.map((category) => {
        return (
          <label
            key={category.name}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                value={category.name}
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(category.name)}
              />
            </div>
            <img
              class="ml-3 w-6 h-6 rounded-full"
              src={category.imgUrl}
              alt="Rounded avatar"
            />
            <span class="flex-1 ml-3 whitespace-nowrap">{category.name}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ModelResultsSideBar;
