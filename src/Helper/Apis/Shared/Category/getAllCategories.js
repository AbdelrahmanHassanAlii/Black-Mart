import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const getAllCategories = async () => {
  const url = "http://localhost:3000/api/v1/categories";

  const response = await axios.get(url, {
    headers: {
      "token": `${getToken()}`,
    },
  });

  console.log(response.data.categories);
  return response.data.categories; // Directly return categories
};
