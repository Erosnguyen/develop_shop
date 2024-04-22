export const fetchApiConfig = async (url) => {
  const data = await fetch(`http://127.0.0.1:8000/${url}`);
  return await data.json();
};
