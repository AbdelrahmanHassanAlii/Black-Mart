import { getItemFromLS } from "./GetItemFromLS"

export const getToken = () => {
    let logingData = getItemFromLS("logingData")
    if (logingData) {
        return logingData.token;
    } else {
        return console.error("token not found");
        
    }
}