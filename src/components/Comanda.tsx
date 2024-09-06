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

const Comanda: React.FC<ComandaProps> = ({ mesa }) => {
  const [itens, setItens] = useState<Item[]>([]);
  const [novoItem, setNovoItem] = useState<Item>({ nome: '', quantidade: 1, preco: 0 });

  useEffect(() => {
    if (mesa) {
      setItens(mesa.comanda);
    }
  }, [mesa]);

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
  }


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
  }



  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  if (!mesa) {
    return <div className="flex-1 p-4">Selecione uma mesa para visualizar a comanda.</div>;
  }

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Comanda - Mesa {mesa.id}</h2>

      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Quantidade</th>
            <th className="border p-2">Preço Unitário (R$)</th>
            <th className="border p-2">Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.nome}</td>
              <td className="border p-2 text-center">{item.quantidade}</td>
              <td className="border p-2 text-center">{item.preco.toFixed(2)}</td>
              <td className="border p-2 text-center">{(item.preco * item.quantidade).toFixed(2)}</td>
              <td className='border p-2 text-center'>
              <button
                  onClick={() => removerItem(index)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <strong>Total: R$ {calcularTotal()}</strong>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Adicionar Novo Item</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Nome do Item"
            value={novoItem.nome}
            onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
            className="border p-2 flex-1"
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={novoItem.quantidade}
            onChange={(e) => setNovoItem({ ...novoItem, quantidade: parseInt(e.target.value) })}
            className="border p-2 w-24"
            min={1}
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoItem.preco}
            onChange={(e) => setNovoItem({ ...novoItem, preco: parseFloat(e.target.value) })}
            className="border p-2 w-24"
            step="0.01"
            min={0}
          />
          <button
            onClick={adicionarItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div >
      <div className='flex space-x-2'>
      <button
        onClick={imprimirComanda}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Imprimir Comanda
      </button>
          
      <button
        onClick={limparComanda}
        className="bg-red-500 text-white px-6 py-3 rounded"
      >
        Limpar Comanda
      </button>
      </div>
    </div>
  );
};

export default Comanda;
