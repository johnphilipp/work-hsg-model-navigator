const fetchCategories = async () => {
  const apiRes = await fetch(`http://localhost:8000/categories/`);

  if (!apiRes.ok) {
    throw new Error(`categories/ fetch not ok`);
  }

  return apiRes.json();
};

export default fetchCategories;
