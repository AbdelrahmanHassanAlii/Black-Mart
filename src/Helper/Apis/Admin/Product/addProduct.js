import axios from "axios";

export const addProduct = async (product) => {
  const url = "http://localhost:3000/api/v1/product";

  const response = await axios.post(url, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
