const express = require('express');
const router = express.Router();
const { imprimirComanda } = require('../utils/printer');

router.post('/', (req, res) => {
  const { mesaId } = req.body;
  try {
    imprimirComanda(mesaId);
    res.status(200).json({ message: 'Comanda impressa com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao imprimir a comanda', error });
  }
});

module.exports = router;
