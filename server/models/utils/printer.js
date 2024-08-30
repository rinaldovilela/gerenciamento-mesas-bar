const printer = require('node-printer'); // Verifique a compatibilidade com sua impressora

const imprimirComanda = (mesaId) => {
  const mesa = mesas.find(m => m.id === mesaId);

  if (!mesa) {
    throw new Error('Mesa não encontrada');
  }

  const textoComanda = mesa.comanda.join('\n');
  const impressora = printer.connectPrinter('Impressora_Termica', {
    type: 'network', // ou 'usb' dependendo da sua impressora
    host: '192.168.0.100', // IP da impressora na rede
  });

  impressora.printText(textoComanda);
};

module.exports = { imprimirComanda };
