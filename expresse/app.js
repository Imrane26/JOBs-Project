// app.js
const express = require('express');
const connectDB=require('./config/mongodb')
const apiAuth = require('./routes/auth');
const apiEntreprise = require('./routes/entrepriseApi')
const offreApi = require('./routes/offreApi')
const publicationApi = require('./routes/publicationApi')
const dataUerApi = require('./routes/dataUserApi')
const cors = require('cors');

// const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;
// Synchroniser les modèles avec la base de données
connectDB();

// Middleware
app.use(express.json());
// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
// Other middleware and routes
app.use(express.json());

//Routes API
//authentification
app.use('/api',apiAuth);
//entreprise api 
app.use('/api',apiEntreprise);
// offre api 
app.use('/api',offreApi)
// publication api
app.use('/api',publicationApi)
// dataUSer APi
app.use('/api',dataUerApi)

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});