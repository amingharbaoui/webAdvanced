const BASE_URL = "https://perenual.com/api/v2/species-list";
const API_KEY = "sk-B6VQ69ff25557da7515454";

const listCache = new Map();
const detailsCache = new Map();

function makeCacheKey(page, filters = {}) {
    const sorted = Object.entries(filters)
        .sort(([a], [b]) => a.localeCompare(b));
    return JSON.stringify({ page, filters: sorted });
}

export async function getPlantsList(page = 1, filters = {}) {
    const cacheKey = makeCacheKey(page, filters);

    if (listCache.has(cacheKey)) {
        return listCache.get(cacheKey);
    }

    const params = new URLSearchParams({ key: API_KEY, page });

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.append(key, value);
        }
    });

    const url = `${BASE_URL}?${params.toString()}`;
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error("Error http: " + result.status);
    }

    const data = await result.json();
    listCache.set(cacheKey, data);
    return data;
}

export async function getPlantDetails(id) {
    if (detailsCache.has(id)) {
        return detailsCache.get(id);
    }

    const res = await fetch(`https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`);

    if (!res.ok) {
        throw new Error("Error http: " + res.status);
    }

    const data = await res.json();
    detailsCache.set(id, data);
    return data;
}