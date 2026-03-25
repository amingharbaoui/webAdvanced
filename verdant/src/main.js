import {getPlantsList} from "./api/perenual.js";
document.addEventListener("DOMContentLoaded", () => {

    let body = document.body;
    let themeButton = document.querySelector(".navbar_container_buttons_theme");

    const isDark = localStorage.getItem("darkMode") === "true";
    body.classList.toggle("dark_container_body", isDark);

    let moonIcon = document.querySelector(".navbar_container_buttons_theme_moon");
    let sunIcon = document.querySelector(".navbar_container_buttons_theme_sunny");

// Dark mode toggle

    function toggleDarkMode() {
        const isDark = body.classList.toggle("dark_container_body");
        sunIcon.style.display = isDark ? "block" : "none";
        moonIcon.style.display = isDark ? "none" : "block";
        localStorage.setItem("darkMode", isDark);
    }

    themeButton.addEventListener("click", toggleDarkMode);


    // Load plants Function


    async function loadPlants() {
        const cards = document.querySelectorAll("#card_container_items_gallery");

        try {
            const data = await getPlantsList(1);
            data.data.slice(0, cards.length).forEach((plant, index) => {
                const card = cards[index];

                card.querySelector(".card_container_item_content_intern_image").innerHTML =
                    `<img class="card_container_item_content_intern_image_img" src="${plant.default_image?.thumbnail || ""}" alt="${plant.common_name}">`;

                card.querySelector(".card_container_items_item_content_extern_information_title").textContent = plant.common_name;
                card.querySelector(".card_container_items_item_content_extern_information_subtitle").textContent = plant.scientific_name?.join(", ");
            });
        }catch (error) {
            console.error("Error: " + error);
        }
    }

    loadPlants();

});