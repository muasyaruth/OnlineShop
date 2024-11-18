const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors()); 

// Serve static files
app.use(express.static('public'));

app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Bread', price: 0.9 * 100, description: 'Fresh whole wheat bread' },
        { id: 2, name: 'Milk', price: 0.5 * 100, description: 'Organic whole milk' },
        { id: 3, name: 'Eggs', price: 0.15 * 100, description: 'Free-range eggs' },
        { id: 4, name: 'Apples', price: 0.35 * 100, description: 'Fresh red apples' },
        { id: 5, name: 'Maize flour', price: 1.5 * 100, description: 'Soko, 2kg' },
        { id: 6, name: 'Cooking oil', price: 2 * 100, description: 'Rina, 1Ltr' }
    ];
    res.json(items);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
