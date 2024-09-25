import axios from "axios";

export const addProduct = async (product) => {
  const url = "http://localhost:3000/api/v1/product";

  const response = await axios.post(url, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYzMmFjYmY3NTU2ZDFiMjhmYzE2ZWQiLCJlbWFpbCI6ImhhbXpha2hhbGVkMUBibGFja21hcnQuY29tIiwidXNlcm5hbWUiOiJoYW16YWtoYWxlZDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjcyNjQxNjMsImV4cCI6MTcyNzI3MTM2M30.Rh2NA0qW-vZz1pkW3NipNHafv1xCwUepMlDso-5ZQ0I`,
    },
  });

  return response;
};
