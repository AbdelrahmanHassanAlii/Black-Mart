import axios from "axios";

export const getAllProducts = async () => {
  const url = "http://localhost:3000/api/v1/product";

  const response = await axios.get(url);
console.log(response)
  return response;
};
getAllProducts()