import { getItemFromLS } from "./GetItemFromLS";

export const getRole = () => {
  const logingData = getItemFromLS("loginData");

  // Check if logingData exists, is an array, and has the Payload and role fields
  if (logingData) {
    console.log(logingData);
    return logingData[0].Payload.role; // Access the role from Payload
  } else {
    console.error("Role not found or logingData is empty");
    return "user"; // Default to "user" role
  }
};
