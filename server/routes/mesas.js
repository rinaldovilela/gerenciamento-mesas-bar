// server/routes/mesas.js

const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

// Obter todas as mesas
router.get('/', (req, res) => {
  res.json(mesas);
});

// Criar uma nova mesa
router.post('/', (req, res) => {
  const novaMesa = {
    id: mesas.length + 1,
    comanda: [],
  };
  mesas.push(novaMesa);
  res.status(201).json(novaMesa);
});

module.exports = router;
