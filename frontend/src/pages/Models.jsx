import { Container } from "../components/Container";
import React, { useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { AiOutlineAudio, AiOutlinePicture } from "react-icons/ai";
import { FaRegObjectGroup } from "react-icons/fa";

const modelList = [
  {
    category: "LLMs",
    description: "",
    href: "#",
    icon: HiOutlineChatBubbleLeftRight,
    models: [
      {
        name: "LLM Model #1",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "LLM Model #2",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "LLM Model #3",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "LLM Model #4",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "LLM Model #5",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
    ],
  },
  {
    category: "Speech2Text",
    description: "",
    href: "#",
    icon: AiOutlineAudio,
    models: [
      {
        name: "Speech2Text Model #1",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "Speech2Text Model #2",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "Speech2Text Model #3",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
    ],
  },
  {
    category: "Image Generation",
    description: "",
    href: "#",
    icon: AiOutlinePicture,
    models: [
      {
        name: "Image Generation Model #1",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "Image Generation Model #2",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
    ],
  },
  {
    category: "Image Recognition",
    description: "",
    href: "#",
    icon: FaRegObjectGroup,
    models: [
      {
        name: "Image Recognition Model #1",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
      {
        name: "Image Recognition Model #2",
        description: "",
        href: "#",
        inUse: false,
        dateCreated: "",
        dateModified: "",
        numUsed: 42,
      },
    ],
  },
];

const Models = () => {
  const checkboxCategories = [
    ...new Set(modelList.map((category) => category.category)),
  ];
  const [selectedCategories, setSelectedCategories] =
    useState(checkboxCategories);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const filteredModelList = modelList.filter((category) => {
    return selectedCategories.includes(category.category);
  });

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
            class="mb-8 z-40 h-full transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2">
                {checkboxCategories.map((category) => {
                  const categoryModels = modelList.find(
                    (cat) => cat.category === category
                  ).models;
                  const totalModels = categoryModels.reduce(
                    (acc, curr) => acc + 1,
                    0
                  );
                  const Icon = modelList.find(
                    (cat) => cat.category === category
                  ).icon;
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
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        {category}
                      </span>
                      <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {totalModels}
                      </span>
                    </label>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>

        <div class="mb-8 col-span-2">
          <div class="p-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="h-full overflow-y-auto">
              <ul className="space-y-2">
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Models;
