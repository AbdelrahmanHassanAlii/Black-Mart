import axios from "axios";

export const addCategory = async (category) => {
    const url = "http://localhost:3000/api/v1/categories";
    const response = await axios.post(url, category);
    return response;
}