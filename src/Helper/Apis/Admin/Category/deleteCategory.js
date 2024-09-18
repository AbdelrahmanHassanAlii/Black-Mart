import axios from "axios";

export const deleteCategory = async (categoryID) => {
  const url = `http://localhost:3000/api/v1/categories/${categoryID}`;
  const response = await axios.delete(url);
  return response;
};
