const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

// Retornar todas as mesas
router.get('/', (req, res) => {
  res.json(mesas);
});

// Adicionar uma nova mesa
router.post('/', (req, res) => {
  const novaMesa = { id: mesas.length + 1, comanda: [] };
  mesas.push(novaMesa);
  res.status(201).json(novaMesa);
});

module.exports = router;
