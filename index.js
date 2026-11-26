// Import packages
require("dotenv").config(); // import package dotenv
const express = require("express"); // import package express
const cors = require("cors"); // import package cors
const axios = require("axios"); // import package axios requêtes http

const app = express(); // crée le serveur
app.use(cors());
app.use(express.json()); // middleware pour paramètres body (post)

// ➡️ Route de bienvenue
app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome to the Marvel server! 🦸");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Route : /characters en GET
// Liste de tous les personnages
app.get("/characters", async (req, res) => {
  try {
    console.log(req.query); // { name: 'man' } / { page: '2' }
    const name = req.query.name || ""; // Filtre de recherche par name : http://localhost:3000/characters?name=man
    const page = req.query.page || 1; // Numéro de page via le front : http://localhost:3000/characters?page=2
    const limit = 100; // 100 résultats par page maximum
    const skip = (page - 1) * limit; // Calcul du décalage à partir de la page
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Route : /character/:characterId en GET
// Détails d'un personnage spécifique
app.get("/character/:characterId", async (req, res) => {
  try {
    console.log(req.params); // { characterId: '5fcf91f4d8a2480017b91453' }
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Route : /comics en GET
// Liste de tous les comics
app.get("/comics", async (req, res) => {
  try {
    console.log(req.query); // { name: 'spider' } / { page: '50' }
    const title = req.query.title || ""; // Filtre de recherche par title : http://localhost:3000/comics?title=spider
    const page = req.query.page || 1; // Numéro de page via le front : http://localhost:3000/comics?page=2
    const limit = 100; // 100 résultats par page maximum
    const skip = (page - 1) * limit; // Calcul du décalage à partir de la page
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Route : /comic/:comicId en GET
// Détails d'un comic spécifique
app.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    console.log(req.params); // { comicId: '5fce213378edeb0017c9602f' }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Route : /comics/:characterId en GET
// Liste des comics liés à un personnage spécifique
app.get("/comics/:characterId", async (req, res) => {
  try {
    console.log(req.params); // { characterId: '5fcf91f4d8a2480017b91453' }
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ➡️ Routes inexistantes (404)
app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

// ➡️ Démarrage du serveur
app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started 🎯");
});
