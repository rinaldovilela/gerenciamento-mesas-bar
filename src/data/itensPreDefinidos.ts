// src/data/itensPreDefinidos.ts

export interface Item {
    nome: string,
    quantidade: number,
    preco: number,
    categoria:string,
}

// Atualização da lista de itens com categorias
export const itensPreDefinidos: Item[] = [
    // Categoria: Petiscos
    { nome: 'Caldinho de Feijão', preco: 7.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Caldinho de Camarão', preco: 7.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Espetinho Carne', preco: 10.00, quantidade: 1, categoria: 'Espetinhos' },
    { nome: 'Espetinho Frango', preco: 10.00, quantidade: 1, categoria: 'Espetinhos' },
    { nome: 'Espetinho Frango com Bacon', preco: 12.00, quantidade: 1, categoria: 'Espetinhos' },
    { nome: 'Espetinho Carne de Sol c/ Queijo', preco: 12.00, quantidade: 1, categoria: 'Espetinhos' },
    { nome: 'Espetinho Frango c/ Queijo', preco: 12.00, quantidade: 1, categoria: 'Espetinhos' },
    { nome: 'Pão de Alho', preco: 7.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Frango a Passarinha c/ Fritas', preco: 25.00, quantidade: 1, categoria: 'Pratos Principais' },
    { nome: 'Batata Frita', preco: 15.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Bolinho (Queijo, Charque, Bacalhau)', preco: 15.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Coxinha', preco: 15.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Pastelzinho (Queijo, Carne, Frango)', preco: 20.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Batata c/ Cheddar', preco: 20.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Carne de Sol c/ Fritas', preco: 30.00, quantidade: 1, categoria: 'Pratos Principais' },
    { nome: 'Calabresa c/ Fritas', preco: 20.00, quantidade: 1, categoria: 'Pratos Principais' },
    { nome: 'Tripinha', preco: 18.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Camarão Alho e Óleo', preco: 25.00, quantidade: 1, categoria: 'Pratos Principais' },
    { nome: 'Camarão Empanado', preco: 20.00, quantidade: 1, categoria: 'Pratos Principais' },
    { nome: 'Queijo Acebolado', preco: 15.00, quantidade: 1, categoria: 'Petiscos' },
    { nome: 'Filé c/ Fritas', preco: 34.00, quantidade: 1, categoria: 'Pratos Principais' },

    // Categoria: Bebidas
    { nome: 'Brahma Chopp', preco: 9.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Budweiser', preco: 11.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Antarctica Original', preco: 12.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Stella Artois', preco: 13.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Heineken', preco: 14.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Água sem gás', preco: 3.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Água com gás', preco: 4.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Água de coco', preco: 5.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Suco Copo 300ml (Acerola, Cajá, Graviola)', preco: 6.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Refrigerante Lata', preco: 6.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'H2O', preco: 7.00, quantidade: 1, categoria: 'Bebidas' },
    { nome: 'Energético', preco: 12.00, quantidade: 1, categoria: 'Bebidas' },

    // Categoria: Drinks
    { nome: 'Caipirinha', preco: 8.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Caipirosca', preco: 9.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Caipifruta (Morango, Maracujá)', preco: 12.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Ice', preco: 10.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Skol Beats', preco: 10.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Chopp Vinho', preco: 10.00, quantidade: 1, categoria: 'Drinks' },
    { nome: 'Gin', preco: 8.00, quantidade: 1, categoria: 'Drinks' },

    // Categoria: Destilados
    { nome: 'Black White', preco: 8.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Johnnie Red', preco: 11.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Johnnie Black', preco: 14.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Vodka Smirnoff', preco: 8.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Pitú (Quartinho)', preco: 6.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Pitú Gold (Dose)', preco: 8.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Bananinha (Dose)', preco: 10.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Sangue de Puta (Dose)', preco: 9.00, quantidade: 1, categoria: 'Destilados' },
    { nome: 'Alcatrão (Quartinho)', preco: 8.00, quantidade: 1, categoria: 'Destilados' },
];
