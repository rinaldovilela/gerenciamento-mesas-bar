const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

// Obter todas as mesas
router.get('/', (req, res) => {
  res.json(mesas);
});

// Obter mesas disponíveis (não adicionadas)
router.get('/disponiveis', (req, res) => {
  const maxMesas = 33;
  const todasAsMesas = Array.from({ length: maxMesas }, (_, i) => i + 1);
  const mesasExistentesIds = mesas.map(mesa => mesa.id);
  const mesasDisponiveis = todasAsMesas.filter(id => !mesasExistentesIds.includes(id));
  res.json(mesasDisponiveis);
});

// Criar uma nova mesa (adicionar uma mesa específica)
router.post('/', (req, res) => {
  const { id } = req.body;
  const mesaExistente = mesas.find(mesa => mesa.id === id);

  if (mesaExistente) {
    return res.status(400).json({ error: 'Mesa já adicionada' });
  }

  const novaMesa = { id, comanda: [] };
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
