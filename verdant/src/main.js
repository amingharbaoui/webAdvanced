import {getPlantsList} from "./api/perenual.js";
document.addEventListener("DOMContentLoaded", () => {

    let body = document.body;
    let favoriteButton = document.querySelector(".navbar_container_buttons_favorite");
    let favorites = [];
    let themeButton = document.querySelector(".navbar_container_buttons_theme");
    let loadButton = document.querySelector(".load_button");
    let moonIcon = document.querySelector(".navbar_container_buttons_theme_moon");
    let sunIcon = document.querySelector(".navbar_container_buttons_theme_sunny");
    let categoryButtons = document.querySelectorAll(".categories_container_items_item");
    const gallery = document.querySelector("#card_container_items_gallery");
    const template = document.querySelector("#plant_card_template");
    let input = document.querySelector(".navbar_container_searchbar_input");
    let inputButton = document.querySelector(".navbar_container_searchbar_buttoncontainer_button");
    const filterButton = document.querySelector(".categories_container_items_item_filter");
    let panelFilterButtons = document.querySelectorAll(".categories_container_items_item_filter_panel_buttons_list_element");

    if(filterButton) {
        filterButton.addEventListener("mouseenter", () => {
            filterButton.classList.add("is_open");
        })

        filterButton.addEventListener("mouseleave", () => {
            filterButton.classList.remove("is_open");
        })
    }

    let currentPage= 1;
    let lastPage = null;
    let currentFilter = "all";
    let isLoading = false;

    const filtersMap = {
        all: {},
        indoor: { indoor: 1 },
        outdoor: { indoor:0 },
        edible: {edible: 1},
        poisonous: {poisonous: 1},
        hardiness: {hardiness: "7"},
        sunlight: {sunlight: "full sun"},
        watering: {watering: "Frequent"}
    };


// Dark mode

    const THEME_KEY = "theme";

    function applyTheme(theme) {
        body.classList.toggle("dark_container_body", theme === "dark");
        sunIcon.style.display = theme === "dark" ? "block" : "none";
        moonIcon.style.display = theme === "dark" ? "none" : "block";
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);

        if(savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    let currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    function toggleDarkMode() {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(currentTheme);
        localStorage.setItem(THEME_KEY, currentTheme);
    }

    themeButton.addEventListener("click", toggleDarkMode);


    // Load plants Function
    async function loadPlants(page = 1, reset = false) {
        if(isLoading) {
            return;
        }
        isLoading = true;

        try {
            loadButton.disabled = true;
            const data = await getPlantsList(page, filtersMap[currentFilter]);
            lastPage = data.last_page;

            if(reset) {
                gallery.innerHTML = "";
            }

            data.data.filter((plant) => plant.default_image?.original_url).forEach((plant) => {
                const clone = template.content.cloneNode(true);
                const imageBox = clone.querySelector(".card_container_item_content_intern_image");
                const title = clone.querySelector(".card_container_items_item_content_extern_information_title");
                const subtitle = clone.querySelector(".card_container_items_item_content_extern_information_subtitle");

                imageBox.innerHTML = `<img class="card_container_item_content_intern_image_img" src="${plant.default_image?.original_url || ""}" alt="${plant.common_name}"> `;

                title.textContent = plant.common_name;
                subtitle.textContent = plant.scientific_name?.[0];

                gallery.appendChild(clone);
            });

            currentPage = page;

            if(lastPage && currentPage >= lastPage) {
                loadButton.disabled = true;
            }else {
                loadButton.disabled = false;
            }

        }catch (error) {
            console.error("Error: " + error);
            loadButton.disabled = false;
        }finally {
            isLoading = false;
        }
    }

    async function searchPlantsByName() {
        const searchValue = input.value.trim();

        if(!searchValue) {
            currentPage = 1;
            lastPage = null;
            loadPlants(1, true);
            return;
        }

        if(isLoading) {
            return;
        }

        isLoading = true;

        try {
            loadButton.disabled = true;
            gallery.innerHTML = "";

            const data = await getPlantsList(1, {
                ...filtersMap[currentFilter],
                q: searchValue
            });

            lastPage = data.last_page;
            currentPage = 1;

            data.data.filter((plant) => plant.default_image?.original_url).forEach((plant) => {
                const clone = template.content.cloneNode(true);
                const imageBox = clone.querySelector(".card_container_item_content_intern_image");
                const title = clone.querySelector(".card_container_items_item_content_extern_information_title");
                const subtitle = clone.querySelector(".card_container_items_item_content_extern_information_subtitle");


                imageBox.innerHTML = `<img class="card_container_item_content_intern_image_img" src="${plant.default_image?.original_url}" alt="${plant.common_name}">`;

                title.textContent = plant.common_name;
                subtitle.textContent = plant.scientific_name?.[0];
                gallery.appendChild(clone);
            });

            if(lastPage  && currentPage >= lastPage) {
                loadButton.disabled = true;
            }else {
                loadButton.disabled = false;
            }

        }catch (error) {
            console.error("Error: " + error);
            loadButton.disabled = false;
        }finally {
            isLoading = false;
        }

        input.value = "";
    }

    function handleFilterClick(button) {

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        panelFilterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;
        currentPage = 1;
        lastPage = null;
        loadPlants(1, true);
    }

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleFilterClick(button);
        });
    });

    panelFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleFilterClick(button);
            filterButton.classList.remove("is_open");
        });
    });

    inputButton.addEventListener("click", searchPlantsByName);

    input.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            searchPlantsByName();
        }
    })

    loadButton.addEventListener("click",  () => {
        if(!lastPage || currentPage < lastPage) {
            loadPlants(currentPage + 1);
        }
    });

    favoriteButton.addEventListener("click", () => {

    })


    loadPlants(1, true);
});
