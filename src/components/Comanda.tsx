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
  const [pesquisaItem, setPesquisaItem] = useState<string>('');
  const [itensDisponiveis] = useState<Item[]>(itensPreDefinidos);
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
          setPesquisaItem('');
        } else {
          console.error('Erro ao adicionar item à comanda');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  const removerItem = async (nome: string) => {
    if (mesa) {
      try {
        const response = await fetch(`http://localhost:5000/comandas/${mesa.id}/itens/${nome}`, {
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

  const handleQuantidadeChange = (nome: string, delta: number) => {
    setItens(prevItens =>
      prevItens.map(item =>
        item.nome === nome
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item
      )
    );
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
                    setPesquisaItem('');
                    adicionarItem({ ...item, quantidade: 1 });
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-600 text-white"
                >
                  {item.nome} - R${item.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        {Object.keys(itensPorCategoria).map(categoria => (
          <button
          key={categoria}
          onClick={() => setCategoriaSelecionada(categoria === categoriaSelecionada ? null : categoria)}
          className={`px-4 py-2 rounded-lg ${categoria === categoriaSelecionada ? 'bg-blue-600' : 'bg-gray-600'} hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500`}
          >
            {categoria}
          </button>
        ))}
      </div>

        {categoriaSelecionada && (
          <div className="mb-6 max-h-52 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Itens Disponíveis - {categoriaSelecionada}</h3>
            <ul className="list-disc pl-5">
              {itensPorCategoria[categoriaSelecionada].map(item => (
                <li
                  key={item.nome}
                  onClick={() => adicionarItem({ ...item, quantidade: 1 })}
                  className="flex justify-between items-center bg-gray-700 rounded-lg p-2 mb-2 cursor-pointer hover:bg-gray-600"
                >
                  <span>{item.nome} - R${item.preco.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">Itens da Comanda</h3>
        <ul className="list-disc pl-5">
          {itens.map(item => (
            <li key={item.nome} className="flex justify-between items-center bg-gray-700 rounded-lg p-2 mb-2">
              <span>{item.nome} - R${item.preco.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantidadeChange(item.nome, -1)}
                  className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  -
                </button>
                <span>{item.quantidade}</span>
                <button
                  onClick={() => handleQuantidadeChange(item.nome, 1)}
                  className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  +
                </button>
                <button
                  onClick={() => removerItem(item.nome)}
                  className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>


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
  );
};

export default Comanda;
