// This file contains JavaScript code that handles client-side routing and updates the UI without full page reloads.

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[data-view]');
    const content = document.getElementById('content');

    function loadView(view) {
        fetch(view)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const view = this.getAttribute('data-view');
            history.pushState(null, '', view);
            loadView(view);
        });
    });

    window.addEventListener('popstate', function() {
        loadView(location.pathname);
    });

    // Load the initial view
    loadView(location.pathname);
});