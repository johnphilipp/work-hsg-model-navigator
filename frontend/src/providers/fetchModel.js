const fetchModel = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://localhost:8000/model/${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchModel;
