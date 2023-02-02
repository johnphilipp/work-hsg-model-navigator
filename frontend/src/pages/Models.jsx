import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { AiOutlineAudio, AiOutlinePicture } from "react-icons/ai";
import { FaRegObjectGroup } from "react-icons/fa";
import ModelResultsSideBar from "../components/models/ModelResultsSideBar";
import ModelResultsMain from "../components/models/ModelResultsMain";
import fetchCategories from "../providers/fetchCategories";
import fetchModels from "../providers/fetchModels";

// TODO: Persist state when page changes -- check out Frontend Masters section again with custom hook
// TODO: Fix modile sidebar view

const Models = () => {
  const resultsCategories = useQuery(["categories"], fetchCategories);
  const categories = resultsCategories?.data?.categories ?? [];
  console.log({ categories });

  const [selectedCategories, setSelectedCategories] = useState([]); // "categories" how to have them set at first render??
  console.log({ selectedCategories });

  const resultsModels = useQuery(["models", selectedCategories], fetchModels);
  const models = resultsModels?.data?.models ?? [];
  console.log({ models });

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      // delete
      setSelectedCategories(
        selectedCategories.filter((item) => item !== value)
      );
    } else {
      // add
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <Container>
      <h2 className="mb-4 font-light text-2xl">Models</h2>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <aside
            id="default-sidebar"
            class="mb-6 z-40 h-full transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2">
                <ModelResultsSideBar
                  categories={categories}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedCategories={selectedCategories}
                />
              </ul>
            </div>
          </aside>
        </div>

        <div class="mb-6 col-span-2">
          <div class="p-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="h-full overflow-y-auto">
              <ul className="space-y-2">
                <ModelResultsMain models={models} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Models;
