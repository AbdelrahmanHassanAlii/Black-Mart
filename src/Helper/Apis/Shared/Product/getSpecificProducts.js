import axios from "axios";

export const getSpecificCategory = async (productID) => {
  const url = `http://localhost:3000/api/v1/product/${productID}`;

  const response = await axios.get(url);

  return response;
};
