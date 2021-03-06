const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
// Pour pouvoir extraire l'objet JSON de la demande
const bodyParser = require("body-parser");
// Pour accéder au path de notre serveur
const path = require("path");

require("dotenv").config();

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet());

// Headers pour permettre l'accès depuis n'importe quelle origine + ajouter les headers mentionnés aux requêtes envoyées vers l'API + envoyer des requêtes avec les méthodes mentionnées.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// Route pour récupérer les images dans notre serveur(il faut gérer la ressource images de manière statique).
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
