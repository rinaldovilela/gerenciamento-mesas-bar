// server/routes/limparComanda.js

const express = require('express');
const router = express.Router();
const { mesas } = require('../models/mesa');

/**
 * Rota para limpar a comanda de uma mesa específica
 * Método: POST
 * Corpo da requisição: { mesaId: number }
 */
router.post('/', (req, res) => {
  const { mesaId } = req.body;

  // Verifica se a mesa existe
  const mesa = mesas.find((m) => m.id === mesaId);
  if (!mesa) {
    return res.status(404).json({ message: 'Mesa não encontrada' });
  }

  // Limpa a comanda
  mesa.comanda = [];

  res.status(200).json({ message: 'Comanda limpa com sucesso' });
});

module.exports = router;
