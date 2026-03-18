
let body = document.body;
let themeButton = document.querySelector(".theme_btn");

const isDark = localStorage.getItem("darkMode") === "true";
body.classList.toggle("dark_body", isDark);

let moonIcon = document.querySelector(".moon");
let sunIcon = document.querySelector(".sunny");

// Dark mode toggle
themeButton.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark_body");
    sunIcon.style.display = isDark ? "block" : "none";
    moonIcon.style.display = isDark ? "none" : "block";
    localStorage.setItem("darkMode", isDark);
});