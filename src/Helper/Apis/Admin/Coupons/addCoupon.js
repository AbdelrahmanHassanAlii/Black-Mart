import axios from "axios";
import { getToken } from "./../../../Funcation/LocalStorage/getToken";

export const addCoupon = async (coupon) => {
  const url = "http://localhost:3000/api/v1/coupon";

  const response = await axios.post(url, coupon, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
