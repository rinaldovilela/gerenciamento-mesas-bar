const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

// Adicionar item à comanda
router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { item } = req.body;
  const mesa = mesas.find(m => m.id === parseInt(id));

  if (mesa) {
    mesa.comanda.push(item);
    res.status(201).json(mesa);
  } else {
    res.status(404).json({ message: 'Mesa não encontrada' });
  }
});

module.exports = router;
