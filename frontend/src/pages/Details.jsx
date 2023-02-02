import { useParams } from "react-router-dom";
import { Container } from "../components/Container";

// TODO: Fetch data from API via model id
const Details = () => {
  const { name } = useParams();
  return (
    <Container>
      <div className="flex items-center">
        <div className="font-light text-2xl">{name}</div>
        <span className="ml-4 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
          v1.3.2
        </span>
        <div className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          LLMs
        </div>
      </div>
    </Container>
  );
};

export default Details;
