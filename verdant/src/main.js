import { getPlantsList, getPlantDetails } from "./api/perenual.js";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const favoritesContainer = document.querySelector(".favorites_container");
    const navbarFavoriteButton = document.querySelector(".navbar_container_buttons_favorite");
    const themeButton = document.querySelector(".navbar_container_buttons_theme");
    const loadButton = document.querySelector(".load_button");
    const quoteContainer = document.querySelector(".quote_container");
    const moonIcon = document.querySelector(".navbar_container_buttons_theme_moon");
    const sunIcon = document.querySelector(".navbar_container_buttons_theme_sunny");
    const categoryButtons = document.querySelectorAll(".categories_container_items_item");
    const gallery = document.querySelector("#card_container_items_gallery");
    const template = document.querySelector("#plant_card_template");
    const input = document.querySelector(".navbar_container_searchbar_input");
    const inputButton = document.querySelector(".navbar_container_searchbar_buttoncontainer_button");
    const filterButton = document.querySelector(".categories_container_items_item_filter");
    const panelFilterButtons = document.querySelectorAll(
        ".categories_container_items_item_filter_panel_buttons_list_element"
    );
    const modalContainer = document.querySelector(".modal_container");

    const THEME_KEY = "theme";
    const FAVORITES_KEY = "favorites";

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isFavoritesView = false;
    let currentPage = 1;
    let lastPage = null;
    let currentFilter = "all";
    let isLoading = false;

    const filtersMap = {
        all: {},
        indoor: { indoor: 1 },
        outdoor: { indoor: 0 },
        edible: { edible: 1 },
        poisonous: { poisonous: 1 },
        hardiness: { hardiness: "7" },
        sunlight: { sunlight: "full sun" },
        watering: { watering: "Frequent" }
    };

    async function openModal(plant) {
        modalContainer.classList.add("open");

        modalContainer.innerHTML = `
        <div class="modal_container_content">
          <div class="modal_container_content_info">
            <p class="modal_container_content_info_name">Loading plant...</p>
            <h2 class="modal_container_content_info_title">Please wait</h2>
            <p class="modal_container_content_info_description">
              We are loading the details for this plant.
            </p>
          </div>
        </div>`;

        try {
            const details = await getPlantDetails(plant.id);

            const image = details.default_image?.original_url || plant.default_image?.original_url || "";

            const commonName = details.common_name || plant.common_name || "Unknown plant";

            const scientificName = Array.isArray(details.scientific_name) ? details.scientific_name[0] : "N/A";

            const family = details.family || plant.family || "N/A";

            const origin = Array.isArray(details.origin) ? details.origin.join(", ") : "N/A";

            const type = details.type || plant.type || "N/A";

            const cycle = details.cycle || plant.cycle || "N/A";

            const watering = details.watering || plant.watering || "N/A";

            const sunlight = Array.isArray(details.sunlight) ? details.sunlight.join(", ") : "N/A";

            const hardiness = details.hardiness ? `${details.hardiness.min || "N/A"} - ${details.hardiness.max || "N/A"}°C` : "N/A";

            const wateringBenchmark = details.watering_general_benchmark? `${details.watering_general_benchmark.value || "N/A"} ${details.watering_general_benchmark.unit || ""}` : "N/A";

            const description = details.description || "No description available.";

            const badges = [
                type !== "N/A" ? `Type: ${type}` : null,
                details.leaf !== undefined ? `Leaf: ${details.leaf}` : null,
                details.flowering_season ? `Season: ${details.flowering_season}` : null,
                details.growth_rate ? `Growth: ${details.growth_rate}` : null,
            ].filter(Boolean);

            modalContainer.innerHTML = `<div class="modal_container_content">${image ? `<div class="modal_container_content_image"><img src="${image}" alt="${commonName}" loading="lazy"></div>` : ""}

        <div class="modal_container_content_info">
          <p class="modal_container_content_info_name">${family}</p>

          <h2 class="modal_container_content_info_title">${commonName}</h2>

          <p class="modal_container_content_info_category">
            <span><em>${scientificName}</em></span>
          </p>

          ${badges.length > 0 ? `<div class="modal_container_content_badges">${badges.map((badge) => `<span class="modal_container_content_badge">${badge}</span>`).join("")}</div>` : ""}

          <p class="modal_container_content_info_description">
            ${description}
          </p>

          <div class="modal_container_content_details">
            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Origin</span>
              <span class="modal_container_content_detail_value">${origin}</span>
            </div>

            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Watering</span>
              <span class="modal_container_content_detail_value">${watering}</span>
            </div>

            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Sunlight</span>
              <span class="modal_container_content_detail_value">${sunlight}</span>
            </div>

            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Hardiness</span>
              <span class="modal_container_content_detail_value">${hardiness}</span>
            </div>

            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Cycle</span>
              <span class="modal_container_content_detail_value">${cycle}</span>
            </div>

            <div class="modal_container_content_detail">
              <span class="modal_container_content_detail_label">Benchmark</span>
              <span class="modal_container_content_detail_value">${wateringBenchmark}</span>
            </div>
          </div>
        </div>
       </div>`;

        } catch (error) {
            console.error("Error modal:", error);

            modalContainer.innerHTML = `
              <div class="modal_container_content">
                <div class="modal_container_content_info">
                  <p class="modal_container_content_info_name">Error</p>
                  <h2 class="modal_container_content_info_title">Unable to load this plant</h2>
                  <p class="modal_container_content_info_description">
                    Something went wrong while loading the plant details.
                  </p>
                </div>
              </div>
    `;
        }
    }

    function closeModal() {
        modalContainer.classList.remove("open");
        modalContainer.innerHTML = "";
    }

    function hideHomeExtras() {
        quoteContainer.style.display = "none";
        loadButton.style.display = "none";
    }

    function showHomeExtras() {
        quoteContainer.style.display = "flex";
        loadButton.style.display = "inline-flex";
    }

    function updateHomeExtrasVisibility() {
        const hasCards = gallery.querySelectorAll(".card_container_item").length > 0;

        if (hasCards && !isFavoritesView) {
            showHomeExtras();
        } else {
            hideHomeExtras();
        }
    }

    function updateNavbarFavoriteIcon() {
        if (favorites.length > 0) {
            navbarFavoriteButton.innerHTML = `<ion-icon class="card_container_item_content_intern_top_icon_sparkles" name="sparkles"></ion-icon>`;
        } else {
            navbarFavoriteButton.innerHTML = `<ion-icon class="card_container_item_content_intern_top_icon_sparkles" name="sparkles-outline"></ion-icon>`;
        }
    }

    function saveFavorites() {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    function applyTheme(theme) {
        body.classList.toggle("dark_container_body", theme === "dark");
        sunIcon.style.display = theme === "dark" ? "block" : "none";
        moonIcon.style.display = theme === "dark" ? "none" : "block";
    }

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);

        if (savedTheme === "dark" || savedTheme === "light") {
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

    function isPlantFavorite(plantId) {
        return favorites.some((fav) => fav.id === plantId);
    }

    function toggleFavorite(plant) {
        const alreadyFavorite = isPlantFavorite(plant.id);

        if (alreadyFavorite) {
            favorites = favorites.filter((fav) => fav.id !== plant.id);
        } else {
            favorites.push(plant);
        }

        saveFavorites();

        updateNavbarFavoriteIcon();

        if (isFavoritesView) {
            renderFavoritesView();
        }
    }

    function buildPlantCard(plant) {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector(".card_container_item");
        const imageBox = clone.querySelector(".card_container_item_content_intern_image");
        const title = clone.querySelector(".card_container_items_item_content_extern_information_title");
        const subtitle = clone.querySelector(".card_container_items_item_content_extern_information_subtitle");
        const cardFavoriteButton = clone.querySelector(".card_container_item_content_intern_top_icon");

        if (card) {
            card.dataset.id = plant.id;
        }

        imageBox.innerHTML = `
      <img
        src="${plant.default_image?.original_url}"
        alt="${plant.common_name || "Plant"}"
        class="card_container_item_content_intern_image_img"
      >
    `;

        title.textContent = plant.common_name || "Unknown plant";
        subtitle.textContent = plant.scientific_name?.[0] || "No scientific name";

        cardFavoriteButton.innerHTML = isPlantFavorite(plant.id)
            ? `<ion-icon name="sparkles"></ion-icon>`
            : `<ion-icon class="card_container_item_content_intern_top_icon_sparkles" name="sparkles-outline"></ion-icon>`;

        cardFavoriteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleFavorite(plant);

            if (!isFavoritesView) {
                cardFavoriteButton.innerHTML = isPlantFavorite(plant.id)
                    ? `<ion-icon name="sparkles"></ion-icon>`
                    : `<ion-icon class="card_container_item_content_intern_top_icon_sparkles" name="sparkles-outline"></ion-icon>`;
            }
        });
        card.addEventListener('click', (event) => {
            if (event.target.closest('.card_container_item_content_intern_top_icon')) return;
            openModal(plant);
        });

        return clone;
    }

    function renderFavoritesView() {
        isFavoritesView = true;
        hideHomeExtras();
        loadButton.disabled = true;

        favoritesContainer.innerHTML = `
          <span class="favorite_container_eyebrow">Curated collection</span>
          <h2 class="favorite_container_title">My Favorite Plants</h2>
          <p class="favorite_container_text">
        ${
            favorites.length > 0
                ? "A quiet selection of the plants you saved along the way."
                : "No favorites yet. Start saving plants and build your own collection."
        }
      </p>`;

        gallery.innerHTML = "";

        favorites.forEach((plant) => {
            const clone = buildPlantCard(plant);
            gallery.appendChild(clone);
        });
    }

    function resetToNormalView() {
        isFavoritesView = false;
        favoritesContainer.innerHTML = "";
    }

    async function loadPlants(page = 1, reset = false) {
        if (isLoading) {
            return;
        }

        isLoading = true;

        try {
            loadButton.disabled = true;

            if (reset) {
                resetToNormalView();
                gallery.innerHTML = "";
            }

            const data = await getPlantsList(page, filtersMap[currentFilter]);
            lastPage = data.last_page;

            data.data
                .filter((plant) => plant.default_image?.original_url)
                .forEach((plant) => {
                    const clone = buildPlantCard(plant);
                    gallery.appendChild(clone);
                });

            currentPage = page;
            updateHomeExtrasVisibility();

            if (lastPage && currentPage >= lastPage) {
                loadButton.disabled = true;
            } else {
                loadButton.disabled = false;
            }
        } catch (error) {
            console.error("Error: " + error);
            loadButton.disabled = false;
        } finally {
            isLoading = false;
        }
    }

    async function searchPlantsByName() {
        const searchValue = input.value.trim();

        if (!searchValue) {
            currentPage = 1;
            lastPage = null;
            loadPlants(1, true);
            return;
        }

        if (isLoading) {
            return;
        }

        isLoading = true;

        try {
            loadButton.disabled = true;
            resetToNormalView();
            gallery.innerHTML = "";

            const data = await getPlantsList(1, {
                ...filtersMap[currentFilter],
                q: searchValue
            });

            lastPage = data.last_page;
            currentPage = 1;

            data.data
                .filter((plant) => plant.default_image?.original_url)
                .forEach((plant) => {
                    const clone = buildPlantCard(plant);
                    gallery.appendChild(clone);
                });

            updateHomeExtrasVisibility();

            if (lastPage && currentPage >= lastPage) {
                loadButton.disabled = true;
            } else {
                loadButton.disabled = false;
            }
        } catch (error) {
            console.error("Error: " + error);
            loadButton.disabled = false;
        } finally {
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

    if (filterButton) {
        filterButton.addEventListener("mouseenter", () => {
            filterButton.classList.add("is_open");
        });

        filterButton.addEventListener("mouseleave", () => {
            filterButton.classList.remove("is_open");
        });
    }

    themeButton.addEventListener("click", toggleDarkMode);

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleFilterClick(button);
        });
    });

    panelFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleFilterClick(button);
            if (filterButton) {
                filterButton.classList.remove("is_open");
            }
        });
    });

    inputButton.addEventListener("click", searchPlantsByName);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchPlantsByName();
        }
    });

    loadButton.addEventListener("click", () => {
        if (!lastPage || currentPage < lastPage) {
            loadPlants(currentPage + 1);
        }
    });

    navbarFavoriteButton.addEventListener("click", () => {
        if (isFavoritesView) {
            currentPage = 1;
            lastPage = null;
            loadPlants(1, true);
            return;
        }

        renderFavoritesView();
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    updateNavbarFavoriteIcon();
    loadPlants(1, true);
});