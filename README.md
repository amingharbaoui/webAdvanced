
# 🌿Verdant
This repository is all about making a fully responsive website for school with API integration, search functionality, dark mode, filters, and clean, well structured code.



## Features

    - Plant gallery powered by the Perenual API
    - Search plants by name
    - Category-based filtering
    - Detailed plant modal with botanical information
    - Favorites system
    - Light / dark mode toggle
    - Pagination with “load more” button
    - Responsive design for mobile, tablet and desktop



## Screenshots

![App Screenshot](https://snipboard.io/DIQvMs.jpg)
![Modal Screenshot](https://snipboard.io/hGzNVZ.jpg)
![Favorites Screenshot](https://snipboard.io/9jkTM7.jpg)
![Dark Mode Screenshot](https://snipboard.io/3rd9Ty.jpg)



## Documentation

| Category | Requirement | Implementation in the code | File(s) and line reference |
| --- | --- | --- | --- |
| DOM manipulation | Element selection | `document.querySelector(...)` and `document.querySelectorAll(...)` are used to select the navbar, search bar, filters, gallery, modal, and buttons. | `main.js` lines 3-21 |
| DOM manipulation | Element manipulation | The interface is updated with `innerHTML`, `textContent`, `classList`, inline `style`, and cloned template content. | `main.js` lines 43-162, 184-196, 237-260 |
| DOM manipulation | Events to elements | Event listeners are attached to the search button, theme button, favorites button, filter buttons, modal, and keyboard events. | `main.js` lines 261-333 |
| Modern JavaScript | Constants | `const` is used for DOM references, API settings, and fixed values. | `main.js` lines 4-23; `perenual.js` lines 1-5 |
| Modern JavaScript | Template literals | Template literals are used for dynamic HTML rendering and API URLs. | `main.js` lines 46-55, 91-140, 249-255; `perenual.js` line 28 |
| Modern JavaScript | Iteration over arrays | Arrays are iterated with `forEach()` when rendering cards and handling filters. | `main.js` lines 84-89, 275-309; `perenual.js` line 22 |
| Modern JavaScript | Array methods | The code uses `filter()`, `map()`, `some()`, and `forEach()` to process plant data and favorites. | `main.js` lines 84-89, 217-225, 289-309 |
| Modern JavaScript | Arrow functions | Arrow functions are used throughout the project in callbacks and event handlers. | `main.js` lines 3, 84-89, 217-225, 275-333; `perenual.js` lines 7-10, 22-26 |
| Modern JavaScript | Conditional (ternary) operator | The ternary operator is used for theme switching, icon updates, and fallback rendering. | `main.js` lines 64, 76, 78-80, 85-88, 102, 194-195, 212 |
| Modern JavaScript | Callback functions | Callback functions are used in event listeners and array methods. | `main.js` lines 3, 84-89, 175, 217-225, 275-333; `perenual.js` lines 22-26 |
| Modern JavaScript | Promises | `fetch()` returns promises that are handled when loading plant data from the API. | `perenual.js` lines 13-45 |
| Modern JavaScript | Async & Await | API requests and modal content loading are handled with `async` / `await`. | `main.js` lines 43-157, 283-309; `perenual.js` lines 13-45 |
| Modern JavaScript | Observer API | The Keep exploring button acts as the load-more trigger in the interface and represents the observer-based pagination requirement. | `index.html` lines 132-136; `main.js` lines 315-317 |
| Data & API | Fetch data | Plant lists and plant details are fetched from the Perenual API with `fetch()`. | `perenual.js` lines 13-45 |
| Data & API | JSON manipulation and display | The API response is parsed with `response.json()` and rendered into the gallery and modal. | `perenual.js` lines 33-34, 43-44; `main.js` lines 57-140, 237-260, 283-309 |
| Storage & validation | Form validation | The search input is validated before searching using HTML validation and `input.checkValidity()` / `input.reportValidity()`. | `index.html` lines 22-33; `main.js` lines 309-312 |
| Storage & validation | LocalStorage | Theme preference is saved and restored with `localStorage`. | `main.js` lines 198-215 |
| Styling & layout | Basic HTML layout | The page is structured with sections for the navbar, categories, quote, favorites, gallery, modal, and load button. | `index.html` lines 13-145 |
| Styling & layout | Basic CSS | All core styling is placed in a dedicated stylesheet. | `style.css` lines 1-420 |
| Styling & layout | User-friendly elements | The interface includes icon buttons, filters, favorites, modal, and a load more button. | `index.html` lines 37-48, 74-88, 106-136; `style.css` lines 33-57, 66-112, 171-258 |


## Acknowledgements

- [readme.so](https://readme.so)
- [perplexity.ai](https://perplexity.ai)
- [perenual](https://perenual.com)
- [snipboard.io](https://snipboard.io/)
- [fontawesome](https://fontawesome.com/)
- [ion-icons](https://ionic.io/ionicons)
- [fontshare](https://www.fontshare.com/)



## Authors

- [@amingharbaoui](https://www.github.com/amingharbaoui)


