export const addItemToLS = (name, item) => {
    let data = localStorage.getItem(name);
    if (data) {
        data = JSON.parse(data);
        data.push(item);
        localStorage.setItem(name, JSON.stringify(data));
    } else {
        localStorage.setItem(name, JSON.stringify([item]));
    }
}