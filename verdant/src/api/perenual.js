
const BASE_URL = "https://perenual.com/api/v2/species-list";
const API_KEY = "sk-AV6u69b5605200ecc15454";

async function getPlantsList(page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&page=${page}`;
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error("Error http" + result.status);
    }

    const data = await result.json();
    return data;
}

export{getPlantsList};
