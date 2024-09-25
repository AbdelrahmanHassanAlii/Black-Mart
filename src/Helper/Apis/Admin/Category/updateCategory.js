import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateCategory = async (categoryID, category) => {
    const url = `http://localhost:3000/api/v1/categories/${categoryID}`;

    const response = await axios.put(url, category, {
        headers: {
            "Content-Type": "multipart/form-data",

            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYzMjVhNGY3NTU2ZDFiMjhmYzE2ZGIiLCJlbWFpbCI6ImhhbXpha2hhbGVkQGJsYWNrbWFydC5jb20iLCJ1c2VybmFtZSI6ImhhbXphIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjcyMTIwMjQsImV4cCI6MTcyNzIxOTIyNH0.i7wXfAgt4qrG3wQ17gmIUZpxfQiB33A55k2_l-_DZV8"

            "token": `${getToken()}`,

        },
    });
    
    return response;
}