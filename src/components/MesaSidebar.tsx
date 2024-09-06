import React, { useEffect, useState } from 'react';

interface Mesa {
  id: number;
  comanda: any[];
}

interface MesaSidebarProps {
  onSelectMesa: (mesa: Mesa) => void;
}

const MesaSidebar: React.FC<MesaSidebarProps> = ({ onSelectMesa }) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [mesasDisponiveis, setMesasDisponiveis] = useState<number[]>([]);
  const [mesaParaAdicionar, setMesaParaAdicionar] = useState<number | ''>('');

  useEffect(() => {
    fetch('http://localhost:5000/mesas')
      .then(response => response.json())
      .then(data => setMesas(data))
      .catch(error => console.error('Erro ao carregar mesas:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/mesas/disponiveis')
      .then(response => response.json())
      .then(data => setMesasDisponiveis(data))
      .catch(error => console.error('Erro ao carregar mesas disponíveis:', error));
  }, []);

  const adicionarMesa = () => {
    if (mesaParaAdicionar === '') return;

    fetch('http://localhost:5000/mesas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: mesaParaAdicionar }),
    })
    .then(response => response.json())
    .then(novaMesa => {
      setMesas([...mesas, novaMesa]);
      setMesasDisponiveis(mesasDisponiveis.filter(mesaId => mesaId !== mesaParaAdicionar));
      setMesaParaAdicionar('');
    })
    .catch(error => console.error('Erro ao adicionar mesa:', error));
  };

  const deletarMesa = (id: number) => {
    fetch(`http://localhost:5000/mesas/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setMesas(mesas.filter(mesa => mesa.id !== id));
        setMesasDisponiveis([...mesasDisponiveis, id].sort((a, b) => a - b));
        if (mesaSelecionada?.id === id) {
          setMesaSelecionada(null);
        }
      } else {
        console.error('Erro ao deletar mesa');
      }
    })
    .catch(error => console.error('Erro ao deletar mesa:', error));
  };

  const handleMesaClick = (mesa: Mesa) => {
    setMesaSelecionada(mesa);
    onSelectMesa(mesa);
  };

  return (
    <div className="w-full max-w-xs bg-gray-800 text-white shadow-lg rounded-lg p-4 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Mesas</h2>

      <div className="mb-4">
        <label htmlFor="mesa-select" className="block text-sm font-medium mb-2">
          Selecione uma mesa para adicionar
        </label>
        <select
          id="mesa-select"
          value={mesaParaAdicionar}
          onChange={(e) => setMesaParaAdicionar(parseInt(e.target.value, 10))}
          className="block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma mesa</option>
          {mesasDisponiveis.map(id => (
            <option key={id} value={id}>
              Mesa {id}
            </option>
          ))}
        </select>
        <button
          onClick={adicionarMesa}
          className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          Adicionar Mesa
        </button>
      </div>

      <h3 className="text-lg font-medium mb-2">Mesas Adicionadas</h3>
      <ul>
        {mesas.map(mesa => (
          <li
            key={mesa.id}
            className={`cursor-pointer text-5xl font-extrabold p-2 rounded-lg mb-2 ${mesaSelecionada?.id === mesa.id ? 'bg-gray-600' : 'hover:bg-gray-700'} text-gray-300`}
            onClick={() => handleMesaClick(mesa)}
          >
            Mesa {mesa.id}
          </li>
        ))}
      </ul>
      {mesaSelecionada && (
        <button
          onClick={() => deletarMesa(mesaSelecionada.id)}
          className="mt-4 w-full p-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
        >
          Deletar Mesa
        </button>
      )}
    </div>
  );
};

export default MesaSidebar;
