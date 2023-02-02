const fetchModel = async ({ queryKey }) => {
  const id = queryKey[1];

  if (!id) return [];

  const apiRes = await fetch(`http://localhost:8000/model/${id}`);

  if (!apiRes.ok) {
    throw new Error(`model/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchModel;
