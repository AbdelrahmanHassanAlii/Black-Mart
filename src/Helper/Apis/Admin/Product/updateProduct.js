import axios from "axios";

export const updateProduct = async (productID, product) => {
    const url = `http://localhost:3000/api/v1/categories/${productID}`;

    const response = await axios.put(url, product, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    
    return response;
}