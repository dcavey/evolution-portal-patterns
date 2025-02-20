const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204));

// Define a route for the home page
app.get('/', (req, res) => {
  console.log('Serving home page');
  res.render('index', { title: 'Home', content: 'Welcome to our online store! Browse our selection of products.' });
});

// Define a route for the products page
app.get('/products', (req, res) => {
  console.log('Serving products page');
  const products = [
    { name: 'Product 1', price: '$99.99' },
    { name: 'Product 2', price: '$149.99' }
  ];
  res.render('products', { title: 'Products', products });
});

// Define a route for the about page
app.get('/about', (req, res) => {
  console.log('Serving about page');
  res.render('about', { title: 'About', content: 'We are a traditional multi-page application example store. Each link click results in a complete page reload. This demonstrates the classic web navigation pattern where each page is a separate HTML document.' });
});

// Define a route for fetching products data via AJAX
app.get('/api/products', (req, res) => {
  console.log('Fetching products data via AJAX');
  const products = [
    { name: 'Product 1', price: '$99.99' },
    { name: 'Product 2', price: '$149.99' }
  ];
  res.json(products);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});