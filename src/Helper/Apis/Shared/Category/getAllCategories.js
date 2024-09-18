import axiox from "axios";

export const getAllCategories = async () => {
  const url = "http://localhost:3000/api/v1/categories";

  const response = await axiox.get(url);

  return response;
};
