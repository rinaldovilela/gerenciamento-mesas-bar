// server/routes/comandas.js

const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

// Adicionar item à comanda da mesa
router.post('/:mesaId/itens', (req, res) => {
  const { mesaId } = req.params;
  const { nome, quantidade, preco } = req.body;

  const mesa = mesas.find((m) => m.id === parseInt(mesaId));
  if (!mesa) {
    return res.status(404).json({ message: 'Mesa não encontrada' });
  }

  mesa.comanda.push({ nome, quantidade, preco });
  res.status(201).json({ message: 'Item adicionado à comanda', comanda: mesa.comanda });
});

// Obter comanda da mesa
router.get('/:mesaId', (req, res) => {
  const { mesaId } = req.params;

  const mesa = mesas.find((m) => m.id === parseInt(mesaId));
  if (!mesa) {
    return res.status(404).json({ message: 'Mesa não encontrada' });
  }

  res.status(200).json({ comanda: mesa.comanda });
});

module.exports = router;
