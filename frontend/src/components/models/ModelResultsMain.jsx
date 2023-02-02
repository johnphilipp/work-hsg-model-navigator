import ModelCard from "./ModelCard";

const ModelResultsMain = ({ models }) => {
  return (
    <div>
      {models.map((model, index) => (
        <li key={model.name}>
          <ModelCard
            category={model.category}
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
