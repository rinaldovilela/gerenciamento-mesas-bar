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

// Deletar uma mesa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = mesas.findIndex(mesa => mesa.id === parseInt(id, 10));
  
  if (index !== -1) {
    mesas.splice(index, 1);
    res.status(204).send(); // No Content
  } else {
    res.status(404).json({ error: 'Mesa não encontrada' });
  }
});

module.exports = router;
