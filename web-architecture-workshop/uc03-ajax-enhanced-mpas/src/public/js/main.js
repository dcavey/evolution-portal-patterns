document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    if (window.location.pathname === '/products.html') {
        console.log('Fetching products data');
        
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                console.log('Products data received:', products);
                
                const productsContainer = document.getElementById('products-container');
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <button class="button">Add to Cart</button>
                    `;
                    productsContainer.appendChild(productDiv);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }
});