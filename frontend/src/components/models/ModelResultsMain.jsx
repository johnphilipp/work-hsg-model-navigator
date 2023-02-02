import Alert from "../Alert";
import ModelCard from "./ModelCard";

const ModelResultsMain = ({ models, selectedCategories }) => {
  if (selectedCategories.length === 0)
    return <Alert msg={"Please select a category"} />;
  if (models.length === 0) return <Alert msg={"No models found"} />;
  return (
    <div>
      {models.map((model, index) => (
        <li key={model.name}>
          <ModelCard
            category={model.category}
            id={model.id}
            name={model.name}
            version={model.version}
            status={model.status}
          />
          {index !== models.length - 1 && <hr className="mb-4 mt-4" />}
        </li>
      ))}
    </div>
  );
};

export default ModelResultsMain;
