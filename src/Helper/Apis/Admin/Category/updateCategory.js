import axios from "axios";

export const updadateCategory = async (categoryID, category) => {
    const url = `http://localhost:3000/api/v1/categories/${categoryID}`;
    const response = await axios.put(url, category, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
}