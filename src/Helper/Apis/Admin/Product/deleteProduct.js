import axios from "axios";

export const deleteProduct = async (productID) => {
  const url = `http://localhost:3000/api/v1/categories/${productID}`;

  const response = await axios.delete(url);

  return response;
};
