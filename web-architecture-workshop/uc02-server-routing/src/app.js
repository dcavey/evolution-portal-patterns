const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', content: 'Welcome to our online store! Browse our selection of products.' });
});

// Define a route for the products page
app.get('/products', (req, res) => {
  const products = [
    { name: 'Product 1', price: '$99.99' },
    { name: 'Product 2', price: '$149.99' }
  ];
  res.render('products', { title: 'Products', products });
});

// Define a route for the about page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About', content: 'We are a traditional multi-page application example store. Each link click results in a complete page reload. This demonstrates the classic web navigation pattern where each page is a separate HTML document.' });
});

// Define a route for the cart page
app.get('/cart', (req, res) => {
  res.send('This is the cart page. Items added to the cart will be displayed here.');
});

// Redirect routes for .html extensions to the appropriate routes
app.get('/index.html', (req, res) => {
  res.redirect('/');
});

app.get('/products.html', (req, res) => {
  res.redirect('/products');
});

app.get('/about.html', (req, res) => {
  res.redirect('/about');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});