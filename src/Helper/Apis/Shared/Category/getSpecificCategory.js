import axios from "axios";

export const getSpecificCategory = async (categoryID) => {
  const url = `http://localhost:3000/api/v1/categories/${categoryID}`;

  const response = await axios.get(url);

  return response;
};
