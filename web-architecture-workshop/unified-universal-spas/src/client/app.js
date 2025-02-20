// This file contains the JavaScript code for the client-side functionality of the unified universal SPA.

const express = require('express');
const app = express();
const { renderToString } = require('react-dom/server');
const React = require('react');
const App = require('./components/App'); // Assuming you have a main App component

// Middleware to serve static files
app.use(express.static('public'));

// Server-side rendering
app.get('/', (req, res) => {
    const appString = renderToString(<App />);
    res.render('index', { appString });
});

// Client-side hydration
if (typeof window !== 'undefined') {
    const root = document.getElementById('root');
    ReactDOM.hydrate(<App />, root);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});