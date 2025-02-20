document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    if (window.location.pathname === '/products') {
        console.log('Fetching products data');
        
        fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(products => {
                console.log('Products data received:', products);
                
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = ''; // Clear any existing content
                
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <button class="button add-to-cart" data-product-name="${product.name}">Add to Cart</button>
                    `;
                    productsContainer.appendChild(productDiv);
                });

                // Add event listeners to "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productName = event.target.getAttribute('data-product-name');
                        console.log(`Adding ${productName} to cart`);
                        
                        // Provide feedback in the UX
                        const cartMessage = document.getElementById('cart-message');
                        cartMessage.textContent = `${productName} has been added to your cart.`;
                        cartMessage.style.display = 'block';
                        
                        // Optionally, hide the message after a few seconds
                        setTimeout(() => {
                            cartMessage.style.display = 'none';
                        }, 3000);
                    });
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }
});