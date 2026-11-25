// Import packages
require("dotenv").config(); //
const express = require("express"); // import package express
const cors = require("cors"); // import package cors
const axios = require("axios"); // import package axios requêtes http
// const mongoose = require("mongoose"); // import package mongoose

const app = express(); // crée le serveur
app.use(cors());
// mongoose.connect("mongodb://localhost:27017/marvel-backend"); // connexion à la bdd
// app.use(express.json()); // middleware pour paramètres body (post)

// Route de bienvenue
app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome on Marvel");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route : /characters en GET
// Liste de tous les personnages
app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || ""; // Filtre de recherche par nom (barre de recherche) : http://localhost:3000/characters?name=man
    const skip = req.query.skip || 0; // Décalage pour la pagination : http://localhost:3000/characters?skip=100
    const limit = req.query.limit || 100; // Pagination 100 par page
    console.log(req.query); // { name: 'man' } / { skip: '100' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route : /character/:characterId en GET
// Détails d'un personnage spécifique
app.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    console.log(req.params); // { characterId: '5fcf91f4d8a2480017b91453' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route : /comics en GET
// Liste de tous les comics
app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || ""; // Filtre de recherche par titre : http://localhost:3000/comics?title=spider
    const skip = req.query.skip || 0; // Décalage pour la pagination : http://localhost:3000/comics?skip=100
    const limit = req.query.limit || 100; // Pagination 100 par page
    console.log(req.query); // { title: 'spider' } / { skip: '100' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route : /comic/:comicId en GET
// Détails d'un comic spécifique
app.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    console.log(req.params); // { comicId: '5fce213378edeb0017c9602f' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY}`,
    );
    console.log(req.params);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route : /comics/:characterId en GET
// Liste des comics liés à un personnage spécifique
app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    console.log(req.params); // { characterId: '5fcf91f4d8a2480017b91453' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Routes inexistantes (404)
app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

// Démarrage du serveur
app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started 🎯");
});
