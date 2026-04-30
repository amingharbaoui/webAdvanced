
const BASE_URL = "https://perenual.com/api/v2/species-list";
const API_KEY = "sk-PTgQ69e5201a36de015454";

async function getPlantsList(page = 1, filters = {}) {
    const params = new URLSearchParams({
        key: API_KEY,
        page
    });
    Object.entries(filters).forEach(([key, value]) => {
        if(value !== undefined && value !== null && value !== "") {
            params.append(key, value);
        }
    });

    const url = `${BASE_URL}?${params.toString()}`;
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error("Error http: " + result.status);
    }

    const data = await result.json();
    return data;
}

export{getPlantsList};
