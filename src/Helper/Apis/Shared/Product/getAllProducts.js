import axios from "axios";

export const getAllProducts = async () => {
  const url = "http://localhost:3000/api/v1/product";

  const response = await axios.get(url,{
    headers:{
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYzMmFjYmY3NTU2ZDFiMjhmYzE2ZWQiLCJlbWFpbCI6ImhhbXpha2hhbGVkMUBibGFja21hcnQuY29tIiwidXNlcm5hbWUiOiJoYW16YWtoYWxlZDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjcyMjYwNTQsImV4cCI6MTcyNzIzMzI1NH0.UHIBrstvmS8yACyp0DdoYRKOAWM_IPDd6yrcRqeRceM"

    }
  });
console.log(response.data.products)
  return response;
};

getAllProducts()

