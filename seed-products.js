const mongoose = require('mongoose');
const productModel = require('./models/productmodel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/premiumbagshop')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const sampleProducts = [
    {
        name: "Classic Leather Tote",
        price: 2499,
        discount: 10,
        bgcolor: "#fbbf24",
        panelcolor: "#ef4444",
        textcolor: "#ffffff",
        image: "/images/bag1.jpg"
    },
    {
        name: "Designer Crossbody",
        price: 1899,
        discount: 15,
        bgcolor: "#60a5fa",
        panelcolor: "#3b82f6",
        textcolor: "#ffffff",
        image: "/images/bag2.jpg"
    },
    {
        name: "Luxury Handbag",
        price: 3499,
        discount: 5,
        bgcolor: "#a78bfa",
        panelcolor: "#8b5cf6",
        textcolor: "#ffffff",
        image: "/images/bag3.jpg"
    },
    {
        name: "Premium Backpack",
        price: 2199,
        discount: 20,
        bgcolor: "#34d399",
        panelcolor: "#10b981",
        textcolor: "#ffffff",
        image: "/images/bag4.jpg"
    },
    {
        name: "Elegant Clutch",
        price: 1499,
        discount: 0,
        bgcolor: "#f472b6",
        panelcolor: "#ec4899",
        textcolor: "#ffffff",
        image: "/images/bag5.jpg"
    },
    {
        name: "Business Briefcase",
        price: 4299,
        discount: 12,
        bgcolor: "#475569",
        panelcolor: "#334155",
        textcolor: "#ffffff",
        image: "/images/bag6.jpg"
    },
    {
        name: "Casual Satchel",
        price: 1799,
        discount: 18,
        bgcolor: "#fb923c",
        panelcolor: "#f97316",
        textcolor: "#ffffff",
        image: "/images/bag7.jpg"
    },
    {
        name: "Travel Duffel",
        price: 2899,
        discount: 8,
        bgcolor: "#22d3ee",
        panelcolor: "#06b6d4",
        textcolor: "#ffffff",
        image: "/images/bag8.jpg"
    }
];

async function seedProducts() {
    try {
        // Clear existing products
        await productModel.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        const products = await productModel.insertMany(sampleProducts);
        console.log(`✅ Successfully added ${products.length} products!`);
        
        products.forEach(product => {
            console.log(`   - ${product.name}: ₹${product.price}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
