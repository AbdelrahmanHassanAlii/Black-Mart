import { getItemFromLS } from "./GetItemFromLS"

export const getToken = () => {
    let logingData = getItemFromLS("logingData")
    if (logingData) {
        return logingData[0].token;
    } else {
        return console.error("token not found");
        
    }
}