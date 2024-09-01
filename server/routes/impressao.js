// server/routes/impressao.js

const express = require('express');
const router = express.Router();
const { generateComandaPDF, printComanda } = require('../utils/printer');
const { mesas } = require('../models/mesa');
const Comanda = require('../models/comanda');

/**
 * Rota para imprimir a comanda de uma mesa específica
 * Método: POST
 * Corpo da requisição: { mesaId: number }
 */
router.post('/', async (req, res) => {
  const { mesaId } = req.body;

  try {
    // Verifica se a mesa existe
    const mesa = mesas.find((m) => m.id === mesaId);
    if (!mesa) {
      return res.status(404).json({ message: 'Mesa não encontrada' });
    }

    // Cria a comanda com os itens da mesa
    const comanda = new Comanda(mesaId);
    mesa.comanda.forEach((item) => {
      comanda.addItem(item.nome, item.quantidade, item.preco);
    });

    // Gera o PDF da comanda
    const pdfPath = await generateComandaPDF(comanda);

    // Imprime o PDF
    await printComanda(pdfPath);

    // Limpa a comanda após a impressão
    mesa.comanda = [];

    res.status(200).json({ message: 'Comanda impressa com sucesso' });
  } catch (error) {
    console.error('Erro ao imprimir a comanda:', error);
    res.status(500).json({ message: 'Erro ao imprimir a comanda', error: error.message });
  }
});

module.exports = router;
