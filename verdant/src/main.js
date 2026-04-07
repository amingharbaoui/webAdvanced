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
        const gallery = document.querySelector("#card_container_items_gallery");
        const template = document.querySelector("#plant_card_template");

        try {
            const data = await getPlantsList(1);
            gallery.innerHTML = "";

            data.data.forEach((plant) => {
                const clone = template.content.cloneNode(true);
                const imageBox = clone.querySelector(".card_container_item_content_intern_image");
                const title = clone.querySelector(".card_container_items_item_content_extern_information_title");
                const subtitle = clone.querySelector(".card_container_items_item_content_extern_information_subtitle");

                imageBox.innerHTML = `<img class="card_container_item_content_intern_image_img" src="${plant.default_image?.original_url || ""}" alt="${plant.common_name}"> `;

                title.textContent = plant.common_name;
                subtitle.textContent = plant.scientific_name?.[0];

                gallery.appendChild(clone);
            });


        }catch (error) {
            console.error("Error: " + error);
        }
    }
    loadPlants()
})
