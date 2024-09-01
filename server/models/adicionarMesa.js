const express = require('express');
const router = express.Router();

// Supondo que você tenha um array de mesas ou esteja usando um banco de dados
let mesas = []; // Substitua isso pelo seu modelo de dados real, como um banco de dados

// Rota para adicionar uma nova mesa
router.post('/add', (req, res) => {
    const { numero, status } = req.body;

    // Verificando se os dados estão corretos
    if (!numero || !status) {
        return res.status(400).json({ error: 'Número e status da mesa são obrigatórios' });
    }

    // Criando uma nova mesa
    const novaMesa = { id: mesas.length + 1, numero, status };

    // Adicionando a nova mesa ao array (ou banco de dados)
    mesas.push(novaMesa);

    // Retornando a mesa adicionada
    return res.status(201).json(novaMesa);
});

module.exports = router;