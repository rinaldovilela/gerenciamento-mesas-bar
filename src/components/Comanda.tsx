// src/components/Comanda.tsx

import React, { useState, useEffect } from 'react';

interface Item {
  nome: string;
  quantidade: number;
  preco: number;
}

interface Mesa {
  id: number;
  comanda: Item[];
}

interface ComandaProps {
  mesa: Mesa | null;
}

// Adicione a lista de itens pré-estabelecidos
const itensPreDefinidos: Item[] = [
  // Lista de itens como no código fornecido...
  { nome: 'Caldinho de Feijão', preco: 7.00, quantidade: 1 },
  { nome: 'Caldinho de Camarão', preco: 7.00, quantidade: 1 },
  { nome: 'Espetinho Carne', preco: 10.00, quantidade: 1 },
  { nome: 'Espetinho Frango', preco: 10.00, quantidade: 1 },
  { nome: 'Espetinho Frango com Bacon', preco: 12.00, quantidade: 1 },
  { nome: 'Espetinho Carne de Sol c/ Queijo', preco: 12.00, quantidade: 1 },
  { nome: 'Espetinho Frango c/ Queijo', preco: 12.00, quantidade: 1 },
  { nome: 'Pão de Alho', preco: 7.00, quantidade: 1 },
  { nome: 'Frango a Passarinha c/ Fritas', preco: 25.00, quantidade: 1 },
  { nome: 'Batata Frita', preco: 15.00, quantidade: 1 },
  { nome: 'Bolinho (Queijo, Charque, Bacalhau)', preco: 15.00, quantidade: 1 },
  { nome: 'Coxinha', preco: 15.00, quantidade: 1 },
  { nome: 'Pastelzinho (Queijo, Carne, Frango)', preco: 20.00, quantidade: 1 },
  { nome: 'Batata c/ Cheddar', preco: 20.00, quantidade: 1 },
  { nome: 'Carne de Sol c/ Fritas', preco: 30.00, quantidade: 1 },
  { nome: 'Calabresa c/ Fritas', preco: 20.00, quantidade: 1 },
  { nome: 'Tripinha', preco: 18.00, quantidade: 1 },
  { nome: 'Camarão Alho e Óleo', preco: 25.00, quantidade: 1 },
  { nome: 'Camarão Empanado', preco: 20.00, quantidade: 1 },
  { nome: 'Queijo Acebolado', preco: 15.00, quantidade: 1 },
  { nome: 'Filé c/ Fritas', preco: 34.00, quantidade: 1 },
  { nome: 'Brahma Chopp', preco: 9.00, quantidade: 1 },
  { nome: 'Budweiser', preco: 11.00, quantidade: 1 },
  { nome: 'Antarctica Original', preco: 12.00, quantidade: 1 },
  { nome: 'Stella Artois', preco: 13.00, quantidade: 1 },
  { nome: 'Heineken', preco: 14.00, quantidade: 1 },
  { nome: 'Água sem gás', preco: 3.00, quantidade: 1 },
  { nome: 'Água com gás', preco: 4.00, quantidade: 1 },
  { nome: 'Água de coco', preco: 5.00, quantidade: 1 },
  { nome: 'Suco Copo 300ml (Acerola, Cajá, Graviola)', preco: 6.00, quantidade: 1 },
  { nome: 'Refrigerante Lata', preco: 6.00, quantidade: 1 },
  { nome: 'H2O', preco: 7.00, quantidade: 1 },
  { nome: 'Energético', preco: 12.00, quantidade: 1 },
  { nome: 'Caipirinha', preco: 8.00, quantidade: 1 },
  { nome: 'Caipirosca', preco: 9.00, quantidade: 1 },
  { nome: 'Caipifruta (Morango, Maracujá)', preco: 12.00, quantidade: 1 },
  { nome: 'Ice', preco: 10.00, quantidade: 1 },
  { nome: 'Skol Beats', preco: 10.00, quantidade: 1 },
  { nome: 'Chopp Vinho', preco: 10.00, quantidade: 1 },
  { nome: 'Gin', preco: 8.00, quantidade: 1 },
  { nome: 'Black White', preco: 8.00, quantidade: 1 },
  { nome: 'Johnnie Red', preco: 11.00, quantidade: 1 },
  { nome: 'Johnnie Black', preco: 14.00, quantidade: 1 },
  { nome: 'Vodka Smirnoff', preco: 8.00, quantidade: 1 },
  { nome: 'Pitú (Quartinho)', preco: 6.00, quantidade: 1 },
  { nome: 'Pitú Gold (Dose)', preco: 8.00, quantidade: 1 },
  { nome: 'Bananinha (Dose)', preco: 10.00, quantidade: 1 },
  { nome: 'Sangue de Puta (Dose)', preco: 9.00, quantidade: 1 },
  { nome: 'Alcatrão (Quartinho)', preco: 8.00, quantidade: 1 },
];

const Comanda: React.FC<{ mesa: Mesa }> = ({ mesa }) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [novoItem, setNovoItem] = useState<Item>({ nome: '', quantidade: 1, preco: 0 });
  const [itensDisponiveis, setItensDisponiveis] = useState<Item[]>(itensPreDefinidos);
  const [pesquisaItem, setPesquisaItem] = useState<string>('');
  const [itensFiltrados, setItensFiltrados] = useState<Item[]>(itensPreDefinidos);


  useEffect(() => {
    if (mesa) {
      setItens(mesa.comanda);
    }
  }, [mesa]);

  useEffect(() => {
    const resultados = itensDisponiveis.filter((item) =>
      item.nome.toLowerCase().includes(pesquisaItem.toLowerCase())
    );
    setItensFiltrados(resultados);
  }, [pesquisaItem, itensDisponiveis]);


  const adicionarItem = async () => {
    if (mesa && novoItem.nome && novoItem.preco > 0 && novoItem.quantidade > 0) {
      try {
        const response = await fetch(`http://localhost:5000/comandas/${mesa.id}/itens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoItem),
        });

        if (response.ok) {
          const data = await response.json();
          setItens(data.comanda);
          setNovoItem({ nome: '', quantidade: 1, preco: 0 });
        } else {
          console.error('Erro ao adicionar item à comanda');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  const removerItem = async (index: number) => {
    if (mesa) {
      try {
        const response = await fetch(`http://localhost:5000/comandas/${mesa.id}/itens/${index}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const data = await response.json();
          setItens(data.comanda);
        } else {
          console.error('Erro ao remover item da comanda');
        }
      } catch (error) {
        console.error('Erro na requisição', error)
      } 
    }
  };

  const imprimirComanda = async () => {
    if (mesa) {
      try {
        const response = await fetch('http://localhost:5000/impressao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaId: mesa.id }),
        });

        if (response.ok) {
          console.log('Comanda enviada para impressão');
          setItens([]);
        } else {
          console.error('Erro ao imprimir comanda');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  const limparComanda = async () => {
    if (mesa) {
      try {
        const response = await fetch(`http://localhost:5000/limparComanda`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaId: mesa.id }),
        });
        if (response.ok) {
          console.log('Comanda limpa com sucesso')
          setItens([]);
        } else {
          console.error('Erro ao limpar comanda');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  if (!mesa) {
    return <div className="flex-1 p-4">Selecione uma mesa para visualizar a comanda.</div>;
  }

  return (
    <div className="w-full  bg-gray-800 text-white shadow-lg rounded-lg p-4 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Comanda da Mesa {mesa.id}</h2>
      
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="item-select" className="block text-sm font-medium mb-2">
          Adicionar item à comanda
        </label>
        <div className="relative">
          <input
            id="item-select"
            type="text"
            placeholder="Digite para pesquisar"
            value={pesquisaItem}
            onChange={(e) => setPesquisaItem(e.target.value)}
            className="block w-full max-w-48 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {itensFiltrados.length > 0 && (
            <ul className="absolute overflow-y-auto z-10 mt-1 w-full max-w-xs bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
              {itensFiltrados.map(item => (
                <li
                  key={item.nome}
                  onClick={() => {
                    setNovoItem({ ...item, quantidade: 1 });
                    setPesquisaItem(item.nome);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-600 text-white"
                >
                  {item.nome} - R${item.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative flex gap-2">
          <button
            onClick={() => setNovoItem(prev => ({ ...prev, quantidade: Math.max(1, prev.quantidade - 1) }))}
            className="absolute left-0 top-0 bottom-0 px-2 bg-gray-600 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            -
          </button>
          <input
            type="number"
            value={novoItem.quantidade}
            onChange={(e) => setNovoItem({ ...novoItem, quantidade: parseInt(e.target.value, 10) })}
            min="1"
            className="block w-20 bg-gray-700 border border-gray-600 rounded-lg p-2 text-white text-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setNovoItem(prev => ({ ...prev, quantidade: prev.quantidade + 1 }))}
            className="absolute right-0 top-0 bottom-0 px-2 bg-gray-600 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            +
          </button>
        </div>
        
        <button
          onClick={adicionarItem}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          Adicionar Item
        </button>
      </div>

      <ul className="mb-4">
        {itens.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg mb-2">
            <span>{item.nome} - R${item.preco.toFixed(2)} x {item.quantidade}</span>
            <button
              onClick={() => removerItem(index)}
              className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg font-semibold">R${calcularTotal()}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={imprimirComanda}
          className="w-52 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Imprimir Comanda
        </button>
        <button
          onClick={limparComanda}
          className="w-52 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
        >
          Limpar Comanda
        </button>
      </div>
    </div>
  );
};

export default Comanda;