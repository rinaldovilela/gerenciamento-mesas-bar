// server/index.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const mesasRoutes = require('./routes/mesas');
const comandasRoutes = require('./routes/comandas');
const impressaoRoutes = require('./routes/impressao');
const limparComandaRoutes = require('./routes/limparComanda');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/mesas', mesasRoutes);
app.use('/comandas', comandasRoutes);
app.use('/impressao', impressaoRoutes);
app.use('/limparComanda', limparComandaRoutes);

// Servir arquivos estáticos (PDFs temporários, se necessário)
app.use('/temp', express.static(path.join(__dirname, '../temp')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
