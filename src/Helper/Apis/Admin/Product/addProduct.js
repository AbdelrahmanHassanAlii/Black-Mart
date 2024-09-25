import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";


export const addProduct = async (product) => {
  const url = "http://localhost:3000/api/v1/product";
  console.log("Current token:", getToken());
  try {
    const response = await axios.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${getToken()}`,
      },
    });
    console.log(response);
    return response.data; // Return the data, not the entire response
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
 
};