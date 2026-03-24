
let body = document.body;
let themeButton = document.querySelector(".navbar_container_buttons_theme");

const isDark = localStorage.getItem("darkMode") === "true";
body.classList.toggle("dark_container_body", isDark);

let moonIcon = document.querySelector(".navbar_container_buttons_theme_moon");
let sunIcon = document.querySelector(".navbar_container_buttons_theme_sunny");

// Dark mode toggle
themeButton.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark_container_body");
    sunIcon.style.display = isDark ? "block" : "none";
    moonIcon.style.display = isDark ? "none" : "block";
    localStorage.setItem("darkMode", isDark);
});
