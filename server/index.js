const express = require('express');
const cors = require('cors');
const mesasRoutes = require('./routes/mesas');
const comandasRoutes = require('./routes/comandas');
const impressaoRoutes = require('./routes/impressao');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/mesas', mesasRoutes);
app.use('/comandas', comandasRoutes);
app.use('/impressao', impressaoRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
