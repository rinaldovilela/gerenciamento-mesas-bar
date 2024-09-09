'use client'
import React, { useState, useEffect } from 'react';
import { itensPreDefinidos } from '@/data/itensPreDefinidos';

interface Item {
  categoria: string;
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

const Comanda: React.FC<ComandaProps> = ({ mesa }) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [novoItem, setNovoItem] = useState<Item>({ nome: '', quantidade: 1, preco: 0, categoria: '' });
  const [itensDisponiveis, setItensDisponiveis] = useState<Item[]>(itensPreDefinidos);
  const [pesquisaItem, setPesquisaItem] = useState<string>('');
  const [itensFiltrados, setItensFiltrados] = useState<Item[]>(itensPreDefinidos);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

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

  // Agrupamento dos itens por categoria
  const itensPorCategoria = itensDisponiveis.reduce((acc: { [key: string]: Item[] }, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const adicionarItem = async (item: Item) => {
    if (mesa && item.nome && item.preco > 0 && item.quantidade > 0) {
      try {
        const response = await fetch(`http://localhost:5000/comandas/${mesa.id}/itens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        if (response.ok) {
          const data = await response.json();
          setItens(data.comanda);
          setNovoItem({ nome: '', quantidade: 1, preco: 0, categoria: '' });
          setPesquisaItem('');
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
        console.error('Erro na requisição', error);
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
      const confirmacao = window.confirm("Tem certeza que deseja limpar a comanda?");
      if (confirmacao) {
        try {
          const response = await fetch(`http://localhost:5000/limparComanda`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mesaId: mesa.id }),
          });
          if (response.ok) {
            console.log('Comanda limpa com sucesso');
            setItens([]);
          } else {
            console.error('Erro ao limpar comanda');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
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
    <div className="w-full bg-gray-800 text-white shadow-lg rounded-lg p-4 border border-gray-700 overflow-auto">
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
          {pesquisaItem && itensFiltrados.length > 0 && (
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
          onClick={() => adicionarItem(novoItem)}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          Adicionar Item
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        {Object.keys(itensPorCategoria).map(categoria => (
          <button
            key={categoria}
            onClick={() => setCategoriaSelecionada(categoria === categoriaSelecionada ? null : categoria)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {categoria}
          </button>
        ))}
      </div>

      {categoriaSelecionada && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">{categoriaSelecionada}</h3>
          <ul className="list-disc pl-5">
            {itensPorCategoria[categoriaSelecionada].map((item) => (
              <li key={item.nome} className="flex justify-between items-center bg-gray-700 rounded-lg p-2 mb-2">
                <span>{item.nome} - R${item.preco.toFixed(2)}</span>
                <button
                  onClick={() => adicionarItem({ ...item, quantidade: novoItem.quantidade })}
                  className="ml-2 px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Adicionar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold mb-2">Itens da Comanda</h3>
        <ul className="list-disc pl-5">
          {itens.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 rounded-lg p-2 mb-2">
              <span>{item.nome} - {item.quantidade} x R${item.preco.toFixed(2)}</span>
              <button
                onClick={() => removerItem(index)}
                className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center p-2 bg-gray-800 border-t border-gray-700">
          <span className="font-semibold">Total:</span>
          <span>R${calcularTotal()}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={imprimirComanda}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Imprimir
          </button>
          <button
            onClick={limparComanda}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comanda;
