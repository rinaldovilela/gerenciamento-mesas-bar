// server/models/comanda.js

class Comanda {
    constructor(mesaId) {
      this.mesaId = mesaId;
      this.itens = [];
    }
  
    addItem(nome, quantidade, preco) {
      this.itens.push({ nome, quantidade, preco });
    }
  
    getTotal() {
      return this.itens.reduce((total, item) => total + item.quantidade * item.preco, 0);
    }
  }
  
  module.exports = Comanda;
  