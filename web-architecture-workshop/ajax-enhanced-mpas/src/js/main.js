// This file contains JavaScript code that uses AJAX to update parts of the page without a full reload.

document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.getElementById('content');
    const links = document.querySelectorAll('a.ajax-link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    contentArea.innerHTML = html;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    });
});