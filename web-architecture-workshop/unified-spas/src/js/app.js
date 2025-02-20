// This file contains JavaScript code that manages the state and navigation of the unified SPA.

document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    const links = document.querySelectorAll("a");

    function loadView(view) {
        fetch(`views/${view}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(html => {
                app.innerHTML = html;
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const view = this.getAttribute("href").replace(".html", "");
            loadView(view);
        });
    });

    // Load the default view on initial load
    loadView("home");
});