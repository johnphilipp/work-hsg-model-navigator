const fetchModels = async ({ queryKey }) => {
  const categories = queryKey[1];

  if (categories.length === 0) return [];

  const apiRes = await fetch(`http://localhost:8000/models/${categories}`);

  if (!apiRes.ok) {
    throw new Error(`models/${categories} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchModels;
